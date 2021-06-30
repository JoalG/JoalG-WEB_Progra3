import { Component, OnInit, Input } from '@angular/core';
import { ExerciseService } from 'src/app/services/exercise.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {

  constructor(private exerciseService: ExerciseService) { }
  @Input() ratingInfo: any = {};

  ngOnInit(): void {

  } 

  isChecked(expectedValue: number){
    return this.ratingInfo.rating >= (expectedValue-0.5) && this.ratingInfo.rating < (expectedValue+0.5);
  }

  updateRating(rating: number){
    this.exerciseService.updateDifficultyLevel(rating, this.ratingInfo.code);
    Swal.fire(
      'Dificultad de ejercicio calificada',
      '',
      'success'
    )
  }
}