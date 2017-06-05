import { Injectable } from '@angular/core';

import { Exercise } from '../models/exercise';
import { Question } from '../models/question';
import { Stat } from '../models/stats';

@Injectable()
export class StatService {
  constructor() {}

  getStat(user: string, exerciseId: number): Stat {
    //localStorage.setItem('testObject', JSON.stringify(testObject));
    var retrievedObject = localStorage.getItem(user + exerciseId);
    //console.log("Longitud:", retrievedObject);
    console.log('retrievedObject: ', JSON.parse(retrievedObject));
    let stat = new Stat();
    if (retrievedObject == null) {
      stat.user = user;
      stat.id = exerciseId;
      stat.correctMulti = 0;
      stat.correctSimple = 0;
      stat.wrongMulti = 0;
      stat.wrongSimple = 0;
    } else {
      stat = JSON.parse(retrievedObject);
  }
    return stat;
  }

  setStat(stat: Stat) {
    localStorage.setItem(stat.user + stat.id, JSON.stringify(stat));
  }

}