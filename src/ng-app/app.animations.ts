import {trigger, state, style, transition, animate, keyframes} from '@angular/core';

export const animations = [
trigger('simpleSlide', [
		state('void', style({transform: 'translate(-100%, 0%)', opacity: 0})),
		state('*', style({transform: 'translate(0%, 0%)', opacity: 1})),
		transition('void <=> *', animate('.5s')),
		// transition('* => void', animate('.5s', keyframes([
		// 	style({transform: 'translate(0%, 0%)'}),
		// 	style({transform: 'translate(100%, 0%)'})
		// 	])
		// ))

		])
]