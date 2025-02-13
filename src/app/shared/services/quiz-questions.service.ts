import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

interface Question {
  question: string;
  options: string[];
  correct: string;
}

interface TopicData {
  [category: string]: Question[];
}

@Injectable({
  providedIn: 'root',
})
export class QuizQuestionsService {
  constructor(private httpclient: HttpClient) {}

  private selectedTopics: string[] = [];

  setSelectedTopic(selectedTopics: string[]): void {
    this.selectedTopics = selectedTopics;
  }

  fetchQuestions(): Observable<Question[]> {
    return new Observable((observer) => {
      this.httpclient.get<TopicData>('/quizData.json').subscribe(
        (data: TopicData) => {
          if (this.selectedTopics) {
            const filteredQuestions: Question[] = [];

            this.selectedTopics.forEach((selectedTopic: string) => {
              if (data[selectedTopic]) {
                filteredQuestions.push(...data[selectedTopic]);
              }
            });
            observer.next(filteredQuestions);
          } else observer.next([]);
          observer.complete();
        },
        (error) => {
          console.log(error);
          observer.error(error);
        }
      );
    });
  }

  // fetchQuestions(): Observable<Question[]> {
  //   return this.httpclient.get<TopicData>('/quizData.json').pipe(
  //     map((data: TopicData) => {
  //       if (!this.selectedTopics.length) return []; // No topics selected

  //       const temp = this.selectedTopics.flatMap((topic) => data[topic] || []);
  //       console.log('ques : ', temp);
  //       return temp;
  //     })
  //   );
  // }
}
