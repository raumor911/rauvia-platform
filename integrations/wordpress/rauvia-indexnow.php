<?php
/**
 * Plugin Name: RAUVIA IndexNow Bridge
 * Description: Sincroniza contenido y notifica cambios de posts publicados al backend headless de RAUVIA.
 * Version: 76.0.1
 */
if (!defined('ABSPATH')) { exit; }

// Configure RAUVIA_INDEXNOW_WEBHOOK_TOKEN in wp-config.php, never in this file.
function rauvia_indexnow_queue($slugs, $event) {
    if (!defined('RAUVIA_INDEXNOW_WEBHOOK_TOKEN') || strlen(RAUVIA_INDEXNOW_WEBHOOK_TOKEN) < 32) { return; }
    $urls = array();
    foreach (array_unique($slugs) as $slug) {
        if (!is_string($slug) || !preg_match('/^[a-zA-Z0-9_%\-]+$/', $slug)) { continue; }
        $urls[] = 'https://rauvia.com.mx/recursos/' . $slug . '/';
    }
    if ($urls) { wp_schedule_single_event(time() + 5, 'rauvia_indexnow_deliver', array($urls, $event, 0)); }
}
add_action('transition_post_status', function($new, $old, $post) {
    if ($post->post_type !== 'post' || wp_is_post_revision($post->ID)) { return; }
    if ($new === 'publish' && $old !== 'publish') { rauvia_indexnow_queue(array($post->post_name), 'published'); }
    if ($old === 'publish' && $new !== 'publish') { rauvia_indexnow_queue(array($post->post_name), 'deleted'); }
}, 10, 3);
add_action('post_updated', function($id, $after, $before) {
    if ($after->post_type === 'post' && $before->post_status === 'publish' && $after->post_status === 'publish') {
        rauvia_indexnow_queue(array($after->post_name, $before->post_name), 'updated');
    }
}, 10, 3);
add_action('before_delete_post', function($id, $post) {
    if ($post->post_type === 'post' && $post->post_status === 'publish') { rauvia_indexnow_queue(array($post->post_name), 'deleted'); }
}, 10, 2);
add_action('rauvia_indexnow_deliver', function($urls, $event, $attempt) {
    if (!defined('RAUVIA_INDEXNOW_WEBHOOK_TOKEN') || strlen(RAUVIA_INDEXNOW_WEBHOOK_TOKEN) < 32) { return; }
    $response = wp_remote_post('https://rauvia.com.mx/internal/indexnow', array(
        'timeout' => 10, 'redirection' => 0,
        'headers' => array('Content-Type' => 'application/json', 'Authorization' => 'Bearer ' . RAUVIA_INDEXNOW_WEBHOOK_TOKEN),
        'body' => wp_json_encode(array('event' => $event, 'urlList' => $urls)),
    ));
    $status = is_wp_error($response) ? 0 : wp_remote_retrieve_response_code($response);
    if ($status === 202) { return; }
    // Retry network errors, throttling and server failures through WP-Cron.
    // The existing complete sitemap refresh remains the independent fallback.
    if (($status === 0 || $status === 429 || $status >= 500) && $attempt < 3) {
        wp_schedule_single_event(time() + 60 * pow(2, $attempt), 'rauvia_indexnow_deliver', array($urls, $event, $attempt + 1));
    }
    error_log('RAUVIA IndexNow bridge delivery status=' . $status . ' attempt=' . $attempt);
}, 10, 3);

// Published headless content must not be frozen by REST page/CDN caches.
add_filter('rest_post_dispatch', function($response, $server, $request) {
    if (preg_match('#^/wp/v2/posts(?:/|$)#', $request->get_route())) {
        $response = rest_ensure_response($response);
        $response->header('Cache-Control', 'no-store, max-age=0');
        do_action('litespeed_control_set_nocache', 'RAUVIA headless content');
    }
    return $response;
}, 10, 3);
