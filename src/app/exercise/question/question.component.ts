import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Exercise } from '../../models/exercise';
import { Question } from '../../models/question';
import { ExerciseService } from '../../shared/exercise.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  exercise: Exercise;
  questions: Question[];

  constructor(
    private exerciseService: ExerciseService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getExercise();
    this.getQuestions();
  }

  getExercise() {
    this.route.params
      .switchMap((params: Params) => this.exerciseService.getExerciseById(+params['id']))
      .subscribe((e: Exercise) => this.exercise = e);
  }

  getQuestions() {
    if (this.exercise !== undefined) {
      console.log("getQuestions");
      console.log("getQuestions exerciseId:" + this.exercise.id);
      Promise.resolve(this.exerciseService.getQuestions(this.exercise.id))
        .then(q => this.questions = q);
    }
  }

}
