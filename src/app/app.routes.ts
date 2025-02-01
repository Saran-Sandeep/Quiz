import { Routes } from '@angular/router';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { LoginSignupComponent } from './features/login-signup/login-signup.component';
import { ExamComponent } from './features/exam/exam.component';
import { ResultComponent } from './features/result/result.component';
import { LayoutComponent } from './features/layout/layout.component';
import { TopicSelectionComponent } from './features/topic-selection/topic-selection.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginSignupComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'landing-page',
        component: LandingPageComponent,
      },
      {
        path: 'topic-selection',
        component: TopicSelectionComponent,
      },
      {
        path: 'exam',
        component: ExamComponent,
      },
      {
        path: 'result',
        component: ResultComponent,
      },
    ],
  },
];
