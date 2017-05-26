import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Exercise } from 'app/models/exercise';
import { ExerciseService } from 'app/shared/exercise.service';
import { WordListComponent } from './study/word-list/word-list.component';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  errorMessage: string;
  exercises: Exercise[];
  selectedExercise: Exercise;
  exerciseId: number = 0;
  exercise: Exercise;

  constructor(
    private exerciseService: ExerciseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getExercises();
  }

  getExercises(): void {
    //this.exerciseService.getExcercises().then(e => this.exercises = e);
    this.exerciseService.getExercises().subscribe(exercises => this.exercises = exercises, error => this.errorMessage = <any>error );
  }

  //gotoQuestion(exercise: Exercise) {
  gotoQuestion(exerciseId: number) {
    console.log("exerciseId: " + exerciseId);
    //this.selectedExercise = exercise;
    //this.router.navigate(['/question', this.selectedExercise.id]);
    this.router.navigate(['/question', exerciseId]);
  }

  showWordList(exerciseId: number) {
    this.exerciseId = null;
    this.exerciseId = exerciseId;
    console.log("showWordList:" + exerciseId);
  }

}
