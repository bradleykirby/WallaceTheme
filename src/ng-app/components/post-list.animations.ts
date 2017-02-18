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
	trigger('fadeOut', [
		state('in', style({transform: 'translateY(0px)', opacity: 1})),
		state('out', style({transform: 'translateY(-100px)', opacity: 0})),
		transition('out => in', animate('.45s')),
		transition('in => out', [
			animate('275ms 175ms', keyframes([
					style({opacity: 1}),
					style({opacity: 0})
				]))
		])
		]),
	trigger('simpleFade', [
		state('void', style({opacity: 0})),
		state('*', style({opacity: 1})),
		transition('* => *', animate('.5s'))
		]),
	trigger('heightEnter', [
		state('void', style({height: '0px'})),
		state('*', style({height: '100px'})),
		transition('* <=> void', animate('.5s'))
		]),
	trigger('itemSelected', [
	//	state('false', style({opacity: 1, transform: 'scale(1)'})),
		state('true', style({opacity: 1, transform: 'scale(0.9) translateY(-50%)'})),
		// state('void', style({opacity: 0, transform: 'scale(0.8) translateY(-20%)'})),
		transition('0 => 1', [
	      animate('450ms', keyframes([
	        style({opacity: 1, transform: 'scale(1) translateY(0%)', offset: 0}),
	        style({opacity: 1, transform: 'scale(0.9) translateY(0%)',  offset: 0.5}),
	        style({opacity: 1, transform: 'scale(0.9) translateY(-50%)',     offset: 1.0})
	      ])),
    	]),
      	// transition('0 <=> void', animate('0.5s'))

		])
]; 