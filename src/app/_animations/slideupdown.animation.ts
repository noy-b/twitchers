import { trigger, state, animate, transition, style, query as q } from '@angular/animations';
const query = (s, a, o = { optional: true }) => q(s, a, o);

export const slideUpDown =
  trigger('slideUpDown', [
    transition('* => *', [
      query(':leave nav', [
        style({ transform: 'translateX(0%)' }),
        animate('.3s 400ms ease-in',
          style({ transform: 'translateX(-100%)' })),
      ]),
      query(':enter nav', [
        style({ transform: 'translateX(-100%)' }),
        animate('.3s 400ms ease-out',
          style({ transform: 'translateX(0%)' })),
      ]),
    ]),
  ]);
