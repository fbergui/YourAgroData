import { Component, OnInit } from '@angular/core';
import { BreakpointObserver,Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'YourAgroData';

  constructor(public responsive: BreakpointObserver) {}

  ngOnInit() {
    this.responsive.observe([Breakpoints.HandsetPortrait]).subscribe((state: BreakpointState) => {
        if (state.matches) {
          console.log('This is the Handset Portrait point at max-width: 599.98 px and portrait orientation.');
        }
      });
  }




}
