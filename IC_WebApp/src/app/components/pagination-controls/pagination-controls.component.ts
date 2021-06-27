import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination-controls',
  templateUrl: './pagination-controls.component.html',
  styleUrls: ['./pagination-controls.component.css']
})
export class PaginationControlsComponent implements OnInit {

  @Input() page_number!:number;
  @Output() cambioEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  cambio(){
    this.cambioEvent.emit(this.page_number);
  }

}
