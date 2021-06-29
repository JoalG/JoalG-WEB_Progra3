import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import Swal from 'sweetalert2';
import { Exercise } from '../models/exercise.model';
import { FileInfo } from '../models/file-info.model';
import { FileService } from './file.service';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  exercises!: AngularFireList<any>;
  constructor(
    private database: AngularFireDatabase, 
    private fireStorage: AngularFireStorage,
    private fileService: FileService,
    private router: Router) { 
    
  }
  rootRef = this.database.database.ref('/exercises');
  storageRef = this.fireStorage.storage.ref();

  currentExercise!: Exercise;


  async getExerciseByKey(key: string): Promise<any>{
    let promise = new Promise((resolve,reject) =>{
      this.rootRef.child(key).once('value').then((snapshot) => {
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

  saveNewExercise(exercise: Exercise, file:any, fileInfo: FileInfo){
    this.rootRef.push(exercise)
      .then(response => {
        let key: string = response['key']!;
        this.rootRef.child(key).child('code').set(key);

        if(typeof file !== 'undefined'){
          this.fileService.uploadFileInStorage(file, key, fileInfo);
          Swal.fire(
            'Ejercicio guardado',
            '',
            'success'
          )
        }
        else{
          this.router.navigateByUrl('home');
          Swal.fire(
            'Ejercicio guardado',
            '',
            'success'
          )
        }
        console.log(response)
      }, 
      error => console.log(error));
  }

  async updateExercise(exercise: Exercise, key: string, file:any, fileInfo: FileInfo){
    this.database.database.ref("exercises/"+ key).set(exercise)
    .then(response => {
      console.log("Sucess");
      if(typeof file !== 'undefined'){
        this.fileService.uploadFileInStorage(file, key, fileInfo);
      }
      else{
        this.router.navigateByUrl('home');
        Swal.fire(
          'Ejercicio actulizado',
          '',
          'success'
        )
      }
    })
    .catch(err => console.log("Error"));
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

  deleteExercise(key: string){
    this.rootRef.child(key).remove()
    .then(res =>{
      this.fileService.deleteFileInfo(key);
      Swal.fire(
        'Ejercicio eliminado',
        '',
        'success'
      )
      console.log("Delete success")
    })
    .catch(err =>{
      console.log("Delete error", err)
    })
    
  }
  /*
  How to use getExercises in other components:

    exerciseService.getExercises.then((data)=>{
      this.exercises = data;
      // Code that uses this.exercises
      console.log(this.exercises);
    })

  */  

}
