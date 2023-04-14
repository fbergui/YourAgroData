import { Component,Input } from '@angular/core';
import { LoginService } from './login.service';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  user:any;

  constructor(public dataStorageService: DataStorageService) {
  }

  getUser(){
    this.dataStorageService.getRequest('users').subscribe({
      next: (data) => {
          this.user=data;
          console.log(this.user);

      },
      error: (error) => {
        console.log(error);
      },
    });
  }


}
