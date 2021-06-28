import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
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

 

  constructor(private searchService: SearchService,private router: Router, private userService: UserService) { }

  ngOnInit(): void {

    this.searchService.data$.subscribe(res => this.filter = res)

  }

  isInSession(){
    return this.userService.leerToken() !== '';    
  }

  logOut(){
    this.userService.logout();
  }
  search(){
    this.searchService.changeData(this.filter);  //invoke new Data
    this.router.navigate(['/home']);

  }

}
