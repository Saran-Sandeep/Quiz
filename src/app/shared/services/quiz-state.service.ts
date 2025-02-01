import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface QuizState {
  correctAnswers: number;
  wrongAnswers: number;
  totalQuestions: number;
  score: number;
}

@Injectable({
  providedIn: 'root',
})
export class QuizStateService {
  private initialState: QuizState = {
    correctAnswers: 0,
    wrongAnswers: 0,
    totalQuestions: 0,
    score: 0,
  };

  private state = new BehaviorSubject<QuizState>(this.initialState);

  // Expose observables
  state$ = this.state.asObservable();

  // Convenience getters for current values
  get currentState(): QuizState {
    return this.state.getValue();
  }

  updateQuizState(
    correct: number,
    wrong: number,
    total: number,
    score: number
  ) {
    this.state.next({
      correctAnswers: correct,
      wrongAnswers: wrong,
      totalQuestions: total,
      score: score,
    });
  }

  resetState() {
    this.state.next(this.initialState);
  }
}
