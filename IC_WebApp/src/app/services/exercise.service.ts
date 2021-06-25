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
    return this.database.database.ref('/exercises').child(key);
  }

  saveNewExercise(exercise: Exercise){
    this.database.database.ref('/exercises').push(exercise).then(response => {console.log(response)}, error => console.log(error));
  }

  getExercises(){
    return this.exercises = this.database.list('exercises');
  }
  /*
  How to use getExercises in other components:

    return this.exerciseService.getExercises()
      .snapshotChanges().subscribe(item => {
        this.exercises = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.exercises.push(x as Exercise);
        });
        // Code that uses this.exercises
      });


  With promises:
  
    let exPromise = new Promise((resolve, reject)=>{
      this.exerciseService.getExercises().snapshotChanges().subscribe(item => {
        let exercises: Exercise[] = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          exercises.push(x as Exercise);
        });
        resolve(exercises)
      });
    })

    exPromise.then((data)=>{
      this.exercises = <Exercise[]>data;
      // Code that uses this.exercises
      console.log(this.exercises);
    })

  */
}
