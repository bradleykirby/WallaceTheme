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
		transition('void => *', animate('.5s')),
		transition('* => void', animate('.5s')),

		]),
	trigger('simpleSlide', [
		state('void', style({transform: 'translateY(-100%'})),
		state('*', style({transform: 'translateY(0)'})),
		transition('void => *', animate('.5s')),
		transition(':leave', [animate(500, style({transform: 'translateY(100%)'}))])

		]),
	trigger('flash', [
		state('off', style({background: 'rgba(4, 4, 48, 0.2)'})),
		state('on-white', style({background: 'white'})),
		state('on-red', style({background: 'rgba(222, 33, 33, 1)'})),
		state('off-red', style({background: 'rgba(222, 33, 33, 1)'})),

		transition('off => on-white', animate('0.5s')),
		transition('on-white => off', animate('1s')),
		transition('off => on-red', animate('0.5s')),

		]),
	trigger('flashGreen', [
		state('off', style({backgroundColor: '#262626'})),
		state('on', style({backgroundColor: 'green'})),



		transition('off => on', animate('0.5s', keyframes([
			style({backgroundColor: '#262626', offset: 0}),
			style({backgroundColor: '#00b300', offset: 0.5}),
			style({backgroundColor: 'green', offset: 1}),
		])))
	]),

	trigger('progressSlide', [
		state('0', style({transform: 'translateX(0%)'})),
		state('1', style({transform: 'translateX(30%)'})),
		state('2', style({transform: 'translateX(70%)'})),
		state('3', style({transform: 'translateX(100%)'})),
		transition('* => *', animate('0.25s'))

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