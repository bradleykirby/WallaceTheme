<html>
	<head>
		<meta charset="utf-8">
    	<meta name="viewport" content="width=device-width, initial-scale=1">    
		<base href="/"/>
    	<title><?php echo the_title(); ?></title>
		<link rel="icon" type="image/png" href="https://s3.amazonaws.com/elasticbeanstalk-us-east-1-895777409806/media/favicon.ico" sizes="64x64">
		<link href="https://fonts.googleapis.com/css?family=Fjord+One|Montserrat|Open+Sans:300" rel="stylesheet">

		<?php 
		    wp_head(); 
		    $wal_theme_path = get_template_directory_uri();
		    $wal_site_icon_url = get_site_icon_url();
		?>

	</head>

	<body>
		<wallace>
		  <header id='home-header'> 
		      <a href="/"><img src="<?php echo $wal_site_icon_url ?>"/></a>
		      <h1 id="site-title"><?php echo bloginfo('name') ?></h1>
		      <button id="page-menu-button" style='display: none'>Menu</button>
		  </header>
		  <nav id="page-links">
		      <?php
		        $wal_get_pages = get_pages();
		        $wal_pages = array();
		        foreach($wal_get_pages as $wal_page_obj) {
		          $wal_page_array = $wal_page_obj->to_array();
		          $wal_page['type'] = 1;
		          $wal_page['id'] = $wal_page_array['ID'];
		          $wal_page['title'] = $wal_page_array['post_title'];
		          $wal_page['path'] = parse_url(get_permalink($wal_page_obj), PHP_URL_PATH);
		          $wal_page['content'] = $wal_page_array['post_content'];
		          array_push($wal_pages, $wal_page);
		          echo '<a href=' . $wal_page['path'] . ' class="page-item">' 
		          . $wal_page['title'] . '</a>';
		        }
		      ?>
		  </nav>
		  <wal-post-list class="home">
		      <?php
		      function wal_display_post_previews(){
		        $post_previews = array();
		        $first_post = 'featured';
		        $img_url = 'imageURLHiRes';
		        if(have_posts()){
		          while(have_posts()){
		              the_post();

		              $post_preview = array();
		              $post_preview['type'] = 0;
		              $post_preview['id'] = get_the_ID();
		              $post_preview['title'] = get_the_title();
		              $post_preview['excerpt'] = get_the_excerpt();
		              $post_preview['categories'] = get_the_category();
		              $post_preview['categoryString'] = "";
		              foreach ($post_preview['categories'] as $key => $category) {
		                if($key == 0){
		                  $post_preview['categoryString'] = $category->name;
		                }
		                else{
		                  $post_preview['categoryString'] = $post_preview['categoryString'] . ', ' . $category->name;
		                }
		              }
		              $post_preview['content'] = '';
		              $post_preview['contentLoaded'] = false;
		              $post_preview['itemVisible'] = 'visible';
		              $post_preview['navigatingTo'] = false;


		              $post_preview['date'] = get_the_date();
		              $post_preview['path'] = substr(parse_url(get_the_permalink(), PHP_URL_PATH), 1, -1);
		              if(has_post_thumbnail()){
		                $post_preview['imageURLLowRes'] = wp_get_attachment_image_src(
		                        (int) get_post_thumbnail_id(), 'medium')[0];
		                $post_preview['imageURLHiRes'] = wp_get_attachment_image_src(
		                        (int) get_post_thumbnail_id(), 'large')[0];
		              }
		              else{
		                $post_preview['imageURL'] = 'NONE';
		              }
		              

		              array_push($post_previews, $post_preview);

		              $class_list = 'post-preview ';
		              if($post_preview[$img_url] === 'NONE'){
		                $class_list = $class_list . 'no-image ';
		              }


		          echo '<div class="' . $class_list . $first_post .'" id="' . $post_preview['id'] . '">';
		                  if($post_preview[$img_url] !== 'NONE'){
		                  echo '<div class="post-image-wrapper">
		                          <img src="' . $post_preview[$img_url] . '" class="post-image"/>
		                        </div>';
		                  }
		                  echo '<div class="post-info">
		                    <a href=' . $post_preview['path'] . '><h2 class="post-title">' . $post_preview['title'] . '</h2></a>
		                    <p class="excerpt">' . $post_preview['excerpt'] . '</p>
		                    <div class="category"><span>' . $post_preview['categoryString'] . '</span></div> 
		                  </div>
		                  <p class="excerpt-drawer">' .
		                    $post_preview['excerpt'] . 
		                  '</p>
		                  <hr class="post-divider">
		                </div>
		              ';

		              $first_post = '';
		        	$img_url = 'imageURLLowRes';

		          }
		        }
		          return $post_previews;     
		      }
		        $wal_post_previews = wal_display_post_previews();
		      ?>

		  </wal-post-list>
		  <script>
		    // var walMenuButton =  document.getElementById('page-menu-button');
		    // walMenuButton.addEventListener('click', function(){
		    //   walOpenMenu();
		    // });

		    // walMenuButton.addEventListener('touchend', function(e){
		    //   e.preventDefault();
		    //   walOpenMenu();
		    // });

		    function walOpenMenu(){
		        var navMenu =  document.getElementById('page-links');
		        console.log('click');
		        if(navMenu.classList.contains('active')){
		          navMenu.classList.remove('active');
		          menuButton.classList.remove('active');
		        }
		        else{
		          navMenu.classList.add('active');
		          menuButton.classList.add('active');
		        }
		      }
		  </script>

		   <script>
		    var walThemePath = "<?php echo get_template_directory_uri(); ?>";
		    var walInitialState = walSendInitialState();

		    function walSendInitialState(){

		           var initialState = {};
		           initialState.siteData = {};
		           initialState.siteData.iconUrl = <?php echo json_encode($wal_site_icon_url); ?>;
		           initialState.siteData.title = "<?php echo get_bloginfo('name'); ?>";
		           
		           initialState.posts = <?php echo json_encode($wal_post_previews); ?>;
		           initialState.pages = <?php echo json_encode($wal_pages); ?>;
		           var walPath = window.location.pathname;
		           initialState.activeRoute = {path: walPath, resource: initialState.posts[0]};
		           initialState.currentApiPage = 2;
		           initialState.initialAction = {actionType: 0}; //0 === NONE action type

		           initialState.themePath = walThemePath;

		           var postItems = document.getElementsByClassName('post-item');


		           for(var i=0; i<postItems.length; i++){
		             postItems[i].addEventListener('click', function(){
		               console.log('click');
		               var item = {};
		               item.type = 'post';
		               item.id = this.id;

		               initialState.initialAction = {actionType: 1, id: parseInt(item.id)}; //1 === POST_CLICK action type
		               prepareToActivate(item);

		             });

		             function prepareToActivate (item){
		               switch (item.type){
		                 case 'post':
		                 for(var i=0; i<postItems.length; i++){
		                   var postItem = postItems[i];
		                   if(postItem.id !== item.id){
		                     postItem.classList.add("pause");
		                     postItem.classList.remove('activating');
		                   }
		                   else{
		                     postItem.classList.add("activating");
		                     postItem.classList.remove('pause');

		                   }
		                 }
		               }
		             }
		           }
		           return initialState;
		         }
		    </script>
	    <?php wp_footer(); ?>
	</body>
</html>