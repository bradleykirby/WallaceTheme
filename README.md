# WallaceTheme
Wallace is an experimental WordPress blogging theme built with the Rest API and Angular 2. **It is no longer under active development.**

Wallace uses an API-first approach for rendering both on the server and client. You get all the performance of a single page app with all the SEO benefits and wp-admin compatibility of a traditional server-rendered theme. 


Notice: Requires WordPress version 4.7 or higher and "pretty" permalinks. Some plugins may be incompatible with this theme - particularly those that make heavy modifications to the structure of the site like page builders. Plugins that only modify the data of a website (rather than its structure) and plugins that introduce code to the `<head>` and `<footer>` (like an SEO plugin) should work properly.


## Instructions for non-technical users
A fully built and ready-to-install .zip is available in the repository above. Download the Wallace.zip file and install the theme as you would normally. 
## Instructions for technical users


Navigate to your WP theme directory and run:
`git clone https://github.com/bkirby989/WallaceTheme`

navigate to the Wallace theme folder and run: 
`sudo npm install`

To develop with automatic compilation:
`webpack --watch`

To make a production build:
`npm run build-prod`



Copyright (c) 2016 Black Coffee Interactive LLC

