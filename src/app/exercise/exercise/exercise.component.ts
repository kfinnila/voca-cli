import { Component, OnInit } from '@angular/core';

import { Exercise } from '../../models/exercise';
import { ExerciseService } from '../../shared/exercise.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  exercises: Exercise[];

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit(): void {
    this.getExercises();
  }

  getExercises(): void {
    this.exerciseService.getExcercises().then(e => this.exercises = e);
  }

}
