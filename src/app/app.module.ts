import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { MenuComponent } from './shared/menu/menu.component';
import { ExerciseComponent } from './exercise/exercise/exercise.component';

import { ExerciseService } from './shared/exercise.service';
import { QuestionComponent } from './exercise/question/question.component';
import { WordListComponent } from './exercise/exercise/study/word-list/word-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    MenuComponent,
    ExerciseComponent,
    QuestionComponent,
    WordListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ ExerciseService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
