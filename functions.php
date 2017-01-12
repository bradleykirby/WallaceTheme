<?php

require_once 'src/wp-app/wallace-util.php';
require_once 'src/wp-app/endpoints.php';

if (!class_exists('Twig_Autoloader')){
	require_once 'php-libs/Twig/lib/Twig/Autoloader.php';
	Twig_Autoloader::register();
}

$wal_loader = new Twig_Loader_Filesystem(get_template_directory() . '/src/wp-app/templates' );
$wal_twig = new Twig_Environment($wal_loader, array(
    'cache' => get_template_directory() . '/src/wp-app/templates/template-cache',
));




function wal_init(){
	
	add_theme_support( 'post-thumbnails' ); 

	$featured_post_id = -1;
	if(wp_count_posts()->publish > 0){
		$sticky_posts = get_option( 'sticky_posts' );
		$most_recent_post_id = wp_get_recent_posts(array(
				'numberposts' => 1,
				'post_type' => 'post'))[0]['ID'];
		if (empty($sticky_posts)){
			stick_post($most_recent_post_id );
			$featured_post_id = $most_recent_post_id;
		}
		else if (count($sticky_posts) >= 1){
			$featured_post_id = end($sticky_posts);
		}
		
	}
		Wallace::set_featured_post_id($featured_post_id);

	

}

add_action( 'after_setup_theme', 'wal_init' );




function wal_handle_stuck_post($stuck_post_id){
	Wallace::set_featured_post_id($stuck_post_id);
	$sticky_posts = get_option( 'sticky_posts' );
	if (count($sticky_posts) > 1){
		unstick_post($sticky_posts[count($sticky_posts)-2]);
	}
}
add_action( 'post_stuck', 'wal_handle_stuck_post', 10, 1);



function wal_add_async_attribute($tag, $handle) {
    if ( 'wal-script' !== $handle )
        return $tag;
    return str_replace( ' src', ' async="async" src', $tag );
}
add_filter('script_loader_tag', 'wal_add_async_attribute', 10, 2);



function wal_add_scripts_and_styles(){

	wp_enqueue_style( 'wal-style', get_template_directory_uri() . 
		'/dist/styles.css', false, '1.0.1', false );
	
	if ( is_customize_preview() === false ){

		wp_enqueue_script('wal-script', get_template_directory_uri() .
		'/dist/app.bundle.js', false, '1.0.1', true);
	}
}
add_action( 'wp_enqueue_scripts', 'wal_add_scripts_and_styles' );



function wal_shorten_excerpt() {
	return 22;
}
add_filter( 'excerpt_length', 'wal_shorten_excerpt', 999 );

?>