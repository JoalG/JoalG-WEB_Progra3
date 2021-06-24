import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exercise-card',
  templateUrl: './exercise-card.component.html',
  styleUrls: ['./exercise-card.component.css']
})
export class ExerciseCardComponent implements OnInit {

  name: string = "Arbol binario";
  category: string = "Árboles"
  author: string = "Diego Mora";
  date: Date = new Date();
  description: string = "Realice una función que retorne una lista que simboliza un árbol, por lo que se conforma por hijo derecha e izquierdo y el valor que simboliza la raíz. ";
  difficulty: number = 3;

  constructor() { }

  ngOnInit(): void {
  }

  counter(i: number) {
    return new Array(i);
  }

}
