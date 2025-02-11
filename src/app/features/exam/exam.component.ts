import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TimePipe } from '../../shared/pipes/time.pipe';
import { QuizStateService } from '../../shared/services/quiz-state.service';
import { QuizQuestionsService } from '../../shared/services/quiz-questions.service';

interface Question {
  question: string;
  options: string[];
  correct: string;
}

@Component({
  selector: 'app-exam',
  imports: [FormsModule, MatRadioModule, CommonModule, TimePipe],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.css',
})
export class ExamComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private quizStateService: QuizStateService,
    private quizQuestionsService: QuizQuestionsService
  ) {}

  totalQuestions: Question[] = [];

  currentQuestionIdx: number = 0;
  currentQuestion!: Question;
  selectedOption: string = '';
  score: number = 0;
  timeRemaining: number = 600; // 10 minutes in seconds
  private timerInterval: any;
  skippedQuestions: Question[] = [];
  isLastQuestion: boolean = false;
  correctlyAnsweredQuestions: Question[] = [];
  wronglyAnsweredQuestions: Question[] = [];

  ngOnInit() {
    this.startTimer();
    this.fetchQuestions();
  }

  ngOnDestroy() {
    clearInterval(this.timerInterval);
  }

  fetchQuestions(): void {
    this.quizQuestionsService.fetchQuestions().subscribe({
      next: (data: Question[]) => {
        this.totalQuestions = data;
      },
      error: (error) => {
        console.error('Error fetching questions:', error);
      },
      complete: () => {
        console.log('Questions fetched successfully');
        this.updateLastQuestionStatus();
        this.updateCurrentQuestion();
      },
    });
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      if (this.timeRemaining > 0) {
        this.timeRemaining--;
      } else {
        this.finishExam();
      }
    }, 1000);
  }

  previousQuestion() {
    if (this.currentQuestionIdx > 0) {
      this.currentQuestionIdx--;
      this.updateCurrentQuestion();
      this.updateLastQuestionStatus();
    }
  }

  nextQuestion() {
    if (this.currentQuestionIdx < this.totalQuestions.length - 1) {
      this.currentQuestionIdx++;
      this.updateCurrentQuestion();
      this.updateLastQuestionStatus();
    }
  }

  skipQuestion() {
    this.skippedQuestions.push();
    this.nextQuestion();
  }

  clearAnswer() {
    this.selectedOption = '';
  }

  updateCurrentQuestion() {
    this.currentQuestion = this.totalQuestions[this.currentQuestionIdx];
    this.selectedOption = '';
  }

  updateLastQuestionStatus() {
    this.isLastQuestion =
      this.currentQuestionIdx === this.totalQuestions.length - 1;
  }

  checkAnswer() {
    if (this.selectedOption === this.currentQuestion.correct) {
      this.score += 1;
      this.correctlyAnsweredQuestions.push(
        this.totalQuestions[this.currentQuestionIdx]
      );
    } else if (this.selectedOption === '') {
      this.skippedQuestions.push(this.totalQuestions[this.currentQuestionIdx]);
    } else {
      this.wronglyAnsweredQuestions.push(
        this.totalQuestions[this.currentQuestionIdx]
      );
    }
  }

  finishExam() {
    clearInterval(this.timerInterval);
    this.quizStateService.updateQuizState(
      this.correctlyAnsweredQuestions.length,
      this.wronglyAnsweredQuestions.length,
      this.totalQuestions.length,
      this.score
    );
    this.router.navigateByUrl('result');
  }

  onSubmit() {
    this.checkAnswer();

    if (this.isLastQuestion) {
      this.finishExam();
    } else {
      this.nextQuestion();
    }
  }
}
