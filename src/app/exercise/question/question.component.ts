import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Exercise } from 'app/models/exercise';
import { Question } from 'app/models/question';
import { ExerciseService } from 'app/shared/exercise.service';

//import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
//import 'rxjs/add/operator/concatMap';
//import 'rxjs/add/operator/mergeMap';

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

  tryAnswer: boolean[] = [false, false, false];
  correctAnswer: boolean = false;

  constructor(
    private exerciseService: ExerciseService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe((p: Params) => this.exerciseId = +p['id']);
    if (isNaN(this.exerciseId)) {
      this.exerciseId = 0;
    }
    this.getExercises();
    if (this.exerciseId) {
      this.getExercise();
      //this.getQuestions();
    }
  }

  getExercises(): void {
    this.exerciseService.getExercises().subscribe(e => this.exercises = e);
  }

  getExercise() {
    let ex = this.exerciseService.getExerciseById(this.exerciseId);

    this.exerciseService.getExerciseById(this.exerciseId).subscribe(e => { this.exercise = e; this.getQuestions(); } );
    //this.exerciseService.getExerciseById(this.exerciseId).switchMap((e: Exercise) => {this.exercise = e; this.getQuestions();});
    /*
    this.route.params
      .switchMap((params: Params) => this.exerciseService.getExerciseById(+params['id']))
      .subscribe((e: Exercise) => this.exercise = e);*/
  }

  getQuestions() {
    if (this.exerciseId !== undefined) {
      this.exerciseService.getQuestions(this.exerciseId).subscribe(q => this.start(q));
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
    this.tryAnswer = [false, false, false];
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
      this.correctAnswer = true;
      setTimeout(() => { 
        this.correctAnswer = false;
        this.answerMessage = " "; }, 2000)
      this.selectNewQuestion();
    } else if (this.selectedQuestion.answer.toUpperCase() === this.answerWord.toUpperCase()) {
      this.answerMessage = "Correcto pero recuerde las letras mayúsculas y minúsculas";
      this.correctAnswer = true;
      setTimeout(() => { 
        this.correctAnswer = false;
        this.answerMessage = " "; }, 2000)
      this.selectNewQuestion();
    } else {
      this.answerMessage = "No es correcto";
      for (let i = 0; i < this.choices.length; i++){
        if (this.choices[i] === choice) {
          this.tryAnswer[i] = true;
        }
      }
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
