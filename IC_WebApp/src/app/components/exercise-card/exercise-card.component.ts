import { Component, Input, OnInit } from '@angular/core';
import { Exercise } from 'src/app/models/exercise.model';


@Component({
  selector: 'app-exercise-card',
  templateUrl: './exercise-card.component.html',
  styleUrls: ['./exercise-card.component.css']
})
export class ExerciseCardComponent implements OnInit {

  @Input() exercise!: Exercise;
  hide:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  counter(i: string, b:boolean) {
   

    return b? new Array( Number.parseInt(i)): new Array( 5- Number.parseInt(i)) ;
  }
  picha(){
    console.log("picha");
    
  }

}
