import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/models/exercise.model';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


   exercises: any[] = [];
   sections: any[] = [];
   levels: any[] = [];

   page_number:number =1;
   page_size:number = 9;

   selectedSection:string = "all";
   selectedLevel:string = "all";

   constructor(private exerciseService:ExerciseService) { }

   ngOnInit(): void {
      this.getData();
   }

   getData(){
      this.exerciseService.getExercises().then((data)=>{
         this.exercises = <any[]>data;  
         this.sections = this.getSections();
         this.levels=this.getLevels();             
      })
   }

   getExercises(){
      let res:any[] = this.exercises
      .filter((elem)=>{
         return this.selectedSection=="all"? true:elem.exercise.section == this.selectedSection;
      })  
      .filter((elem)=>{
         return this.selectedLevel=="all"? true:elem.exercise.level == this.selectedLevel;
      })
      return res;  
   }


   getSections(){
      let result = this.exercises
      .map((item)=>(item.exercise))
      .reduce((total,value)=>{
            total[value.section] = (total[value.section]||0)+1;
            return total;
      },{});

      result = Object.keys(result).map((key)=>{
         return{name:key,amount:result[key],selected:false}
      });
      
      return result;
   }

  
   getLevels(){
      let result = this.exercises
      .map((item)=>(item.exercise))
      .reduce((total,value)=>{
            total[value.level] = (total[value.level]||0)+1;
            return total;
      },{"1":0,"2":0,"3":0,"4":0,"5":0});
      
      result = Object.keys(result).map((key)=>{
         return{level:key,amount:result[key],selected:false}
      });

      result.sort((a:any,b:any)=>{
         return b.amount-a.amount;
      });

      return result;
   }

   scroll(el: string) {
      document.getElementById(el)?.scrollIntoView({behavior:"smooth"});
  }

}
