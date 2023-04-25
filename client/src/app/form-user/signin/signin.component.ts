import { Component ,ViewEncapsulation} from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  encapsulation: ViewEncapsulation.None // disabilita l'encapsulation del css (ngx-mat-intl-tel-input)
})
export class SigninComponent {

  phone:any;

  constructor() { }

  registration(){
    console.log(this.phone);
  }


}
