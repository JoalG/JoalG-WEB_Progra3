import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Exercise } from '../models/exercise.model';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  exercises!: AngularFireList<any>;
  constructor(private database: AngularFireDatabase,) { }

  currentExercise!: Exercise;

  getExerciseByKey(key: string){
    let promise = new Promise((resolve,reject) =>{
      this.database.database.ref('/exercises').child(key).once('value').then((snapshot) => {
        if(snapshot.val() !== null){
          resolve(snapshot.val());
        }
        else{
          reject("Exercise not found")
        }
      });
    });
    return promise;
  }

  saveNewExercise(exercise: Exercise){
    this.database.database.ref('/exercises').push(exercise).then(response => {console.log(response)}, error => console.log(error));
  }

  getExercises(){
    let promise = new Promise((resolve,reject) =>{
      this.database.list('exercises').snapshotChanges().subscribe(item => {
        let exercisesAndKey: any = [];
        item.forEach(element => {
          let x = {
            exercise : <Exercise>element.payload.toJSON(),
            key: element.key
          };
          exercisesAndKey.push(x);
        });
        if(exercisesAndKey.length !== 0){
          resolve(exercisesAndKey)
        }
        else{
          reject(exercisesAndKey)
        }
      });
    })
    return promise;
  }
  
  /*
  How to use getExercises in other components:

    exerciseService.getExercises.then((data)=>{
      this.exercises = <Exercise[]>data;
      // Code that uses this.exercises
      console.log(this.exercises);
    })

  */
}
