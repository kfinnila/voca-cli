import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Exercise } from '../models/exercise';

@Injectable()
export class ExerciseService {
  private exerciseUrl = 'api/exercises';

  constructor(private http: Http) {}

  private EXER: Exercise[] = [
      { id: 1, name: 'Verbos 1', description: "Verbos" },
      { id: 2, name: 'Sustantivos 1', description: "Sustantivos" },
      { id: 3, name: 'Números 1', description: ''}
  ];
  private first: Exercise;
  getExcercises(): Promise<Exercise[]> {
    return Promise.resolve(this.EXER);
  }

  getExerciseById(id: number): Promise<Exercise> {
    return Promise.resolve(this.EXER.find(e => e.id === id));
  }
}