import { trigger, animate, style, group, query as q, transition, sequence, animateChild } from '@angular/animations';
const query = (s, a, o = { optional: true }) => q(s, a, o);

export const routeAnim = trigger('routeAnim', [
  transition('* => *', [
    query(':enter, :leave', [
      style({ position: 'fixed', top: 0, left: 0, right: 0 })
    ]),
    query(':enter', style({ transform: 'translateY(-100%)' })),
    sequence([
      query(':leave', animateChild()),
      group([
        query(':leave', [
          style({ transform: 'translateY(0%)' }),
          animate('.3s cubic-bezier(.12,.28,.79,.47)',
            style({ transform: 'translateY(-100%)' }))
        ]),
        query(':enter', [
          style({ transform: 'translateY(100%)' }),
          animate('.3s cubic-bezier(.12,.28,.79,.47)',
            style({ transform: 'translateY(0%)' })),
        ]),
      ]),
      query(':enter', animateChild())
    ])
  ]),
]);
