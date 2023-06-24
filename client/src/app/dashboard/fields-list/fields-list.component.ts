import { Component, Input, OnInit} from '@angular/core';
import { FieldsService } from './fields.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fields-list',
  templateUrl: './fields-list.component.html',
  styleUrls: ['./fields-list.component.scss']
})
export class FieldsListComponent implements OnInit {

  @Input() id!:string;
  constructor(private fieldsService: FieldsService) { }
  fields: any[] = [];


  mapOptions:any;
  polygons: google.maps.LatLngLiteral[] = []
  mapTypeId:any = 'satellite';
  zoom = 15;
  center: google.maps.LatLngLiteral = {
    lat: 0,
    lng: 0
  };
  ngOnInit(): void {
    this.fieldsService.getFields(this.id).subscribe((data: any) => {
      this.fields = data;
      this.fields.forEach((field: any) => {
        this.polygons.push(field.polygon)
      })
      this.center = {
        lat: this.fields[0].polygon[0].lat,
        lng: this.fields[0].polygon[0].lng
      }
      console.log(this.fields);
    })
  }



  addField() {

  }
}
