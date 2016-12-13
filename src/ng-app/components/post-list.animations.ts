import {trigger, state, style, transition, animate, keyframes} from '@angular/core';

export const animations = [
	trigger('postsLoading', [
		state('true', style({opacity: 1})),
		state('false', style({opacity: 0})),
   		transition('0 <=> 1', animate('.5s'))
		]),
	trigger('postEnter', [
		state('void', style({opacity: 0, transform: 'scale(0.8) translateY(-20%)'})),
		state('true', style({opacity: 1, transform: 'scale(1) translateY(0%)'})),
		transition('void => 1', animate('.5s'))
		]),
	trigger('postLeave', [
		state('false', style({opacity: 1})),
		state('true', style({opacity: 0})),
		state('void', style({opacity: 0})),
		transition('* <=> 1', animate('.25s .25s')),
		transition('void => *', animate('.25s'))
		]),
	trigger('itemSelected', [
		state('false', style({opacity: 1, transform: 'scale(1)'})),
		state('true', style({opacity: 0, transform: 'scale(0.9) translateY(-50%)'})),
		// state('void', style({opacity: 0, transform: 'scale(0.8) translateY(-20%)'})),
		transition('0 => 1', [
	      animate('500ms 100ms', keyframes([
	        style({opacity: 1, transform: 'scale(1) translateY(0%)', offset: 0}),
	        style({opacity: 0.5, transform: 'scale(0.9) translateY(0%)',  offset: 0.5}),
	        style({opacity: 0, transform: 'scale(0.9) translateY(-50%)',     offset: 1.0})
	      ])),
    	]),
      	// transition('0 <=> void', animate('0.5s'))

		])
]; 