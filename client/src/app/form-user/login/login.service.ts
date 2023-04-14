import { Injectable } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user:any;

  constructor(private dataStorageService: DataStorageService) { }

  getUser(){

  }

}
