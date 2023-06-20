import { Injectable } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {

  constructor(private dataService:DataStorageService) { }

  getSensors(idUser:string){
    return this.dataService.getRequest('sensors/'+idUser);
  }
  getDataSensor(idSensor:string){
    return this.dataService.getRequest('sensorData/'+idSensor);
  }
  addDataSensor(idSensor:string){
    return this.dataService.postRequest('addDataSensor', {"idSensor":idSensor});
  }
}
