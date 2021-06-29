import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import Swal from 'sweetalert2';
import { FileInfo } from '../models/file-info.model';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private database: AngularFireDatabase, 
    private fireStorage: AngularFireStorage,
    private router: Router) { }
  storageRef = this.fireStorage.storage.ref();
  rootRef = this.database.database.ref('/files');

  uploadFileInStorage(file:File, code:string, oldFileInfo: FileInfo){

    var progress = 0;
    let swalModel:any = {
      allowOutsideClick: false,
      icon: 'info',
      title: 'Subiendo archivo: ' + progress.toFixed(2) + '% completado',
      text: 'Espere por favor'
    }

    var uploadTask = this.storageRef.child('codes/'+ code + '/' + file.name).put(file);
    Swal.fire(swalModel);
    Swal.showLoading();
    
    uploadTask.on(firebase.default.storage.TaskEvent.STATE_CHANGED,
      (snapshot:any) => {
        progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        swalModel = {
          allowOutsideClick: false,
          icon: 'info',
          title: 'Subiendo archivo: ' + progress.toFixed(0) + '% completado',
          text: 'Espere por favor',
          showConfirmButton: false
        }
        Swal.update(swalModel);
        Swal.showLoading();
        
        if(progress === 100){
          Swal.hideLoading();
          Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            title: progress + '% completado',
            text: 'Archivo subido con exito',
            showConfirmButton: true
          }).then(() => {
            this.router.navigateByUrl('/home');
            Swal.fire(
              'Ejercicio guardado',
              '',
              'success'
            )
          })
        }

        switch (snapshot.state) {
          case firebase.default.storage.TaskState.PAUSED:
            console.log('Upload is paused');
            break;
          case firebase.default.storage.TaskState.RUNNING:
            console.log('Upload is running');
            break;
          case firebase.default.storage.TaskState.SUCCESS:
            Swal.close();
            break;
        }
      }, function(error:any) {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          text: 'No se pudo subir el archivo'
        });
        console.log(error.code);
      }, () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL:any) => {
        this.deleteOldFile(oldFileInfo);
        let fileInfo = {
          name: file.name,
          URL: downloadURL,
          path: code + '/' + file.name
        };
        this.saveFileInfo(fileInfo, code);
      });
    });
  }

  saveFileInfo(fileInfo: FileInfo, code: string){
    this.database.database.ref("files/"+ code).set(fileInfo)
    .then(response => {
      console.log("Sucess");

    })
    .catch(err => console.log("Error"));
  }

  deleteOldFile(oldFileInfo: FileInfo){
    console.log(oldFileInfo.path);
    this.storageRef.child('codes/'+ oldFileInfo.path).delete()
    .then(res => {
      console.log('Success');
    })
    .catch((err) => {
      console.log('Error');
    })

  }

  getFileInfo(key: string){
    let promise = new Promise((resolve,reject) =>{
      this.rootRef.child(key).once('value').then((snapshot) => {
        if(snapshot.val() !== null){
          resolve(snapshot.val());
        }
        else{
          reject("Exercise not found");
        }
      });
    });
    return promise;
  }

  deleteFileInfo(key: string){
    let fileInfo: FileInfo;
    this.getFileInfo(key).then((data)=>{

      fileInfo = <FileInfo>data

      this.rootRef.child(key).remove()
      .then(res =>{
        this.deleteOldFile(fileInfo);
        console.log("Delete success")
      })
      .catch(err =>{
        console.log("Delete error", err)
      })
    })
    .catch(err =>{
      console.log("No file", err)
    })

  }


  /*
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
  */
}
