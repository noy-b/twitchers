import { trigger, animate, style, group, query as q, transition, sequence, state, animateChild } from '@angular/animations';
const query = (s, a, o = { optional: true }) => q(s, a, o);

// Root element animation
export const routeFadeIn =
trigger('routeFadeIn', [
  transition(':leave', [
    sequence([
      query('@routeSequenceAnim', [ animateChild() ]),
      style({ backgroundColor: 'rgba(0, 0, 0, .5)' }),
      animate('.5s ease-in-out', style({ backgroundColor: 'rgba(0, 0, 0, 0)' })),
    ])
  ]),
  transition(':enter', [
      sequence([
        style({ backgroundColor: 'rgba(0, 0, 0, 0)' }),
        animate('.5s ease-in-out', style({ backgroundColor: 'rgba(0, 0, 0, .5)' })),
        query('@routeSequenceAnim', [ animateChild() ])
      ])
    ])
]);
// Children elements animation
export const routeSequenceAnim =
trigger('routeSequenceAnim', [
  transition(':leave', [
    sequence([
      query('.streamer-body', [
        style({ transform: 'translateY(0%)' }),
        animate('.5s ease-out', style({ transform: 'translateY(100%)' }))
      ]),
      query('.streamer-header', [
        style({ transform: 'translateY(0%)' }),
        animate('.3s ease-out', style({ transform: 'translateY(-100%)' }))
      ]),
    ])
  ]),
  transition(':enter', [
    query('.streamer-header', [ style({ transform: 'translateY(-100%)' }) ]),
    query('.streamer-body', [ style({ transform: 'translateY(100%)' }) ]),
    sequence([
      query('.streamer-body', [
        style({ transform: 'translateY(100%)' }),
        animate('.5s .5s ease-in', style({ transform: 'translateY(0%)' }))
      ]),
      query('.streamer-header', [
        style({ transform: 'translateY(-100%)' }),
        animate('.3s ease-in', style({ transform: 'translateY(0%)' }))
      ]),
    ])
  ])
]);
