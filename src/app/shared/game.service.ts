import { Injectable } from '@angular/core';
import { Question } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  question: Question = null;
  score = 0;
  timeToAnswer = 150;
  tips = { fiftyFifty: false, skip: false };
  constructor() {}
}
