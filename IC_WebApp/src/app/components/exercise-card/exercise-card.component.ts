import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Exercise } from 'src/app/models/exercise.model';
import { ExerciseService } from 'src/app/services/exercise.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-exercise-card',
  templateUrl: './exercise-card.component.html',
  styleUrls: ['./exercise-card.component.css']
})
export class ExerciseCardComponent implements OnInit {

  @Input() exerciseCode!: string ;
  @Input() exercise!: Exercise;
  @Output() delete = new EventEmitter();
  hide:boolean = false;

  constructor(
    private router: Router, 
    private exerciseService: ExerciseService,
    private userService: UserService
  ) { }

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
    Swal.fire({
      allowOutsideClick: false,
      icon: 'warning',
      title: '¿Desea eliminar el ejercicio?',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Sí"
    })
    .then((confirm)=>{
      if(confirm.isConfirmed){
        this.exerciseService.deleteExercise(this.exerciseCode);
        this.delete.emit(this.exerciseCode);
      }
    })
  }

  isInSession(){
    return this.userService.leerToken() !== '';    
  }
}
