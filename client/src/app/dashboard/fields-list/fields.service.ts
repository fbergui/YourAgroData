import { Injectable } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class FieldsService {

  constructor(private dataService:DataStorageService) { }

  getFields(idUser:string){
    return this.dataService.postRequest('fields',{idUser})
  }
  getMapKey(){
    return this.dataService.getRequest('mapkey')
  }

}
