import { Component } from '@angular/core';
import { ScoreService } from '../../shared/services/score.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-result',
  imports: [],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css',
})
export class ResultComponent {
  score: number = 0;
  private scoreSubscription!: Subscription;

  constructor(private scoreService: ScoreService) {}

  ngOnInit(): void {
    this.scoreSubscription = this.scoreService.score$.subscribe((score) => {
      this.score = score;
    });
  }

  ngOnDestroy(): void {
    this.scoreSubscription.unsubscribe();
  }
}
