import { trigger, animate, style, query as q, transition, stagger, state, sequence } from '@angular/animations';
const query = (s, a, o = { optional: true }) => q(s, a, o);

export const staggerFade = trigger('staggerFade', [
    transition(':enter', [
      sequence([
        query('.nav', [
          style({ transform: 'translateX(-100%)' }),
          animate('.2s ease-in', style({ transform: 'translateX(0%)' })),
        ]),
        query('.stream', stagger(50, [
          style({ opacity: 0 }),
          animate('.2s ease-in', style({ opacity: 1 })),
        ]))
      ])
    ]),
    transition(':leave', [
      sequence([
        query('.nav', [
          style({ transform: 'translateX(0%)' }),
          animate('.2s ease-in', style({ transform: 'translateX(-100%)' })),
        ]),
        query('.stream', stagger(50, [
          style({ opacity: 1 }),
          animate('.2s ease-in', style({ opacity: 0 })),
        ]))
      ])
    ])
  ]);
