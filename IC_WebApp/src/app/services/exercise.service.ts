import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Exercise } from '../models/exercise.model';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private database: AngularFireDatabase,) { }

  currentExercise!: Exercise;

  getExerciseByKey(key: string){
    return this.database.database.ref('/exercises').child(key)
  }

  saveNewExercise(exercise: Exercise){
    this.database.database.ref('/exercises').push(exercise).then(response => {console.log(response)}, error => console.log(error));
  }
}
