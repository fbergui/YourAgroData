import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  constructor(public router: Router) { }
  active:number = 1;

  ngOnInit(){
    if(this.router.url.includes("fields"))
    return this.active = 1;
    else if(this.router.url.includes("sensors"))
    return this.active = 2;
    else
    return 0;
  }

}
