import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Difficulty } from '../models/difficulty.model';

@Injectable({
  providedIn: 'root'
})
export class DifficultyService {

  constructor(
    private database: AngularFireDatabase, 
    private fireStorage: AngularFireStorage,
  ) { }

  rootRef = this.database.database.ref('/difficultyLevels');



  
  createDifficulty(value: number, key: string){
    this.rootRef.child(key).set({
      average: value,
      numOfVotes: 1
    })
    .then(()=>{
      console.log("Success")
    })
    .catch(err => {
      console.log(err)
    })
  }

  updateDifficulty(newValue: number, key: string){

    let promise = new Promise((resolve,reject) =>{
      this.getDifficulty(key).then(data =>{
        let difficulty = <Difficulty>data;
        let newAverage = ((difficulty.average * difficulty.numOfVotes) + newValue) / (difficulty.numOfVotes + 1)
  
        this.rootRef.child(key).set({
          average: newAverage,
          numOfVotes: difficulty.numOfVotes + 1
        })
        .then(()=>{
          resolve(newAverage)
        })
        .catch(err => {
          reject(err)
        })
      })
    });
    return promise;


  }

  getDifficulty(key: string){
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

  deleteDifficulty(key: string){
    this.rootRef.child(key).remove()
    .then(res =>{
      console.log('Success');
    })
    .catch(err =>{
      console.log(err);
    })
  }
}
