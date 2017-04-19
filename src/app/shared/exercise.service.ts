import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Exercise } from '../models/exercise';
import { Question } from '../models/question';

@Injectable()
export class ExerciseService {
  private exerciseUrl = 'api/exercises';

  constructor(private http: Http) {}

  private EXER: Exercise[] = [
      { id: 1, name: 'Verbos 1', description: "Verbos" },
      { id: 2, name: 'Sustantivos 1', description: "Sustantivos" },
      { id: 3, name: 'Números 1', description: ''}
  ];

  private QUESTION: Question[] = [
    { id: 1, exerciseId: 2, question: "perro", answer: "der Hund" },
    { id: 2, exerciseId: 2, question: "gato", answer: "die Katze" },
    { id: 3, exerciseId: 2, question: "mono", answer: "der Affe" },
    { id: 4, exerciseId: 2, question: "murciélago", answer: "die Fledermause" },
    { id: 5, exerciseId: 2, question: "caballo", answer: "das Pferd" },
  ];

  getExcercises(): Promise<Exercise[]> {
    return Promise.resolve(this.EXER);
  }

  getExerciseById(id: number): Promise<Exercise> {
    return Promise.resolve(this.EXER.find(e => e.id === id));
  }

  getQuestions(id: number): Promise<Question[]> {
    return Promise.resolve(this.QUESTION.filter(a => a.exerciseId === id));
  }
}