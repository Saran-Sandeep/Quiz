import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { ScoreService } from '../../shared/services/score.service';
import { CommonModule } from '@angular/common';
import { TimePipe } from '../../shared/pipes/time.pipe';

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
  constructor(private router: Router, private scoreService: ScoreService) {}

  totalQuestions: Question[] = [
    {
      question: "Which language is known as the 'mother of all languages'?",
      options: ['C', 'Assembly', 'Fortran', 'COBOL'],
      correct: 'Fortran',
    },
    {
      question: 'What does TypeScript add to JavaScript?',
      options: [
        'Static Typing',
        'Garbage Collection',
        'Asynchronous Execution',
        'Multithreading',
      ],
      correct: 'Static Typing',
    },
    {
      question: 'Which SQL command retrieves data from a database?',
      options: ['INSERT', 'SELECT', 'UPDATE', 'DELETE'],
      correct: 'SELECT',
    },
    {
      question: 'Which database is NoSQL?',
      options: ['MySQL', 'PostgreSQL', 'MongoDB', 'Oracle'],
      correct: 'MongoDB',
    },
    {
      question: 'Which HTML tag is used for hyperlinks?',
      options: ['<link>', '<href>', '<a>', '<url>'],
      correct: '<a>',
    },
    {
      question: 'What does AJAX stand for?',
      options: [
        'Asynchronous JavaScript and XML',
        'Automated Java and XML',
        'Advanced JavaScript and XHTML',
        'Asynchronous JSON and XML',
      ],
      correct: 'Asynchronous JavaScript and XML',
    },
  ];

  currentQuestionIdx: number = 0;

  currentQuestion: Question = this.totalQuestions[this.currentQuestionIdx];

  selectedOption: string = '';
  score: number = 0;

  timeRemaining: number = 600; // 10 minutes in seconds
  private timerInterval: any;
  alphabetLabels = ['A', 'B', 'C', 'D'];
  skippedQuestions: number[] = [];
  isLastQuestion: boolean = false;

  ngOnInit() {
    this.startTimer();
    this.updateLastQuestionStatus();
  }

  ngOnDestroy() {
    clearInterval(this.timerInterval);
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
    this.skippedQuestions.push(this.currentQuestionIdx);
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

  finishExam() {
    clearInterval(this.timerInterval);
    this.scoreService.setScore(this.score);
    this.router.navigateByUrl('result');
  }

  onSubmit() {
    if (this.selectedOption === this.currentQuestion.correct) {
      this.score++;
    }

    if (this.isLastQuestion) {
      this.finishExam();
    } else {
      this.nextQuestion();
    }
  }
}
