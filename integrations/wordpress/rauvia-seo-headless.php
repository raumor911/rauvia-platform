<?php
/**
 * Plugin Name: RAUVIA Headless SEO
 * Description: Selective redirects from the CMS to verified RAUVIA articles.
 * Version: 1.0.0
 * Requires PHP: 7.4
 */
namespace RAUVIA\HeadlessSEO;

defined('ABSPATH') || exit;

function enabled() {
    return (!defined('RAUVIA_HEADLESS_SEO_DISABLED') || !RAUVIA_HEADLESS_SEO_DISABLED)
        && strtolower((string) wp_parse_url(home_url('/'), PHP_URL_HOST)) === 'blog.rauvia.com.mx';
}

function excluded() {
    return !enabled() || is_admin() || wp_doing_ajax() || wp_doing_cron()
        || (defined('REST_REQUEST') && REST_REQUEST)
        || (defined('XMLRPC_REQUEST') && XMLRPC_REQUEST)
        || is_preview() || is_embed() || is_attachment()
        || !in_array($_SERVER['REQUEST_METHOD'] ?? 'GET', array('GET', 'HEAD'), true);
}

function destination($post) {
    if (!$post || $post->post_type !== 'post' || $post->post_status !== 'publish'
        || $post->post_password !== '' || $post->post_name === '') {
        return '';
    }
    // WordPress can store percent-encoded slugs. Encode exactly one path segment.
    return 'https://rauvia.com.mx/recursos/' . rawurlencode(rawurldecode($post->post_name)) . '/';
}

function ready($url) {
    $key = 'rauvia_hseo_' . sha1($url);
    $cached = get_transient($key);
    if ($cached !== false) {
        return $cached === 'ready';
    }
    // Fixed origin, no redirects, bounded time/body. Do not redirect to a missing
    // article or to a generic SPA shell that happens to return HTTP 200.
    $response = wp_remote_get($url, array(
        'timeout' => 3, 'redirection' => 0, 'limit_response_size' => 524288,
        'headers' => array('User-Agent' => 'RAUVIA-Headless-SEO/1.0'),
    ));
    $valid = false;
    if (!is_wp_error($response) && wp_remote_retrieve_response_code($response) === 200) {
        $body = wp_remote_retrieve_body($response);
        preg_match_all('/<link\b[^>]*>/i', $body, $links);
        $canonicals = array();
        foreach ($links[0] as $link) {
            if (preg_match('/\brel\s*=\s*([\'"])canonical\1/i', $link)
                && preg_match('/\bhref\s*=\s*([\'"])(.*?)\1/i', $link, $href)) {
                $canonicals[] = html_entity_decode($href[2], ENT_QUOTES | ENT_HTML5, 'UTF-8');
            }
        }
        $valid = count($canonicals) === 1 && $canonicals[0] === $url
            && stripos((string) wp_remote_retrieve_header($response, 'x-robots-tag'), 'noindex') === false
            && !preg_match('/<meta\b(?=[^>]*\bname\s*=\s*([\'"])(?:robots|googlebot)\1)(?=[^>]*\bcontent\s*=\s*([\'"])[^\'"]*noindex)[^>]*>/i', $body);
    }
    // Negative results retry quickly; new posts become eligible automatically.
    set_transient($key, $valid ? 'ready' : 'unavailable', $valid ? 3600 : 60);
    return $valid;
}

function redirect_target() {
    if (excluded() || is_feed() || !is_singular('post')) {
        return '';
    }
    $url = destination(get_queried_object());
    return $url !== '' && ready($url) ? $url : '';
}

function redirect_public_post() {
    $target = redirect_target();
    if ($target !== '') {
        nocache_headers();
        // Cross-domain destination is constructed above; never accept a request URL.
        if (wp_redirect($target, 301, 'RAUVIA Headless SEO')) {
            exit;
        }
    }
}

function editorial_archive() {
    return !excluded() && (is_home() || is_front_page() || is_archive() || is_search());
}

function robots($directives) {
    if (editorial_archive()) {
        unset($directives['index'], $directives['nofollow']);
        $directives['noindex'] = true;
        $directives['follow'] = true;
    }
    return $directives;
}

function noindex_headers() {
    if (!excluded() && (is_feed() || editorial_archive() || is_404() || is_singular('post'))) {
        header('X-Robots-Tag: noindex, follow', true);
    }
}

function sitemaps_enabled($value) {
    return enabled() ? false : $value;
}

// Hostinger ComingSoon exits at template_redirect priority 10. Run first without
// disabling that plugin or exposing other CMS pages.
add_action('template_redirect', __NAMESPACE__ . '\\redirect_public_post', 0);
add_action('template_redirect', __NAMESPACE__ . '\\noindex_headers', 1);
add_filter('wp_robots', __NAMESPACE__ . '\\robots', 99);
add_filter('wp_sitemaps_enabled', __NAMESPACE__ . '\\sitemaps_enabled', 99);
