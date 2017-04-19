import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Exercise } from '../../models/exercise';
import { ExerciseService } from '../../shared/exercise.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  exercises: Exercise[];
  selectedExercise: Exercise;

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

}
