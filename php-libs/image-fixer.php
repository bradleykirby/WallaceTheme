<?php
/**
 * Plugin Name: iOS Images Fixer
 * Plugin URI: http://bishoy.me/wp-plugins/ios-images-fixer/
 * Description: This plugin fixes iOS-taken images' orientation upon uploading using ImageMagic Library if available or PHP GD as a fallback. No settings editing required, just activate the plugin and try uploading an image from your idevice! If you like this free plugin, please <a href="http://bishoy.me/donate" target="_blank">consider a donation</a>.
 * Version: 1.2.2
 * Author: Bishoy A.
 * Author URI: http://bishoy.me
 * License: GPL2
 */

/*  Copyright 2014  Bishoy A.  (email : hi@bishoy.me)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as 
    published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

class BAImageFixer {

	/**
	 * Instance
	 * @var object
	 */
	protected static $instance;

	/**
	 * Access this plugin’s working instance
	 *
	 * @wp-hook plugins_loaded
	 * @return  object of this class
	 */
	public static function get_instance() {
	
		if ( null === self::$instance ) {
			self::$instance = new self;
		}
		return self::$instance;	
	}

	/**
	 * Start the plugin
	 * @since 1.0
	 */
	public static function start() {
		add_filter( 'wp_handle_upload_prefilter', array( self::get_instance(), 'imf_exif_rotate' ) );
		// if ( is_admin() ){ 
		// 	add_action( 'admin_notices', array( self::get_instance(), 'required_function_notice' ) );
		// 	add_action( 'admin_menu', array( self::get_instance(), 'imf_menu' ) );
		// }
	}

	/**
	 * Add Media Menu Page
	 * @since  1.2
	 * @return void
	 */
	public function imf_menu() {
		$fixer_page = add_media_page('Fix iOS images', 'Fix iOS images', 'manage_options', 'ios-images-fixer', array( self::get_instance(), 'ios_fixer_page' ) );
		add_action( 'admin_head-' . $fixer_page, array( self::get_instance(), 'admin_head' ) );
	}

	/**
	//  * Custom Styles for the fixer page
	//  * @since  1.2
	//  * @return mixed
	//  */
	// public function admin_head() { 
	// 	<style>
	// 		.fix-link {
	// 			color: #006000;
	// 			font-weight: bold;
	// 		}

	// 		.fix-link:hover {
	// 			color: green;
	// 		}
	// 	</style>
	// <?php }

	/**
	 * Page function
	 * @return void
	 */
	public static function ios_fixer_page() {
		//require_once 'ios-fixer-page.php';
	}

	/**
	 * Admin notice if a required function is not available
	 * @return mixed
	 */
	public static function required_function_notice() {
		if ( self::something_is_wrong() ) {
			echo '<div class="error">
		       <p><strong>iOS Images Fixer Error:</strong> ' . self::something_is_wrong() . '</p>
		    </div>';
		}

		return false;
	}

	/**
	 * Checks if required functions are enabled
	 * @return boolean|string
	 */
	public static function something_is_wrong() {
		if ( ! function_exists( 'read_exif_data' ) ) {
			return __( 'The function <strong>read_exif_data()</strong> is currently disabled in your PHP configuration. This is a required function for the plugin to work. Please enable this function or contact your hosting provider to do so for you.' );
		} elseif ( ! class_exists( 'Imagick' ) ) {
			if ( ! function_exists( 'imagecreatefromjpeg' ) ) {
				return __( 'PHP GD and Imagick extensions are currently disabled in your PHP configuration. At least one of these extensions should be enabled. Please enable one of them or contact your hosting provider to do so for you.' );
			}
		}
		return false;
	}

	/**
	 * Rotate images to the correct orientation
	 * @param  array $file $_FILES array
	 * @return array	   $_FILES array in the correct orientation
	 * @since 1.0
	 */
	public static function imf_exif_rotate( $file ){

		if ( self::something_is_wrong() ) {
			return $file;
		}

		$exif = self::imf_exif_orient_correction( $file );
		return $exif;
	}

	/**
	 * Get broken images from Media
	 * @since  1.2
	 * @return array
	 */
	public static function get_broken_images() {
		$query_images_args = array(
		    'post_type'      => 'attachment', 
		    'post_mime_type' =>'image/jpeg', 
		    'post_status'    => 'inherit', 
		    'posts_per_page' => -1,
		);

		$query_images = new WP_Query( $query_images_args );

		$broken_images = array();

		foreach ( $query_images->posts as $image ) {
			$path = get_attached_file( $image->ID );
			if ( self::is_image_broken( $path ) ) {
				$broken_images[] = $image;
			}
		}
		return $broken_images;
	}

	/**
	 * Checks if the image needs to be corrected
	 * @since  1.2
	 * @param  string  $path_to_image
	 * @return boolean 
	 */
	public static function is_image_broken( $path_to_image ) {
		$exif = @read_exif_data( $path_to_image );
		$exif_orient = isset($exif['Orientation'])?$exif['Orientation']:0;
		$rotateImage = 0;

		if ( 6 == $exif_orient ) {
			$rotateImage = 90;
		} elseif ( 3 == $exif_orient ) {
			$rotateImage = 180;
		} elseif ( 8 == $exif_orient ) {
			$rotateImage = 270;
		}

		if ( $rotateImage ) {
			return $rotateImage;
		} else {
			return 0;
		}
	}

	/**
	 * Rotate images to the correct orientation
	 * @param  array $file $_FILES array
	 * @return array	   $_FILES array in the correct orientation
	 * @since 1.0
	 */
	public static function imf_exif_orient_correction( $file ) {

		if ( $file['type'] != 'image/jpeg' ) {
			return $file;
		}

		self::fix_orientation( $file['tmp_name'] );

		return $file;
	}

	/**
	 * Fixes image orientation
	 * @param  string $img_path
	 * @return boolean
	 */
	public static function fix_orientation( $img_path ) {

		if ( self::something_is_wrong() ) {
			return false;
		}
		
		@set_time_limit( 900 );
		$rotateImage = self::is_image_broken( $img_path );

		if ( $rotateImage ) {
			if ( class_exists( 'Imagick' ) ) {

				do_action( 'imf_imagick_fix', $img_path, $rotateImage );

				$imagick = new Imagick();
				$ImagickPixel = new ImagickPixel();
				$imagick->readImage( $img_path );
				$imagick->rotateImage( $ImagickPixel, $rotateImage );
				$imagick->setImageOrientation( 1 );
				$imagick->writeImage( $img_path );
				$imagick->clear();
				$imagick->destroy();

				do_action( 'imf_imagick_fixed', $img_path, $rotateImage );

			} else {

				do_action( 'imf_fix', $img_path, $rotateImage );

				$rotateImage = -$rotateImage;
				$source = imagecreatefromjpeg( $img_path );
				$rotate = imagerotate( $source, $rotateImage, 0 );
				imagejpeg( $rotate, $img_path );

				do_action( 'imf_fixed', $img_path, $rotateImage );
			}
			return true;
		} else {
			return false;
		}
	}
}

function imf_ios_images_fixer() {
	BAImageFixer::start();
}

$_GLOBAL['BAImageFixer'] = imf_ios_images_fixer();