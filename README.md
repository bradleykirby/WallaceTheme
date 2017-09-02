# WallaceTheme
Wallace is an experimental next-generation WordPress blogging theme built with the Rest API and Angular2. 

[Live Demo](https://demo.wallacetheme.com)

[Development Blog](https://blog.wallacetheme.com)

Wallace uses an API-first approach for rendering both on the server and client. You get all the performance of a single page app with all the SEO benefits and wp-admin compatibility of a traditional server-rendered theme. 

**Notice: Master branch may contain unstable code. Use a tagged release if you need stability.** 

**Notice: Requires WordPress version 4.7 or higher and "pretty" permalinks. Some plugins may be incompatible with this theme - particularly those that make heavy modifications to the structure of the site like page builders. Plugins that only modify the data of a website (rather than its structure) and plugins that introduce code to the `<head>` and `<footer>` (like an SEO plugin) should work properly.** 

This project is under active development and updates may introduce breaking changes or changes that alter the structure and design of your site. If you prefer, you can wait for a more stable 2.0 release. 

## Instructions for non-technical users
A fully built and ready-to-install .zip is available at https://wallacetheme.com. Wallace is a basic blog theme that is uncommonly fast. If that's what you're looking for, read no further and simply download and install the theme as you would normally. If you experience any issues feel free to create an issue here or email me at bradley@wallacetheme.com 

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

