import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent implements OnInit {

  categories: any[] = [
    {
      name: "POO",
      amount: 30,
      selected: false
    },
    {
      name: "Matrices",
      amount: 24,
      selected: false
    },
    {
      name: "Listas",
      amount: 54,
      selected: false
    },
    {
      name: "Arboles",
      amount: 15,
      selected: false
    },
    {
      name: "Matrices",
      amount: 24,
      selected: false
    },
    {
      name: "Listas",
      amount: 54,
      selected: false
    },
    {
      name: "Arboles",
      amount: 15,
      selected: false
    },
    {
      name: "Matrices",
      amount: 24,
      selected: false
    },
    {
      name: "Listas",
      amount: 54,
      selected: false
    },
    {
      name: "Arboles",
      amount: 15,
      selected: false
    }
  ];


  hide: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  
  selectCategory(index:number){
    this.categories.forEach(category => {
      category.selected = false;
    });
    this.categories[index].selected=true;
  }

}
