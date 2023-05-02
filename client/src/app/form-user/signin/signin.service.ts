import { Injectable } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  user:any;
  ris:any;

  constructor(private dataStorageService: DataStorageService) { }

  signin(firstName:string, lastName:string, email:string, password:string, phone:string){
    return this.dataStorageService.postRequest('signin',{firstName,lastName,email,password,phone})
  }
}
