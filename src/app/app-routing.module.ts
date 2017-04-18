import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { ExerciseComponent } from './exercise/exercise/exercise.component';
import { QuestionComponent } from './exercise/question/question.component';

const routes: Routes = [
  {
    path: '',
    children: []
  },
  { path: 'exercise', component: ExerciseComponent },
  { path: 'question/:id', component: QuestionComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
