import { Component, Input, OnInit } from '@angular/core';
import { Exercise,Example } from 'src/app/models/exercise.model';
import { CodeEditorModule, CodeModel } from '@ngstack/code-editor';
import { ExerciseService } from 'src/app/services/exercise.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from 'src/app/services/file.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-solve-exercise',
  templateUrl: './solve-exercise.component.html',
  styleUrls: ['./solve-exercise.component.css']
})
export class SolveExerciseComponent implements OnInit {
  
    
   isDataLoaded:boolean = false;
   exerciseCode: string = "";
   exercise!: Exercise;
   fileURL: string = '';

   hide:boolean = true;
   
   solutionCodeModel: CodeModel = {
      language: 'python',
      uri: '',
      value: "",
      dependencies: ['@types/node', '@ngstack/translate', '@ngstack/code-editor']
   };
  
   options = {
      lineNumbers: true,
      contextmenu: false,
      minimap: {
         enabled: false
      },
      scrollBeyondLastLine:false,
      fontSize: 16,
      selectionClipboard: true
   };
   


   constructor(
      private exerciseService: ExerciseService,
      private route: ActivatedRoute,
      private fileService: FileService,
      private fb: FormBuilder
   ) { 
      try {
         this.exerciseCode = <string>this.route.snapshot.paramMap.get('code');
   
       } catch (error) {
         console.log(error)
       } 
   }
   
   ngOnInit(): void {
      
      this.fileService.getFileInfo(this.exerciseCode)
         .then((data:any)=>{
            this.fileURL = data.URL;
         })
         .catch(error =>{
            console.log(error);
         })

      this.exerciseService.getExerciseByKey(this.exerciseCode).then((data)=>{
         this.exercise = <Exercise>data;
         console.log(this.exercise);
         this.solutionCodeModel.value = this.exercise.solution.code;
         this.isDataLoaded = true;  
      }).catch((data)=>console.log(data));
   }

   counter(i: string, b:boolean) {
      return b? new Array( Number.parseInt(i)): new Array( 5- Number.parseInt(i)) ;
   }

   getExamples(){
      let examples:Example[] = this.exercise.examples;
      let res = examples.map( (example) =>{
         let res = "";
         res += example.comment.length != 0 ? "# "+example.comment+"\n": "";
         res += ">>> "+ example.call + "\n";
         res += example.result;
         return res;
      });
      return res;
   }

   hideSolution(){
      document.getElementById("solution")?.classList.remove("show");
   }
  
   onCodeChanged(value: any) {
      console.log('CODE', value);
   }

   downloadMyFile(){
      const link = document.createElement('a');
      link.setAttribute('target', '_blank');
      link.setAttribute('href', this.fileURL);
      link.setAttribute('download', '');
      document.body.appendChild(link);
      link.click();
      link.remove();
  }

  getRatingInfo(){
     return {
        rating: this.exercise.level,
        code: this.exercise.code
      }
  }
}
