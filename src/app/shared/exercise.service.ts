import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Exercise } from '../models/exercise';
import { Question } from '../models/question';

@Injectable()
export class ExerciseService {
  private exerciseUrl = 'http://vocalnicservice.azurewebsites.net/api/Exercise/';
  private questionUrl = 'http://vocalnicservice.azurewebsites.net/api/Question/';

  constructor(private http: Http) {}

  getExercises(): Observable<Exercise[]> {
    //console.log("url" + this.exerciseUrl);
    let res = this.http.get(this.exerciseUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
    return res;
  }

  /*
  getExerciseById(id: number): Promise<Exercise> {
    return Promise.resolve(this.getExercises().find(e => e.id === id));
  }
  */

  getExerciseById(id: number): Observable<Exercise> {
    return this.http.get(this.exerciseUrl + id.toString())
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  //getQuestions(id: number): Promise<Question[]> {
  //  return Promise.resolve(this.QUESTION.filter(a => a.exerciseId === id));
  //}


  getQuestions(id: number): Observable<Question[]> {
    return this.http.get(this.questionUrl + id.toString())
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    //console.log("Extracting" + res.toString());
    let body = res.json();
    //console.log("body: " + body.toString());
    return body || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    //console.error(errMsg);
    return Observable.throw(errMsg);
  }
}