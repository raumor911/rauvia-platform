<?php
namespace RAUVIA\HeadlessSEO {
    function header($value, $replace = true) { $GLOBALS['sent_headers'][] = $value; }
}
namespace {
    define('ABSPATH', __DIR__);
    $state = array(); $cache = array(); $hooks = array(); $calls = 0; $passed = 0;
    function add_action($name, $callback, $priority = 10) { $GLOBALS['hooks'][$name][$priority][] = $callback; }
    function add_filter($name, $callback, $priority = 10) { add_action($name, $callback, $priority); }
    function home_url($path) { return $GLOBALS['state']['home'] ?? 'https://blog.rauvia.com.mx/'; }
    function wp_parse_url($url, $component) { return parse_url($url, $component); }
    function is_admin() { return !empty($GLOBALS['state']['admin']); }
    function wp_doing_ajax() { return !empty($GLOBALS['state']['ajax']); }
    function wp_doing_cron() { return !empty($GLOBALS['state']['cron']); }
    function is_preview() { return !empty($GLOBALS['state']['preview']); }
    function is_embed() { return !empty($GLOBALS['state']['embed']); }
    function is_attachment() { return !empty($GLOBALS['state']['attachment']); }
    function is_feed() { return !empty($GLOBALS['state']['feed']); }
    function is_home() { return !empty($GLOBALS['state']['home_page']); }
    function is_front_page() { return !empty($GLOBALS['state']['front']); }
    function is_archive() { return !empty($GLOBALS['state']['archive']); }
    function is_search() { return !empty($GLOBALS['state']['search']); }
    function is_404() { return !empty($GLOBALS['state']['404']); }
    function is_singular($type) { return !empty($GLOBALS['state']['singular']); }
    function get_queried_object() { return $GLOBALS['state']['post'] ?? null; }
    function get_transient($key) { return $GLOBALS['cache'][$key] ?? false; }
    function set_transient($key, $value, $ttl) { $GLOBALS['cache'][$key] = $value; $GLOBALS['ttl'] = $ttl; }
    function wp_remote_get($url, $args) {
        $GLOBALS['calls']++;
        $GLOBALS['http_args'] = $args;
        return $GLOBALS['state']['response'] ?? array('status' => 200, 'body' => '<link href="'.$url.'" rel="canonical">');
    }
    function is_wp_error($r) { return $r instanceof \Exception; }
    function wp_remote_retrieve_response_code($r) { return $r['status']; }
    function wp_remote_retrieve_body($r) { return $r['body'] ?? ''; }
    function wp_remote_retrieve_header($r, $name) { return $r[$name] ?? ''; }
    function nocache_headers() { $GLOBALS['sent_headers'][] = 'no-cache'; }
    function wp_redirect($url, $status, $by) {
        echo json_encode(array('location' => $url, 'status' => $status, 'by' => $by));
        return true;
    }
    require __DIR__ . '/../integrations/wordpress/rauvia-seo-headless.php';
    function reset_case() {
        $GLOBALS['state'] = array('singular' => true, 'post' => (object) array(
            'post_type' => 'post', 'post_status' => 'publish', 'post_password' => '', 'post_name' => 'articulo',
        ));
        $GLOBALS['cache'] = array(); $GLOBALS['sent_headers'] = array(); $GLOBALS['calls'] = 0;
        $_SERVER['REQUEST_METHOD'] = 'GET';
    }
    function check($condition, $label) {
        if (!$condition) { fwrite(STDERR, "FAIL: $label\n"); exit(1); }
        $GLOBALS['passed']++; echo "PASS: $label\n";
    }
    use RAUVIA\HeadlessSEO as SEO;
    reset_case();
    $mode = $argv[1] ?? '';
    if ($mode === 'redirect') { SEO\redirect_public_post(); exit(2); }
    if (in_array($mode, array('REST_REQUEST', 'XMLRPC_REQUEST', 'RAUVIA_HEADLESS_SEO_DISABLED'), true)) {
        define($mode, true);
        check(SEO\redirect_target() === '' && $calls === 0, "$mode excluded without network");
        exit;
    }
    $url = 'https://rauvia.com.mx/recursos/articulo/';
    check(SEO\redirect_target() === $url, 'published article redirects to fixed canonical');
    check($http_args['redirection'] === 0 && $http_args['timeout'] === 3, 'bounded HTTP without redirect following');
    check($ttl === 3600, 'positive cache TTL');
    SEO\redirect_target(); check($calls === 1, 'cached availability avoids repeated HTTP');
    reset_case(); $_SERVER['REQUEST_METHOD'] = 'HEAD'; check(SEO\redirect_target() === $url, 'HEAD supported');
    foreach (array('POST','PUT','DELETE','OPTIONS') as $method) {
        reset_case(); $_SERVER['REQUEST_METHOD'] = $method;
        check(SEO\redirect_target() === '' && $calls === 0, "$method unchanged");
    }
    foreach (array('admin','ajax','cron','preview','embed','attachment','feed') as $flag) {
        reset_case(); $state[$flag] = true;
        check(SEO\redirect_target() === '' && $calls === 0, "$flag unchanged without network");
    }
    foreach (array('draft','private','future','trash') as $status) {
        reset_case(); $state['post']->post_status = $status;
        check(SEO\redirect_target() === '' && $calls === 0, "$status never redirects");
    }
    reset_case(); $state['post']->post_password = 'secret'; check(SEO\redirect_target() === '', 'protected article unchanged');
    reset_case(); $state['post']->post_type = 'page'; check(SEO\redirect_target() === '', 'pages unchanged');
    reset_case(); $state['post']->post_name = '%c3%a1rbol';
    check(SEO\destination($state['post']) === 'https://rauvia.com.mx/recursos/%C3%A1rbol/', 'encoded slug is not double encoded');
    reset_case(); $state['post']->post_name = '../evil?x=1';
    check(SEO\destination($state['post']) === 'https://rauvia.com.mx/recursos/..%2Fevil%3Fx%3D1/', 'slug stays in one path segment');
    foreach (array(404,500,301,302) as $code) {
        reset_case(); $state['response'] = array('status' => $code);
        check(SEO\redirect_target() === '' && $ttl === 60, "$code fails open with short negative cache");
    }
    reset_case(); $state['response'] = new \Exception('timeout'); check(SEO\redirect_target() === '', 'network timeout fails open');
    SEO\noindex_headers(); check($sent_headers === array('X-Robots-Tag: noindex, follow'), 'unavailable article retains CMS response with noindex');
    foreach (array('', '<link rel="canonical" href="https://rauvia.com.mx/">', '<link rel="canonical" href="'.$url.'"><link rel="canonical" href="'.$url.'">') as $body) {
        reset_case(); $state['response'] = array('status'=>200,'body'=>$body);
        check(SEO\redirect_target() === '', 'generic/mismatched/duplicate canonical rejected');
    }
    reset_case(); $state['response'] = array('status'=>200,'body'=>'<link rel="canonical" href="'.$url.'">','x-robots-tag'=>'noindex');
    check(SEO\redirect_target() === '', 'noindex header destination rejected');
    reset_case(); $state['response'] = array('status'=>200,'body'=>'<link rel="canonical" href="'.$url.'"><meta content="noindex, follow" name="robots">');
    check(SEO\redirect_target() === '', 'noindex meta destination rejected');
    foreach (array('archive','front','home_page','search') as $flag) {
        reset_case(); $state['singular'] = false; $state[$flag] = true;
        $robots = SEO\robots(array('index'=>true,'nofollow'=>true,'max-image-preview'=>'large'));
        check(!isset($robots['index']) && !isset($robots['nofollow']) && $robots['noindex'] && $robots['follow'], "$flag robots are consistent");
        SEO\noindex_headers(); check($sent_headers === array('X-Robots-Tag: noindex, follow'), "$flag header survives coming-soon template");
    }
    reset_case(); $state['feed'] = true; SEO\noindex_headers(); check(count($sent_headers) === 1, 'feed has noindex header');
    reset_case(); $state['preview'] = true; SEO\noindex_headers(); check(!$sent_headers, 'preview headers unchanged');
    reset_case(); check(SEO\sitemaps_enabled(true) === false, 'CMS sitemap disabled');
    $state['home'] = 'https://another-site.example/'; check(SEO\sitemaps_enabled(true) === true && SEO\redirect_target() === '', 'other sites unchanged');
    check(isset($hooks['template_redirect'][0], $hooks['template_redirect'][1]), 'redirect and header precede Hostinger priority 10');
    echo "TOTAL: $passed passed\n";
}
