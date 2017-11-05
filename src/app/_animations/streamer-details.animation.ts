import { trigger, animate, style, group, query as q, transition, sequence, state, animateChild } from '@angular/animations';
const query = (s, a, o = { optional: true }) => q(s, a, o);

// Root element animation
export const detailsParentAnim =
trigger('detailsParentAnim', [
  transition(':leave', [
    sequence([
      query('@detailsChildrenAnim', [ animateChild() ]),
      style({ backgroundColor: 'rgba(0, 0, 0, .5)' }),
      animate('.3s ease-in-out', style({ backgroundColor: 'rgba(0, 0, 0, 0)' })),
    ])
  ]),
  transition(':enter', [
    sequence([
      style({ backgroundColor: 'rgba(0, 0, 0, 0)' }),
      animate('.3s ease-in-out', style({ backgroundColor: 'rgba(0, 0, 0, .5)' })),
      query('@detailsChildrenAnim', [ animateChild() ])
    ])
  ])
]);
// Children elements animation
export const detailsChildrenAnim =
trigger('detailsChildrenAnim', [
  transition(':leave', [
    sequence([
      query('.streamer-watch', [
        style({ transform: 'translateY(0%)' }),
        animate('.2s ease-out', style({ transform: 'translateY(-100%)' })),
        style({ opacity: '0' })
      ]),
      query('.streamer-title, .streamer-numbers, .streamer-bio', [
        style({ opacity: '1' }),
        animate('.3s ease-in', style({ opacity: '0' }))
      ]),
      query('.streamer-logo', [
        style({ transform: 'translateX(0%)' }),
        animate('.3s ease-out', style({ transform: 'translateX(-100%)' }))
      ]),
      query('.streamer-details', [
        style({ transform: 'translateY(0%)' }),
        animate('.3s ease-in-out', style({ transform: 'translateY(-100%)' }))
      ]),
    ])
  ]),
  transition(':enter', [
    query('.streamer-logo', [ style({ transform: 'translateX(-100%)' }) ]),
    query('.streamer-watch', [ style({ transform: 'translateY(-100%)', opacity: '0' }) ]),
    query('.streamer-title, .streamer-numbers, .streamer-bio', [ style({ opacity: '0' }) ]),
    sequence([
      query('.streamer-details', [
        style({ transform: 'translateY(-100%)' }),
        animate('.3s ease-in-out', style({ transform: 'translateY(0%)' })),
      ]),
      query('.streamer-logo', [
        style({ transform: 'translateX(-100%)' }),
        animate('.3s ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      query('.streamer-title, .streamer-numbers, .streamer-bio', [
        style({ opacity: '0' }),
        animate('.3s ease-in', style({ opacity: '1' }))
      ]),
      query('.streamer-watch', [
        style({ transform: 'translateY(-100%)', opacity: '1' }),
        animate('0.2s 0.3s ease-in', style({ transform: 'translateY(0%)' }))
      ])
    ])
  ])
]);
