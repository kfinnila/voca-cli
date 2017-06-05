import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Exercise } from 'app/models/exercise';
import { Question } from 'app/models/question';
import { Stat } from 'app/models/stats';
import { ExerciseService } from 'app/shared/exercise.service';
import { StatService } from 'app/shared/stat.service';

//import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
//import 'rxjs/add/operator/concatMap';
//import 'rxjs/add/operator/mergeMap';

class RemaininQuestion {
  constructor(i: number) {
    this.id = i;
    this.correct = 0;
    this.wrong = 0;
  }
  id: number; correct: number; wrong: number }

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

  userStat: Stat;

  selectedQuestion: Question;
  answerWord: string;
  answerMessage: string;

  correctAnswers: number = 0;
  incorrectAnswers: number = 0;
  maxQuestionAnswers: number;
  correctQuestionAnswers: number;
  
  remainingQuestions: RemaininQuestion[] = [];

  //simple: boolean = true;
  multipleChoice: boolean = false;
  choices: string[] = [];

  tryAnswer: boolean[] = [false, false, false];
  correctAnswer: boolean = false;

  constructor(
    private exerciseService: ExerciseService,
    private statService: StatService,
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
    this.setRemainingQuestions();
    this.selectNewQuestion();
  }

  setRemainingQuestions() {
    this.remainingQuestions = [];
    this.questions.forEach((q) => {
      let rq = new RemaininQuestion(q.id);
      this.remainingQuestions.push(rq);
    });
    this.maxQuestionAnswers = this.questions.length * 3;
    this.correctQuestionAnswers = 0;
  }

  selectNewQuestion() {   
    //let i = Math.floor((Math.random() * this.questions.length));
    let i = Math.floor((Math.random() * this.remainingQuestions.length));

    this.selectedQuestion = this.questions.find(a => a.id === this.remainingQuestions[i].id);;
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
    choice = choice.replace('ss', 'ß');
    this.answerWord = choice;
    if (this.selectedQuestion.answer === this.answerWord) {
      // correct answer
      this.correctAnswers++;
      this.showMessage("¡Correcto!", 2000);
      this.evaluateAnswer(this.selectedQuestion.id, true);
      this.selectNewQuestion();
    } else if (this.selectedQuestion.answer.toUpperCase() === this.answerWord.toUpperCase()) {
      // correct answer but wrong casing
      this.correctAnswers++;
      this.showMessage("Correcto pero recuerde las letras mayúsculas y minúsculas", 2000);
      this.evaluateAnswer(this.selectedQuestion.id, true);
      this.selectNewQuestion();
    } else {
      // wrong answer
      this.answerMessage = "No es correcto";
      this.incorrectAnswers++;
      this.evaluateAnswer(this.selectedQuestion.id, false);
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

  showMessage(message: string, time: number) {
      this.answerMessage = message;
      this.correctAnswer = true;
      setTimeout(() => { 
        this.correctAnswer = false;
        this.answerMessage = " "; }, time)
  }

  evaluateAnswer(id:number, correct: boolean): boolean {
    let q = this.remainingQuestions.find(a => a.id === id);
    let userStat: Stat = this.statService.getStat(localStorage.username, this.exerciseId);
    console.log("Stat:", JSON.stringify(userStat));
    if (correct) {
      q.correct++;
      this.multipleChoice ? userStat.correctMulti++ : userStat.correctSimple++;
      this.correctQuestionAnswers++;
      console.log("Antes:", this.remainingQuestions.length);
      console.log("Correct:", q.correct);
      if (q.correct >= 3) {
        this.remainingQuestions = this.remainingQuestions.filter(a => a.id !== id);
      }
      if (this.remainingQuestions.length === 0) {
        alert("Respondiste correctamente todas las preguntas. Vamos a empezar de nuevo.");
        this.setRemainingQuestions();
      }
      console.log("Despues:", this.remainingQuestions.length);
    } else {
      this.correctQuestionAnswers -= q.correct;
      this.multipleChoice ? userStat.wrongMulti++ : userStat.wrongSimple++;
      q.correct = 0;
      q.wrong++;
    }
    this.statService.setStat(userStat);
    return (this.questions.length === 0);
  }
}
