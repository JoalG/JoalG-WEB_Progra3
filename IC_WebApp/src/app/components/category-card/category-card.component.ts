import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent implements OnInit {

  @Input() categories: any[] = [];
  @Output() change = new EventEmitter();
  
  hide: boolean = false;
  selected:string = "all";
  search = false;

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.searchService.data$.subscribe(res => {this.search = res!=""});
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
    this.changeCategory();
  }

  changeCategory(){
    this.change.emit(this.selected);
  }

}
