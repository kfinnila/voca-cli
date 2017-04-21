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
  exercises: Exercise[];
  questions: Question[];

  selectedQuestion: Question;
  answerWord: string;
  answerMessage: string;

  //simple: boolean = true;
  multipleChoice: boolean = false;
  choices: string[] = [];

  constructor(
    private exerciseService: ExerciseService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe((p: Params) => this.exerciseId = +p['id']);
    console.log('param:' + this.exerciseId);
    this.getExercises();
    if (this.exerciseId) {
      this.getExercise();
      this.getQuestions();
    }
  }

  getExercises(): void {
    this.exerciseService.getExcercises().then(e => this.exercises = e);
  }

  getExercise() {
    Promise.resolve(this.exerciseService.getExerciseById(this.exerciseId))
      .then(e => this.exercise =e);
    this.getQuestions();
    /*
    this.route.params
      .switchMap((params: Params) => this.exerciseService.getExerciseById(+params['id']))
      .subscribe((e: Exercise) => this.exercise = e);*/
  }

  getQuestions() {
    if (this.exerciseId !== undefined) {
      console.log("getQuestions exerciseId:" + this.exerciseId);
      Promise.resolve(this.exerciseService.getQuestions(this.exerciseId))
        .then(q => this.start(q));
    }
  }

  start(questions: Question[]) {
    this.questions = questions; 
    this.selectNewQuestion();
  }

  selectNewQuestion() {   
    let i = Math.floor((Math.random() * this.questions.length));
    this.selectedQuestion = this.questions[i];
    this.answerWord = "";
    this.choices = [];
    if (this.questions.length < 5) { return; };
    if (!this.multipleChoice) { return; };
    for (var counter = 0; counter < 3;) {
      let qi = Math.floor((Math.random() * this.questions.length));
      if (qi !== i) {
        let ind = this.choices.indexOf(this.questions[qi].answer);
        if (ind < 0) {
          this.choices.push(this.questions[qi].answer);
          counter++;
        }
      }
    }
    let correctIndex = Math.floor((Math.random() * 3));
    this.choices[correctIndex] = this.selectedQuestion.answer;
  }

  answerClick(choice: string = this.answerWord) {
    this.answerWord = choice;
    if (this.selectedQuestion.answer === this.answerWord) {
      this.answerMessage = "¡Correcto!";
      this.selectNewQuestion();
    } else if (this.selectedQuestion.answer.toUpperCase() === this.answerWord.toUpperCase()) {
      this.answerMessage = "Correcto pero recuerde las letras mayúsculas y minúsculas";
      this.selectNewQuestion();
    } else {
      this.answerMessage = "No es correcto";
    }
  }

  help() {
    alert('La respuesta es "' + this.selectedQuestion.answer + '"' );
  }

  setMultipleChoice(selection: boolean) {
    this.multipleChoice = selection;
    this.selectNewQuestion();
  }

}
