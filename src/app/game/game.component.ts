import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { trigger, transition, animate, style } from '@angular/animations';
import { Router } from '@angular/router';
import { Question } from '../shared/interfaces';

const questionURL = 'https://guess-the-movie-server.herokuapp.com/question';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  animations: [
    trigger('question', [transition(':leave', [style({ opacity: 1 }), animate(200, style({ opacity: 0 }))])]),
  ],
})
export class GameComponent implements OnInit, OnDestroy {
  question: Question;
  score: number;
  timeToAnswer: number;
  givenAnswer: string;
  tips = { fiftyFifty: { isUsed: false }, skip: { isUsed: false } };
  previousAnswers: string[];

  questionLoading = true;
  imageLoading = true;
  animating = false;
  gameOver = false;

  answerTimerId;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.startGame();
  }

  ngOnDestroy() {
    clearInterval(this.answerTimerId);
  }

  startGame() {
    this.score = 0;
    this.previousAnswers = [];
    this.tips.fiftyFifty.isUsed = false;
    this.tips.skip.isUsed = false;
    this.gameOver = false;
    this.loadNewQuestion();
  }

  loadNewQuestion() {
    this.questionLoading = this.imageLoading = true;
    this.givenAnswer = '';
    clearInterval(this.answerTimerId);

    this.http.get<Question>(questionURL).subscribe((question) => {
      if (this.question && this.previousAnswers.includes(question.answer)) {
        return this.loadNewQuestion();
      }
      this.timeToAnswer = 15;
      this.question = question;
      this.previousAnswers.push(question.answer);
      this.questionLoading = false;
      this.answerTimerId = setInterval(() => {
        if (this.timeToAnswer > 0) {
          this.timeToAnswer -= 0.015;
        } else {
          this.finishGame();
        }
      }, 15);
    });
  }

  onImageLoad() {
    this.imageLoading = false;
  }

  animationStart() {
    this.animating = true;
  }

  animationEnd() {
    this.animating = false;
  }

  applyFiftyFiftyTip() {
    if (this.tips.fiftyFifty) {
      return;
    }
    this.tips.fiftyFifty.isUsed = true;

    let firstChoiseId: number = Math.floor(Math.random() * 4);
    while (this.question.choises[firstChoiseId] === this.question.answer) {
      firstChoiseId = Math.floor(Math.random() * 4);
    }

    let secondChoiceID: number = Math.floor(Math.random() * 4);
    while (firstChoiseId === secondChoiceID || this.question.choises[secondChoiceID] === this.question.answer) {
      secondChoiceID = Math.floor(Math.random() * 4);
    }

    this.question.choises = this.question.choises.map((choise, index) =>
      index === firstChoiseId || index === secondChoiceID ? '' : choise
    );
  }

  applySkipTip() {
    if (this.tips.skip) return;
    this.tips.skip.isUsed = true;
    this.loadNewQuestion();
  }

  checkAnswer(answer: string) {
    this.givenAnswer = answer;
    if (this.givenAnswer === this.question.answer) {
      this.score++;
      setTimeout(this.loadNewQuestion.bind(this), 1000);
    } else {
      this.finishGame();
    }
  }

  finishGame() {
    clearInterval(this.answerTimerId);
    this.gameOver = true;
  }

  goHomePage() {
    this.gameOver = false;
    setTimeout(() => this.router.navigate(['/']), 0);
  }
}
