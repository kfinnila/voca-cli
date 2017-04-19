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
  exerciseId: number;
  exercise: Exercise;
  questions: Question[];

  selectedQuestion: Question;

  constructor(
    private exerciseService: ExerciseService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe((p: Params) => this.exerciseId = +p['id']);
    console.log('param:' + this.exerciseId);
    this.getExercise();
    this.getQuestions();
  }

  getExercise() {
    this.route.params
      .switchMap((params: Params) => this.exerciseService.getExerciseById(+params['id']))
      .subscribe((e: Exercise) => this.exercise = e);
  }

  getQuestions() {
    if (this.exerciseId !== undefined) {
      console.log("getQuestions exerciseId:" + this.exerciseId);
      Promise.resolve(this.exerciseService.getQuestions(this.exerciseId))
        .then(q => this.start(q));
    }
  }

  start(questions: Question[]) {
    console.log('Starting');
    this.questions = questions;
    
    var qCount = this.questions.length;
    var i = Math.floor((Math.random() * qCount));
    this.selectedQuestion = this.questions[i];
    
  }

  answerClick() {
    console.log("Respondiendo...");
  }

}
