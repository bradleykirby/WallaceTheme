# WallaceTheme
Wallace is a next-generation WordPress theme built with the Rest API and Angular2. 
https://demo.wallacetheme.com

Wallace uses an API-first approach for rendering both on the server and client. You get all the performance of a single page app with all the SEO benefits and wp-admin compatibility of a traditional server-rendered theme. 

## Installation
A fully built and ready-to-install .zip will be provided soon. In the meantime you can build and install the project yourself by doing the following: 

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
