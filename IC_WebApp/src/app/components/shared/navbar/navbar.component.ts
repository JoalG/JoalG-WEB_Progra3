import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  filter:string="";

  @Output() changeFilter = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  search(){
    this.changeFilter.emit(this.filter);
  }

}
