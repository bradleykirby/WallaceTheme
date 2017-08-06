
<?php
	$post_id = get_the_ID();
	$wal_app_state = Wallace::get_initial_state('post', $post_id);
	$wal_menu = Wallace::get_menu('primary', true);
	get_header();
?>
	<title><?php echo the_title(); ?></title>
    </head>
    <body>
    	<wallace>

			<?php 
				echo $wal_twig->render('post.html', array(
				'post' => $wal_app_state['posts'][0], 
				'siteData' => $wal_app_state['site_data'],
				'headerMenu' => $wal_menu)); 
			?>
    	</wallace>

    	<script>
			var walInitialState = <?php echo json_encode($wal_app_state); ?>;
			walInitialState.selectedPostId = <?php echo $post_id; ?>;
			walInitialState.selectedPageId = -1;
		</script>

<?php get_footer(); ?>


	