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

interface Answer extends Question {
  selectedOption: string;
}

@Component({
  selector: 'app-exam',
  imports: [FormsModule, MatRadioModule, CommonModule, TimePipe],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.css',
})
export class ExamComponent implements OnInit, OnDestroy {
  totalQuestions: Question[] = [];
  answerArray: Answer[] = [];
  skippedQuestions: Question[] = [];
  correctlyAnsweredQuestions: Question[] = [];
  wronglyAnsweredQuestions: Question[] = [];

  currentQuestionIdx: number = 0;
  currentQuestion!: Question;
  selectedOption!: string;
  score: number = 0;
  timeRemaining: number = 600; // 10 minutes in seconds
  private timerInterval: any;

  constructor(
    private router: Router,
    private quizStateService: QuizStateService,
    private quizQuestionsService: QuizQuestionsService
  ) {}

  // isLastQuestion: boolean = false;
  // reloadCount: number = 0;
  // __reloadLimit__: number = 3;

  ngOnInit() {
    this.startTimer();
    this.fetchQuestions();
    // this.updateSelectedOption();
    window.addEventListener('beforeunload', this.beforeUnloadListener);
  }

  ngOnDestroy() {
    clearInterval(this.timerInterval);
    window.removeEventListener('beforeunload', this.beforeUnloadListener);
  }

  beforeUnloadListener(event: BeforeUnloadEvent) {
    const confirmMsg =
      'Are you sure you want to leave? Your progress will be lost.';
    event.preventDefault();
    return confirmMsg;
  }

  fetchQuestions(): void {
    this.quizQuestionsService.fetchQuestions().subscribe({
      next: (data: Question[]) => {
        this.totalQuestions = data;
        if (this.totalQuestions.length > 0) {
          this.currentQuestionIdx = 0;
          this.updateCurrentQuestion();
        }
      },
      error: (error) => {
        console.error('Error fetching questions:', error);
      },
      // complete: () => {
      //   console.log('Questions fetched successfully');
      //   // this.updateLastQuestionStatus();
      //   // this.updateCurrentQuestion();
      // },
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

  updateCurrentQuestion() {
    this.currentQuestion = this.totalQuestions[this.currentQuestionIdx];
    this.selectedOption =
      this.answerArray[this.currentQuestionIdx]?.selectedOption || '';
  }

  previousQuestion() {
    if (this.currentQuestionIdx > 0) {
      this.currentQuestionIdx--;
      this.updateCurrentQuestion();
      // this.updateLastQuestionStatus();
      // this.updateSelectedOption();
    }
  }

  nextQuestion() {
    if (this.currentQuestionIdx < this.totalQuestions.length - 1) {
      this.currentQuestionIdx++;
      this.updateCurrentQuestion();
      // this.updateLastQuestionStatus();
      // this.updateSelectedOption();
    }
  }

  skipQuestion() {
    if (this.currentQuestion) {
      this.skippedQuestions.push(this.currentQuestion);
    }
    this.nextQuestion();
    // this.updateSelectedOption();
  }

  clearAnswer(): void {
    this.selectedOption = '';
    if (this.answerArray[this.currentQuestionIdx]) {
      this.answerArray[this.currentQuestionIdx].selectedOption = '';
    }
  }

  updateAnswer(): void {
    const existingAnswer = this.answerArray[this.currentQuestionIdx];
    if (existingAnswer) {
      this.answerArray[this.currentQuestionIdx].selectedOption =
        this.selectedOption;
    } else if (this.currentQuestion) {
      this.answerArray.push({
        ...this.currentQuestion,
        selectedOption: this.selectedOption,
      });
    }
  }

  calculateResult(): void {
    this.answerArray.forEach((question) => {
      if (question.selectedOption === question.correct) {
        this.score++;
        this.correctlyAnsweredQuestions.push(question);
      } else if (this.selectedOption === '') {
        this.skippedQuestions.push(question);
      } else {
        this.wronglyAnsweredQuestions.push(question);
      }
    });
  }

  finishExam(): void {
    clearInterval(this.timerInterval);
    this.calculateResult();
    this.quizStateService.updateQuizState(
      this.correctlyAnsweredQuestions.length,
      this.wronglyAnsweredQuestions.length,
      this.totalQuestions.length,
      this.score
    );
    this.router.navigateByUrl('result');
  }

  onSubmit() {
    this.updateAnswer();

    if (this.currentQuestionIdx === this.totalQuestions.length - 1) {
      this.finishExam();
    } else {
      this.nextQuestion();
    }
  }

  // updateSelectedOption(): void {
  //   if (this.answerArray.length > this.currentQuestionIdx) {
  //     this.selectedOption =
  //       this.answerArray[this.currentQuestionIdx].selectedOption;
  //   } else this.selectedOption = '';
  // }

  // updateLastQuestionStatus() {
  //   this.isLastQuestion =
  //     this.currentQuestionIdx === this.totalQuestions.length - 1;
  // }
}
