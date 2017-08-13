
<?php
	$wal_app_state = Wallace::get_initial_state('home', null);
	$wal_menu = Wallace::get_menu('primary', true);
	get_header();
?>
<title><?php echo bloginfo(); ?></title>
    </head>

    <body>
    	<wallace>
			<?php echo $wal_twig->render('home.html', array(
				'posts' => $wal_app_state['posts'], 
				'siteData' => $wal_app_state['site_data'],
				'headerMenu' => $wal_menu)); 
			?>
    	</wallace>

    	<script>
			var walInitialState = <?php echo json_encode($wal_app_state); ?>;
			walInitialState.selectedPostId = -1;
			walInitialState.selectedPageId = <?php echo get_option( 'page_on_front' ) == "0" ? -1 : (int)get_option( 'page_on_front' ) ?>;
		</script>

<?php get_footer(); ?>