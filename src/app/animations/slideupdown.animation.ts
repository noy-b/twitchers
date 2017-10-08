import { trigger, state, animate, transition, style, query } from '@angular/animations';

export const slideUpDown =
  trigger('slideUpDown', [
    transition('* => *', [
      query(':leave nav', [
        style({ transform: 'translateY(0%)' }),
        animate('.3s 400ms ease-in',
          style({ transform: 'translateY(100%)' })),
      ], { optional: true }),
      query(':enter nav', [
        style({ transform: 'translateY(100%)' }),
        animate('.3s 400ms ease-out',
          style({ transform: 'translateY(0%)' })),
      ], { optional: true }),
    ]),
  ]);
