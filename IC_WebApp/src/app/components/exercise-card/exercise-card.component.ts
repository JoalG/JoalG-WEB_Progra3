import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exercise } from 'src/app/models/exercise.model';


@Component({
  selector: 'app-exercise-card',
  templateUrl: './exercise-card.component.html',
  styleUrls: ['./exercise-card.component.css']
})
export class ExerciseCardComponent implements OnInit {

  @Input() exerciseCode!: string ;
  @Input() exercise!: Exercise;
  hide:boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  counter(i: string, b:boolean) {
    return b? new Array( Number.parseInt(i)): new Array( 5- Number.parseInt(i)) ;
  }

  goToExercise(){
    this.router.navigate(['/solve-exercise',this.exerciseCode]);
  }

  editExercise(){
    this.router.navigate(['/form-exercise',{exerciseCode : this.exerciseCode}]);
  }

  deleteExercise(){
    //delete code
  }


}
