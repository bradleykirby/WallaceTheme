import {trigger, state, style, transition, animate} from '@angular/core';

export const animations = [
	trigger('postEnter', [
		state('void', style({opacity: 0, transform: 'translateY(33vh)'})),
		state('true', style({opacity: 1, transform: 'translateY(0vh)'})),
   		transition('void <=> 1', animate('5s'))
		]),
	trigger('contentLoaded', [
		state('void', style({opacity: 0})),
		state('true', style({opacity: 1})),
		transition('void <=> 1', animate('.5s'))
		]),
	trigger('flyIn', [
		state('void', style({opacity: 0, transform: 'translateY(-100%)'})),
		state('true', style({opacity: 1, transform: 'translateY(0%)'})),
		transition('void => 1', animate('.5s'))
		]),
	trigger('flyOutLeft', [
		state('false', style({transform: 'translateX(0%)'})),
		state('true', style({transform: 'translateX(-100%)'})),
		state('void', style({transform: 'translateX(-100%)'})),
		transition('void => 0', animate('.5s')),
		transition('0 => 1', animate('.5s'))
		]),
	trigger('flyOutTop', [
		state('false', style({transform: 'translateY(0%)'})),
		state('true', style({transform: 'translateY(-100%)'})),
		state('void', style({transform: 'translateY(-100%)'})),
		transition('void => 0', animate('.5s')),
		transition('0 => 1', animate('.5s'))
		]),
	trigger('flyOutBottom', [
		state('false', style({transform: 'translateY(0vh)'})),
		state('true', style({transform: 'translateY(33vh)'})),
		state('void', style({transform: 'translateY(33vh)'})),
		transition('void => 0', animate('.5s')),
		transition('0 => 1', animate('.5s'))
		]),
	trigger('toHome', [
		state('false', style({transform: 'translateX(0%)'})),
		state('true', style({transform: 'translateY(100%)'})),
		transition('0 => 1', animate('.5s'))
		]),
	trigger('toPost', [
		state('false', style({transform: 'translateX(0%)'})),
		state('true', style({transform: 'translateX(-100%)'})),
		state('void', style({transform: 'translateX(-100%)'})),

		transition('* => *', animate('.5s'))
		])
]; 