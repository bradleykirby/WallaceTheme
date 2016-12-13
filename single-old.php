<html>
  <head>
    <meta charset="utf-8" />
    <base href="/">
    <title><?php echo the_title(); ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1">    
    <link rel="icon" type="image/png" href="https://s3.amazonaws.com/elasticbeanstalk-us-east-1-895777409806/media/favicon.ico" sizes="64x64">
    <link href="https://fonts.googleapis.com/css?family=Fjord+One|Montserrat|Open+Sans:300" rel="stylesheet">
   
    <?php 
        wp_head(); 
        $wal_theme_path = get_template_directory_uri();
    ?>

  </head>
  <body>

    <wallace> 

          <?php 
            function wal_display_content(){
              $post_previews = array();
              the_post();
              $post_preview = array();
                  $post_preview['type'] = 0; //0 === type of POST
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
                  $post_preview['content'] = apply_filters('the_content', get_the_content());
                  $post_preview['contentLoaded'] = false;
                  $post_preview['itemVisible'] = 'visible';
                  $post_preview['navigatingTo'] = false;

                  $post_preview['date'] = get_the_date();
                  $post_preview['path'] = parse_url(get_the_permalink(), PHP_URL_PATH);
                 if(has_post_thumbnail()){
                    $post_preview['imageURLLowRes'] = wp_get_attachment_image_src(
                            (int) get_post_thumbnail_id(), 'medium')[0];
                    $post_preview['imageURLHiRes'] = wp_get_attachment_image_src(
                            (int) get_post_thumbnail_id(), 'large')[0];
                  }
                  else{
                    $post_preview['imageURLHiRes'] = 'NONE';
                  }

                  array_push($post_previews, $post_preview);

                  if($post_preview['imageURLHiRes'] !== 'NONE'){
                     echo '<article><div class="header-image-wrapper">
                        <img src="' . $post_preview['imageURLHiRes'] . '" class="post-image"/>
                        <a class="site-logo-anchor" href="/"><img class="site-logo" src="' . get_template_directory_uri() . '/logo.png"/></a>
                        <h1 class="post-title">' . $post_preview['title'] . '</h1>
                      </div>
                      <div class="post-content">' . $post_preview['content'] . '</div>';
                  }

                  else{
                   echo '<header id="home-header"> 
                        <a href="/"><img src="' . get_template_directory_uri() . '/logo.png"/></a>
                        <h1 id="site-title">' . get_bloginfo('name') . '</h1>
                        <button id="page-menu-button">Menu</button>
                    </header>
                    <nav id="page-links">';
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
                    echo '</nav>';
                    echo '<article><div class="header-image-wrapper no-image">
                        <h1 class="post-title">' . $post_preview['title'] . '</h1>
                      </div>
                      <div class="post-content">' . $post_preview['content'] . '</div>';

                  }

              return $post_previews;
            }
            $wal_posts = wal_display_content();
          ?>

        </article>
    </wallace>


    <script>
      var walThemePath = "<?php echo get_template_directory_uri(); ?>";

      var walInitialState = {};

      walInitialState.siteData = {};
      walInitialState.siteData.iconUrl = <?php echo json_encode($wal_site_icon_url); ?>;
      walInitialState.siteData.title = "<?php echo get_bloginfo('name'); ?>";

      walInitialState.posts = <?php echo json_encode($wal_posts); ?>;
      walInitialState.itemClicked = null;
      walInitialState.currentApiPage = 1;
      walInitialState.initialAction = {actionType: 0}; //0 === NONE action type
      walInitialState.siteTitle = "<?php echo get_bloginfo('name'); ?>";

      walInitialState.themePath = walThemePath;

      var walPath = window.location.pathname;  
      walInitialState.activeRoute = {path: walPath, resource: walInitialState.posts[0]};

      //var walMenuButton =  document.getElementById('page-menu-button');
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
    <!-- IE required polyfills, in this exact order -->

   <!-- <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,700" rel="stylesheet"> -->




    

    <?php wp_footer() ?>

  </body>
</html>
