import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { QuizQuestionsService } from '../../shared/services/quiz-questions.service';

@Component({
  selector: 'app-topic-selection',
  imports: [MatChipsModule, CommonModule],
  templateUrl: './topic-selection.component.html',
  styleUrl: './topic-selection.component.css',
})
export class TopicSelectionComponent {
  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private quizQuestionService: QuizQuestionsService
  ) {}

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  selectedTopicsLimit: number = 1;
  topics: string[] = [
    'Programming Languages',
    'Data Structures',
    'Databases',
    'Operating Systems',
    'Web Development',
    'Cloud Computing',
    'Cybersecurity',
    'AI & Machine Learning',
    'DevOps',
    'Software Engineering',
  ];
  selectedTopics: Set<string> = new Set();

  toggleTopic(topic: string): void {
    if (this.selectedTopics.has(topic)) {
      this.selectedTopics.delete(topic);
    } else if (this.selectedTopics.size < this.selectedTopicsLimit) {
      this.selectedTopics.add(topic);
    } else {
      this.openSnackBar();
    }
  }

  isTopicSelected(topic: string): boolean {
    return this.selectedTopics.has(topic);
  }

  openSnackBar(): void {
    this._snackBar.open(
      `Only ${this.selectedTopicsLimit} topics can be selected.`,
      'close',
      {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 1000,
      }
    );
  }

  onStartQuiz(): void {
    this.quizQuestionService.setSelectedTopic([...this.selectedTopics]);
    this.router.navigateByUrl('exam');
  }
}
