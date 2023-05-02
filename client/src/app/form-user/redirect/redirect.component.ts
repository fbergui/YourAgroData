import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent {

  constructor(private route: ActivatedRoute) { }

  email:string='';

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.email = params['email'];
      });
  }



}
