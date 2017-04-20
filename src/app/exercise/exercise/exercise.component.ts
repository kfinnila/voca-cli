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
  exercises: Exercise[];
  selectedExercise: Exercise;
  exerciseId: number;

  constructor(
    private exerciseService: ExerciseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getExercises();
  }

  getExercises(): void {
    this.exerciseService.getExcercises().then(e => this.exercises = e);
  }

  gotoQuestion(exercise: Exercise) {
    this.selectedExercise = exercise;
    this.router.navigate(['/question', this.selectedExercise.id]);
  }

  showWordList(exerciseId: number) {
    this.exerciseId = exerciseId;
    console.log("showWordList:" + exerciseId);
  }

}
