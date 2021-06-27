import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent implements OnInit {

  @Input() categories: any[] = [];


  hide: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }
  
  selectCategory(index:number){
    if(this.categories[index].selected){
      this.categories[index].selected=false;
    }else{
      this.categories.forEach(category => {
        category.selected = false;
      });
      this.categories[index].selected=true;
    }
    
  }

}
