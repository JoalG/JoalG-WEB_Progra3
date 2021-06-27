import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent implements OnInit {

  @Input() categories: any[] = [];
  @Output() change = new EventEmitter();
  
  hide: boolean = true;
  selected:string = "all";

  constructor() { }

  ngOnInit(): void {
  }
  
  selectCategory(index:number){
    if(this.categories[index].selected){
      this.categories[index].selected=false;
      this.selected = "all";
    }else{
      this.categories.forEach(category => {
        category.selected = false;
      });
      this.categories[index].selected=true;
      this.selected = this.categories[index].name;
    }
    
  }

  changeCategory(){
    this.change.emit(this.selected);
  }

}
