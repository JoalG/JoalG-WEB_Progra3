import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';
import { Exercise } from '../models/exercise.model';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  exercises!: AngularFireList<any>;
  constructor(private database: AngularFireDatabase, private fireStorage: AngularFireStorage) { 
    
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

  saveNewExercise(exercise: Exercise, file:any){
    this.rootRef.push(exercise)
      .then(response => {
        let key: string = response['key']!;
        this.rootRef.child(key).child('code').set(key);

        if(typeof file !== 'undefined'){
          this.uploadFile(file,key);
        }
        console.log(response)
      }, 
      error => console.log(error));
  }

  updateExercise(exercise: Exercise, key: string, file:any){
    this.database.database.ref("exercises/"+ key).set(exercise)
    .then(response => {
      console.log("Sucess");
      if(typeof file !== 'undefined'){
        this.uploadFile(file,key);
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

  /*
  How to use getExercises in other components:

    exerciseService.getExercises.then((data)=>{
      this.exercises = data;
      // Code that uses this.exercises
      console.log(this.exercises);
    })

  */
    metadata!: { contentType: string; };
    
  
    uploadFile(file:File, code:string){
      
      /*
      this.metadata= {
        contentType: 'text/plain'
      };
      */

      console.log(file.text);
      var uploadTask = this.storageRef.child('codes/'+code).put(file);
      uploadTask.on(firebase.default.storage.TaskEvent.STATE_CHANGED,
        function(snapshot:any) {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.default.storage.TaskState.PAUSED: 
              console.log('Upload is paused');
              break;
            case firebase.default.storage.TaskState.RUNNING:
              console.log('Upload is running');
              break;
          }
        }, function(error:any) {
          console.log(error.code);
        }, function() {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL:any) {
          console.log('File available at', downloadURL);
        });
      });
    }

    getDownloadURL(code: string): Promise<any>{
      let promise = new Promise((resolve,reject)=>{
        this.storageRef.child('codes/'+code).getDownloadURL()
        .then((url) => {
          resolve(url);
        })
        .catch((error) => {
          reject(error);
        });      
      })
      return promise;
    }
}
