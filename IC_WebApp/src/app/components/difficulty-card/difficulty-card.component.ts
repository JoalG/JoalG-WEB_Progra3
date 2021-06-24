import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-difficulty-card',
  templateUrl: './difficulty-card.component.html',
  styleUrls: ['./difficulty-card.component.css']
})
export class DifficultyCardComponent implements OnInit {

  difficulties: any[] = [
    {
      level: 1,
      amount: 30,
      selected: false
    },
    {
      level: 2,
      amount: 20,
      selected: false
    },
    {
      level: 3,
      amount: 30,
      selected: false
    },
    {
      level: 4,
      amount: 30,
      selected: false
    },
    {
      level: 5,
      amount: 30,
      selected: false
    },
  ];


  hide: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  
  selectCategory(index:number){
    this.difficulties.forEach(category => {
      category.selected = false;
    });
    this.difficulties[index].selected=true;
  }

  counter(i: number) {
    return new Array(i);
  }

}
