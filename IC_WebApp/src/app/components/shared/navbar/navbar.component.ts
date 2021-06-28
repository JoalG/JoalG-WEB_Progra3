import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  filter:string="";

 

  constructor(private searchService: SearchService,private router: Router) { }

  ngOnInit(): void {

    this.searchService.data$.subscribe(res => this.filter = res)

  }

  search(){
    this.searchService.changeData(this.filter);  //invoke new Data
    this.router.navigate(['/home']);

  }

}
