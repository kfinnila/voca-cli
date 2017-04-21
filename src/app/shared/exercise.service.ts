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
    { id: 1, exerciseId: 1, question: "comer", answer: "essen" },
    { id: 2, exerciseId: 1, question: "hablar", answer: "sprachen" },
    { id: 3, exerciseId: 1, question: "correr", answer: "laufen" },
    { id: 4, exerciseId: 1, question: "jugar", answer: "spielen" },
    { id: 5, exerciseId: 1, question: "saltar", answer: "springen" },
    { id: 11, exerciseId: 2, question: "perro", answer: "der Hund" },
    { id: 12, exerciseId: 2, question: "gato", answer: "die Katze" },
    { id: 13, exerciseId: 2, question: "mono", answer: "der Affe" },
    { id: 14, exerciseId: 2, question: "murciélago", answer: "die Fledermaus" },
    { id: 15, exerciseId: 2, question: "caballo", answer: "das Pferd" },
    { id: 21, exerciseId: 3, question: "uno", answer: "eins" },
    { id: 22, exerciseId: 3, question: "dos", answer: "zwei" },
    { id: 23, exerciseId: 3, question: "tres", answer: "drei" },
    { id: 24, exerciseId: 3, question: "cuatro", answer: "vier" },
    { id: 25, exerciseId: 3, question: "cinco", answer: "fünf" },    
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