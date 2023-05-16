import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FieldsService } from './fields.service';
import { Router } from '@angular/router';

import { AgmMap, AgmPolygon, ControlPosition, LatLng, LatLngLiteral } from '@agm/core';
import { DrawingControlOptions } from '@agm/drawing/google-drawing-types';
import { OverlayType } from '@agm/drawing';

@Component({
  selector: 'app-fields-list',
  templateUrl: './fields-list.component.html',
  styleUrls: ['./fields-list.component.scss']
})
export class FieldsListComponent implements OnInit{

  constructor(private fieldsService:FieldsService) { }

  @ViewChildren(AgmPolygon) public polygonRefs!: QueryList<AgmPolygon>;


  fields:any[] = [];
  mapRef!: AgmMap;
  zoom: number = 15;
  lat: number = 0;
  lng: number = 0;

  activePolygonIndex!: number;
  drawingMode: any = null;

  drawingControlOptions: DrawingControlOptions = {
    position: ControlPosition.TOP_CENTER,
    drawingModes: [
      OverlayType.POLYGONE
    ]
  }

  polygonOptions = {
    fillOpacity: 0.3,
    fillColor: '#ff0000',
    strokeColor: '#ff0000',
    strokeWeight: 2,
    draggable: true,
    editable: true
  }

  polygons: LatLngLiteral[][] = []

  ngOnInit(): void {
    this.fieldsService.getFields("6438f50f969d3d3f112545c6").subscribe((data:any)=>{
      this.fields = data;

      this.fields.forEach((field:any)=>{
        this.polygons.push(field.polygon)
      })
      this.lat = this.fields[0].polygon[0].lat;
      this.lng = this.fields[0].polygon[0].lng;
      console.log(this.fields);
    })
  }
  onLoadMap($event: AgmMap) {
    this.mapRef = $event;
  }

  onOverlayComplete($overlayEvent: any) {
    this.drawingMode = this.drawingMode === null ? '' : null;
    if ($overlayEvent.type === OverlayType.POLYGONE) {
      const newPolygon = $overlayEvent.overlay.getPath()
        .getArray()
        .map((latLng: LatLng) => ({ lat: latLng.lat(), lng: latLng.lng() }))

      // start and end point should be same for valid geojson
      const startPoint = newPolygon[0];
      newPolygon.push(startPoint);
      $overlayEvent.overlay.setMap(null);
      this.polygons = [...this.polygons, newPolygon];
    }
  }

  onClickPolygon(index: number) {
    this.activePolygonIndex = index;
  }




}
