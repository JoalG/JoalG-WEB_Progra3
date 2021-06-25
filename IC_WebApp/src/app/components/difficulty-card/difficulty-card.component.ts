import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-difficulty-card',
  templateUrl: './difficulty-card.component.html',
  styleUrls: ['./difficulty-card.component.css']
})

export class DifficultyCardComponent implements OnInit {

  @Input() difficulties!: any[];

  hide: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  
  selectCategory(index:number){
    if(this.difficulties[index].selected){
      this.difficulties[index].selected=false;
    }else{
      this.difficulties.forEach(category => {
        category.selected = false;
      });
      this.difficulties[index].selected=true;
    }
  }

  counter(i: string, b:boolean) {
    return b? new Array( Number.parseInt(i)): new Array( 5- Number.parseInt(i)) ;
  }

}
function input() {
  throw new Error('Function not implemented.');
}

