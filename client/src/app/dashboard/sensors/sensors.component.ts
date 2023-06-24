import { Component, Input } from '@angular/core';
import { SensorsService } from './sensors.service';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss']
})
export class SensorsComponent {

  @Input() id!:string;
  constructor(private sensorService:SensorsService) { }
  sensors: any;
  active:boolean=false;
  grafico: any;
  txtRegister:string="Start Register";
  interval:any;

  chartData = [
    {
      data: [330, 600, 260, 700],
      label: 'Account A'
    },
    {
      data: [120, 455, 100, 340],
      label: 'Account B'
    },
    {
      data: [45, 67, 800, 500],
      label: 'Account C'
    }
  ];

  chartLabels = [
    'January',
    'February',
    'March',
    'April'
  ];
  chartOptions = {
    responsive: true
  };


  ngOnInit() {
    this.sensorService.getSensors(this.id).subscribe((data:any)=>{
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
