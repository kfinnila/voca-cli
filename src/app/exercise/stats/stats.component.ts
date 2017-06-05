import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Exercise } from 'app/models/exercise';
import { Question } from 'app/models/question';
import { Stat } from 'app/models/stats';
import { ExerciseService } from 'app/shared/exercise.service';
import { StatService } from 'app/shared/stat.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  exercises: Exercise[];
  stats: Stat[] = [];
  user: string;

  constructor(private statService: StatService, private exerciseService: ExerciseService) { }

  getStats() {
    this.user = localStorage.username;
    this.exerciseService.getExercises().subscribe(
      e => {
        this.exercises = e;
        this.exercises.forEach(e => {
          let stat: Stat = this.statService.getStat(this.user, e.id);
          this.stats.push(stat);
        })   
    });
  }

  getDescription(id: number): string {
    return this.exercises.find(a => a.id === id).name;
  }

  ngOnInit() {
    this.getStats();
  }

}
