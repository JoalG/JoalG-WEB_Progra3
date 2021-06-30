import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';


@Component({
  selector: 'app-difficulty-card',
  templateUrl: './difficulty-card.component.html',
  styleUrls: ['./difficulty-card.component.css']
})

export class DifficultyCardComponent implements OnInit {

  @Input() difficulties!: any[];
  @Output() change = new EventEmitter();
  
  hide: boolean = false;
  selected:string = "all";
  search = false;

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.searchService.data$.subscribe(res => {this.search = res!=""});
  }
  
  selectDifficulty(index:number){
    if(this.difficulties[index].selected){
      this.difficulties[index].selected=false;
      this.selected = "all";
    }else{
      this.difficulties.forEach(category => {
        category.selected = false;
      });
      this.difficulties[index].selected=true;
      this.selected = this.difficulties[index].level;
    }
    this.changeDifficulty();
  }

  counter(i: string, b:boolean) {
    return b? new Array( Number.parseInt(i)): new Array( 5- Number.parseInt(i)) ;
  }

  changeDifficulty(){
    this.change.emit(this.selected);
  }


}


