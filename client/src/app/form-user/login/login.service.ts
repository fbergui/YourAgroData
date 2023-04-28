import { Injectable } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user:any;
  ris:any;

  constructor(private dataStorageService: DataStorageService) { }

  getUsers(){
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

   login(email:string, password:string){
    return this.dataStorageService.postRequest('login',{email,password})
  }

}
