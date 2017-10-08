import { trigger, state, animate, transition, style, query, stagger } from '@angular/animations';

export const slideIn =
    trigger('slideIn', [
        state('void', style({opacity: '0', zIndex: '0'}) ),
        state('*', style({opacity: '1', zIndex: '1'}) ),
        transition('void => *', [
          style({opacity: '0'}),
          animate('.2s ease-in-out', style({opacity: '1'}))
        ])
    ]);
