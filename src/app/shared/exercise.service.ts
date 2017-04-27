import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Exercise } from '../models/exercise';
import { Question } from '../models/question';

@Injectable()
export class ExerciseService {
  //private exerciseUrl = 'api/exercises';

  constructor(private http: Http) {}

  private EXER: Exercise[] = [
      { id: 1, name: 'Verbos 1', description: "Verbos" },
      { id: 2, name: 'Sustantivos 1', description: "Sustantivos" },
      { id: 3, name: 'Números 1', description: ''},
      { id: 4, name: 'Mate - Números', description: "Tipos de números" },
      { id: 5, name: 'Mate - Trigonometría', description: "Trigonometría" },
      { id: 6, name: 'Mate - Cálculo diferencial', description: "Cálculo difrencial" },
      { id: 7, name: 'Mate - General', description: "" }
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
    {id:26, exerciseId: 4, question: 'la raíz cuadrada', answer:'die Quadratwurzel'},
    {id:27, exerciseId: 4, question: 'el número par', answer:'die gerade Zahl'},
    {id:28, exerciseId: 4, question: 'el número impar', answer:'die ungerade Zahl'},
    {id:29, exerciseId: 4, question: 'el número primo', answer:'die Primzahl'},
    {id:30, exerciseId: 4, question: 'el número natural', answer:'die natürliche Zahl'},
    {id:31, exerciseId: 4, question: 'el número entero', answer:'die ganze Zahl'},
    {id:32, exerciseId: 4, question: 'el número racional', answer:'die rationale Zahl'},
    {id:33, exerciseId: 4, question: 'el número real', answer:'die reelle Zahl'},
    {id:34, exerciseId: 4, question: 'el número complejo', answer:'die komplexe Zahl'},   

    {id:41, exerciseId: 5, question: 'la cateto', answer:'die Kathete'},
    {id:42, exerciseId: 5, question: 'la hipotenusa', answer:'die Hypotenuse'},
    {id:43, exerciseId: 5, question: 'el cateto adyacente', answer:'die Ankathete'},
    {id:44, exerciseId: 5, question: 'el cateto opuesto', answer:'die Gegenkathete'},
    {id:45, exerciseId: 5, question: 'el ángulo', answer:'der Winkel'},
    {id:46, exerciseId: 5, question: 'el ángulo recto', answer:'der rechte Winkel'},
    {id:47, exerciseId: 5, question: 'el teorema de Pitágoras', answer:'der Satz des Pythagoras'},
    {id:48, exerciseId: 5, question: 'el seno', answer:'der Sinus'},
    {id:49, exerciseId: 5, question: 'el coseno', answer:'der Kosinus'},
    {id:50, exerciseId: 5, question: 'la tangente', answer:'der Tangens'},
    {id:51, exerciseId: 5, question: 'la cotangente', answer:'der Kotangens'},
    {id:52, exerciseId: 5, question: 'la secante', answer:'der Sekans'},
    {id:53, exerciseId: 5, question: 'la cosecante', answer:'der Kosekans'},

    {id:61, exerciseId: 6, question: 'la pendiente', answer:'die Steigung'},
    {id:62, exerciseId: 6, question: 'la curva tangente', answer:'die Tangenskurve'},
    {id:63, exerciseId: 6, question: 'la derivada', answer:'die Ableitung'},
    {id:64, exerciseId: 6, question: 'el punto de inflexión', answer:'der Wendepunkt'},
    {id:65, exerciseId: 6, question: 'la variable dependiente', answer:'die abhängige Variable'},
    {id:66, exerciseId: 6, question: 'la integral', answer:'das Integral'},
    {id:67, exerciseId: 6, question: 'converger', answer:'zusammenlaufen'},
    {id:68, exerciseId: 6, question: 'decreciente', answer:'fallend'},
    {id:69, exerciseId: 6, question: 'decrecer', answer:'fallen'},
    {id:70, exerciseId: 6, question: 'derivar', answer:'ableiten'},
    {id:71, exerciseId: 6, question: 'discontinuo', answer:'unstetig'},

    {id:81, exerciseId: 7, question: 'el exponente', answer:'die Hochzahl'},
    {id:82, exerciseId: 7, question: 'el factorial', answer:'die Fakultät'},
    {id:83, exerciseId: 7, question: 'la incógnita', answer:'die Unbekannte'},
    {id:84, exerciseId: 7, question: 'el logaritmo', answer:'der Logarithmus'},
    {id:85, exerciseId: 7, question: 'la ecuación', answer:'die Gleichung'},
    {id:86, exerciseId: 7, question: 'el límite', answer:'der Limes'},
    {id:87, exerciseId: 7, question: 'despejar', answer:'auflösen'},

    {id:88, exerciseId: 8, question: '', answer:''},
    {id:89, exerciseId: 8, question: '', answer:''}


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