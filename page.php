<?php
	$page_id = get_the_ID();
	$wal_app_state = Wallace::get_initial_state('page', $page_id);
	$wal_menu = Wallace::get_menu('primary', true);
	get_header();
?>
	<title><?php echo the_title(); ?></title>
    </head>
    <body>
    	<wallace>

			<?php 
				echo $wal_twig->render('page.html', array(
				'page' => $wal_app_state['pages'][0], 
				'siteData' => $wal_app_state['site_data'],
				'headerMenu' => $wal_menu)); 
			?>
    	</wallace>

    	<script>
			var walInitialState = <?php echo json_encode($wal_app_state); ?>;
			walInitialState.selectedPostId = -1;
			walInitialState.selectedPageId = <?php echo $page_id; ?>;
		</script>

<?php
get_footer();
?>