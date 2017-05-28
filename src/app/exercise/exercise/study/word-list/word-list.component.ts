import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { ExerciseService } from 'app/shared/exercise.service';
import { Exercise } from 'app/models/exercise';
import { Question } from 'app/models/question';

@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.css']
})
export class WordListComponent implements OnInit, OnChanges {
  words: Question[];

  @Input()
  exerciseId: number;

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.getQuestions();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['exerciseId']) {
      this.getQuestions();
    }
  }

  getQuestions() {
    Promise.resolve(this.exerciseService.getQuestions(this.exerciseId).subscribe(q => this.words = q));
      //.then(q => this.words = q);
  }
}

