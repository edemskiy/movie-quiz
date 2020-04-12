import {
  trigger,
  transition,
  style,
  group,
  query,
  animate,
} from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [
  transition('HomePage => GamePage', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
      }),
    ]),
    query(':enter', [style({ right: '-100%' })]),
    query(':leave', [style({ left: 0 })]),
    group([
      query(':enter', [animate(300, style({ right: 0 }))]),
      query(':leave', [animate(300, style({ left: '-100%' }))]),
    ]),
  ]),
  transition('GamePage => HomePage', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
      }),
    ]),
    query(':enter', [style({ left: '-100%' })]),
    query(':leave', [style({ right: 0 })]),
    group([
      query(':enter', [animate(300, style({ left: 0 }))]),
      query(':leave', [animate(300, style({ right: '-100%' }))]),
    ]),
  ]),
]);
