<?php
class Wallace{

	private static $featured_post_id = null;
	private static $WAL_VERSION = "1.1.0";

	public static function get_initial_state($view, $id){
		if($view === 'home'){
			$app_state = [
				'posts' => self::get_initial_posts(true),
				'site_data'=> self::get_site_data(),
			];
			return $app_state;
		}
		elseif ($view === 'post') {
			$app_state = [
				'posts' => self::get_post($id),
				'site_data'=> self::get_site_data(),
			];
			return $app_state;

		}
	}

	public static function get_post($id){
		$request = new WP_REST_Request('GET', '/wallace/v1/posts/'.$id);
		$response = rest_get_server()->dispatch($request);
		return $response->data['posts'];
	}

	public static function get_featured_post(){
		if(self::get_featured_post_id() == -1){
			return null;
		}
		else{
			$request = new WP_REST_Request('GET', '/wallace/v1/posts/'.self::get_featured_post_id());
			$response = rest_get_server()->dispatch($request);
			return $response->data['posts'][0];
		}
	}

	public static function get_site_data(){
		$request = new WP_REST_Request('GET', '/wallace/v1/site-data');
		$response = rest_get_server()->dispatch($request);
		return $response->data;
	}

	public static function get_initial_posts($get_featured){
		$request = new WP_REST_Request('GET', '/wallace/v1/posts');

		if($get_featured){
			$request->set_param("featured", 'true');
		}
		
		$response = rest_get_server()->dispatch($request);
		return $response->data['posts'];
	}

	public static function set_featured_post_id($id){
		self::$featured_post_id = $id;
	}


	public static function get_featured_post_id(){
		if(self::$featured_post_id === null){
			self::$featured_post_id = -1;
		}
		return self::$featured_post_id;
	}

	public static function get_version(){
		return self::$WAL_VERSION;
	}
}





?>
