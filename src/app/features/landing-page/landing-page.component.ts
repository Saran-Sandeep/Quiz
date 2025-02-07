import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  constructor(private router: Router) {}

  isModalOpen = false;

  onStartSolving(): void {
    this.router.navigateByUrl('topic-selection');
  }

  onHowItWorks(): void {
    // openModal
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.isModalOpen = false;
    document.body.style.overflow = 'auto';
  }

  startQuiz() {
    this.closeModal();
    this.router.navigateByUrl('topic-selection');
  }
}
