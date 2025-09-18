import { Routes } from '@angular/router';
import { SurveyComponent } from './survey/survey.component';

export const routes: Routes = [
  { path: '', redirectTo: 'encuesta', pathMatch: 'full' },
  { path: 'encuesta', component: SurveyComponent }
];
