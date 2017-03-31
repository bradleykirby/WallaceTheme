import 'rxjs';

import 'core-js/es6';
import 'core-js/es7/reflect';

export var WPAPI = require( 'wpapi' );

require('zone.js/dist/zone');
import 'web-animations-js';



//IE polyfill for css object-fit
var objectFitImages = require('object-fit-images');
objectFitImages.default();