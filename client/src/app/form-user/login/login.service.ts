import { Injectable } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user:any;
  ris:any;

  constructor(private dataStorageService: DataStorageService) { }
  login(email:string, password:string){
    return this.dataStorageService.postRequest('login',{email,password})
  }

}
