
<?php
	$wal_app_state = Wallace::get_initial_state('home', null);
	get_header();
?>
<title><?php echo bloginfo(); ?></title>
    </head>

    <body>
    	<wallace>
			<?php echo $wal_twig->render('home.html', array(
				'posts' => $wal_app_state['posts'], 
				'siteData' => $wal_app_state['site_data'])); 
			?>
    	</wallace>

    	<script>

			var walInitialState = <?php echo json_encode($wal_app_state); ?>;
			walInitialState.selectedPostId = -1;
			walInitialState.selectedPageId = -1;
		</script>

<?php get_footer(); ?>


	