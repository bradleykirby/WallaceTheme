<?php
	$wal_app_state = Wallace::get_initial_state('page', get_the_ID());
	get_header();
?>
	<title><?php echo the_title(); ?></title>
    </head>
    <body>
    	<wallace>

			<?php 
				echo $wal_twig->render('page.html', array(
				'page' => $wal_app_state['pages'][0], 
				'siteData' => $wal_app_state['site_data'])); 
			?>
    	</wallace>

    	<script>
			var walInitialState = <?php echo json_encode($wal_app_state); ?>;
			walInitialState.selectedPostId = -1;
			walInitialState.selectedPageId = <?php echo get_the_ID(); ?>;
		</script>

<?php
get_footer();
?>