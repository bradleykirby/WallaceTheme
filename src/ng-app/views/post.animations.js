import { trigger, state, style, transition, animate } from '@angular/core';
export var animations = [
    trigger('postEnter', [
        state('void', style({ opacity: 0, transform: 'translateY(33vh)' })),
        state('true', style({ opacity: 1, transform: 'translateY(0vh)' })),
        transition('void <=> 1', animate('5s'))
    ]),
    trigger('contentLoaded', []),
    trigger('flyIn', [
        state('void', style({ opacity: 0, transform: 'translateY(-100%)' })),
        state('true', style({ opacity: 1, transform: 'translateY(0%)' })),
        transition('void => 1', animate('.5s'))
    ]),
    trigger('flyOutLeft', [
        state('in', style({ transform: 'translateX(0%)' })),
        state('out', style({ transform: 'translateX(-100%)' })),
        transition('in <=> out', animate('.45s')),
    ]),
    trigger('flyOutTop', [
        state('in', style({ transform: 'translateY(0%)' })),
        state('out', style({ transform: 'translateY(-100%)' })),
        transition('in <=> out', animate('.45s')),
    ]),
    trigger('flyOutBottom', [
        state('in', style({ transform: 'translateY(0vh)' })),
        state('out', style({ transform: 'translateY(33vh)' })),
        transition('in <=> out', animate('.45s')),
    ]),
    trigger('toHome', [
        state('false', style({ transform: 'translateX(0%)' })),
        state('true', style({ transform: 'translateY(100%)' })),
        transition('0 => 1', animate('.45s'))
    ]),
    trigger('toPost', [
        state('false', style({ transform: 'translateX(0%)' })),
        state('true', style({ transform: 'translateX(-100%)' })),
        transition('0 => 1', animate('.5s'))
    ])
];
//# sourceMappingURL=post.animations.js.map