import { Component } from '@angular/core';
import { SensorsService } from './sensors.service';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss']
})
export class SensorsComponent {

  constructor(private sensorService:SensorsService) { }
  sensors: any;
  active:boolean=false;
  grafico: any;
  txtRegister:string="Start Register";
  interval:any;


  ngOnInit() {
    this.sensorService.getSensors("6438f50f969d3d3f112545c6").subscribe((data:any)=>{
      this.sensors = data;
    })
  }

  register(idSensor:any){
    if(this.active==false)
    {
      this.active=true;
      this.txtRegister="Stop";
      this.interval = setInterval(() => {
        this.sensorService.addDataSensor(idSensor).subscribe((data:any)=>{
          console.log(data.ris);
        })

      }, 1000);
    }
    else{
      clearInterval(this.interval);
      this.active=false;
      this.txtRegister="Start Register";
    }


  }
}
