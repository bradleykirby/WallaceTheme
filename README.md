# WallaceTheme
Wallace is a next-generation WordPress theme built with the Rest API and Angular2. 
Live Demo: https://demo.wallacetheme.com

Wallace uses an API-first approach for rendering both on the server and client. You get all the performance of a single page app with all the SEO benefits and wp-admin compatibility of a traditional server-rendered theme. 

**Notice: Requires WordPress version 4.7 or higher and "pretty" permalinks. Some plugins may be incompatible with this theme.**

## Installation
A fully built and ready-to-install .zip is available at https://wallacetheme.com. You can also build and install the project yourself by doing the following: 

Navigate to your WP theme directory and run:

`git clone https://github.com/bkirby989/WallaceTheme`

navigate to the Wallace theme folder and run: 

`npm install`

## Usage
To develop with automatic compilation:
`webpack --watch`

Be sure to disable Twig template cache before editing Twig templates. 

To make a production build:
`npm run build-prod`
