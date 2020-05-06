import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('modal', [
      transition(':enter', [style({ transform: 'scale(0)' }), animate(200, style({ transform: 'scale(1)' }))]),
    ]),
  ],
})
export class ModalComponent {
  @Input() score: number;
  @Input() answer: string;
  @Output() startNewGame = new EventEmitter();
  @Output() goToHomePage = new EventEmitter();
}
