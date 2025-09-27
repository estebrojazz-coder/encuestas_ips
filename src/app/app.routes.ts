import { Routes } from '@angular/router';
import { SurveyComponent } from './survey/survey.component';
import { DatosComponent } from './datos/datos.component';

export const routes: Routes = [
  { path: '', redirectTo: 'encuesta', pathMatch: 'full' },
  { path: 'encuesta', component: SurveyComponent },
  { path: 'datos', component: DatosComponent},
];
