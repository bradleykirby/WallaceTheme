<?php
class Wallace{

	private static $featured_post_id = null;
	private static $WAL_VERSION = "1.1.0";

	public static function get_initial_state($view, $id){
		if($view === 'home'){
			$app_state = [
				'posts' => self::get_initial_posts(true),
				'pages' => self::get_initial_pages(),
				'post_matcher' => self::get_matcher(),
				'site_data'=> self::get_site_data(),
			];
			return $app_state;
		}
		elseif ($view === 'post' || $view === 'page') {
			$app_state = [
				'posts' => $view === 'post' ? self::get_post($id) : array(),
				'pages' => $view === 'page' ? self::get_page($id) : array(),
				'post_matcher' => self::get_matcher(),
				'site_data'=> self::get_site_data(),
			];
			return $app_state;

		}
	}
	
	public static function get_matcher(){
		$permalink_regex = '';
		$permalink_structure = explode( '/', get_option( 'permalink_structure' ) );
		
		foreach ($permalink_structure as $part){
			if ($part !== ''){
				switch ($part){
					case '%year%':
						$permalink_regex .= '[0-9]{4}\/';
						break;
					case '%monthnum%':
					case '%day%':
					case '%hour%':
					case '%minute%':
					case '%second%':
						$permalink_regex .= '[0-9]{2}\/';
						break;
					case '%post_id%':
						$permalink_regex .= '[0-9]+\/';
						break;
					case '%postname%':
					case '%category%':
					case '%author%':
						$permalink_regex .= '.+\/';
						break;
					default:
						$permalink_regex .= $part.'\/';
				}
			}
		}
		
		return ($permalink_regex!==''?'\/':'').$permalink_regex;
	}
	
	public static function get_page($id){
		$request = new WP_REST_Request('GET', '/wallace/v1/pages/'.$id);
		$response = rest_get_server()->dispatch($request);
		return $response->data['pages'];
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
	
	public static function get_initial_pages(){
		$request = new WP_REST_Request('GET', '/wallace/v1/pages');
		
		$response = rest_get_server()->dispatch($request);
		return $response->data['pages'];
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
