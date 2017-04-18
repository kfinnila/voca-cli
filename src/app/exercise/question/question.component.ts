import { Component, OnInit } from '@angular/core';

import { Exercise } from '../../models/exercise';
import { ExerciseService } from '../../shared/exercise.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  exercise: Exercise;

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit(): void {
    this.exercise = getExercise();
  }

  getExercise(): Promise<Exercise> {
    return this.exerciseService.getExerciseById(id);
  }

}
