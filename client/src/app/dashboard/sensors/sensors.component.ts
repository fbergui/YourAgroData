import { Component, Input } from '@angular/core';
import { SensorsService } from './sensors.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss']
})
export class SensorsComponent {

  @Input() id!: string;
  constructor(private sensorService: SensorsService) { }
  sensors: any;
  active: boolean = false;
  grafico: any;
  txtRegister: string = "Start Register";
  interval: any;
  dataSensor: any[] = [];
  selectedOption: string = "";


  chartData: any = [
    {
      data: [],
      label: '',
      borderWidth: 1,
      borderColor: '#000'
    },
  ];

  chartLabels: any = [];
  chartOptions = {
    responsive: true
  };


  ngOnInit() {
    this.sensorService.getSensors(this.id).subscribe((data: any) => {
      this.sensors = data;
    })
  }

  register(idSensor: any, valueType: any) {
    if (this.active == false && (valueType != " " || valueType == null)) {

      this.active = true;
      this.txtRegister = "Stop";
      this.interval = setInterval(() => {
        this.sensorService.addDataSensor(idSensor).subscribe((data: any) => {

        })
        this.sensorService.getDataSensor(idSensor).subscribe((data: any) => {
          this.dataSensor = [];
          this.chartLabels.length = 0;
          this.chartData.length = 0;


          for (let datoSensore of data) {
            this.chartLabels.push(datoSensore.time.toString())
            if (datoSensore[valueType] != null)
              this.dataSensor.push(datoSensore[valueType])

          }
          this.chartData = [{
            data: this.dataSensor,
            label: valueType,
            borderWidth: 1,
            borderColor: '#000'
          }]
        })
      }, 1000);
    }
    else {
      clearInterval(this.interval);
      this.active = false;
      this.txtRegister = "Start Register";
    }


  }
}
