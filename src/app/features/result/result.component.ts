import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuizStateService } from '../../shared/services/quiz-state.service';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-result',
  imports: [CommonModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css',
})
export class ResultComponent {
  constructor(
    private quizStateService: QuizStateService,
    private router: Router
  ) {}

  private scoreSubscription!: Subscription;
  score: number = 0;
  correctAnswers: number = 0;
  wrongAnswers: number = 0;
  totalQuestions: number = 0;

  radius = 45;
  circumference = 2 * Math.PI * this.radius;

  ngOnInit(): void {
    this.scoreSubscription = this.quizStateService.state$.subscribe((state) => {
      this.correctAnswers = state.correctAnswers;
      this.wrongAnswers = state.wrongAnswers;
      this.totalQuestions = state.totalQuestions;
      this.score = state.score;
    });
  }

  get dashOffset(): number {
    return (
      this.circumference -
      (this.score / this.totalQuestions) * this.circumference
    );
  }

  ngOnDestroy(): void {
    this.scoreSubscription.unsubscribe();
  }

  onRetry(): void {
    this.router.navigateByUrl('topic-selection');
  }

  onHome(): void {
    this.router.navigateByUrl('landing-page');
  }
}
