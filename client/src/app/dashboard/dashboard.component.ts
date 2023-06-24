import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  constructor(private router: Router,private route: ActivatedRoute) { }
  active:number = 1;

  id:any;
  name:any;

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id')
    this.name = this.route.snapshot.paramMap.get('name')
    console.log(this.id)




    if(this.router.url.includes("fields"))
    return this.active = 1;
    else if(this.router.url.includes("sensors"))
    return this.active = 2;
    else
    return 0;
  }

}
