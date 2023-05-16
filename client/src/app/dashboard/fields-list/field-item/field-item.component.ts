import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-field-item',
  templateUrl: './field-item.component.html',
  styleUrls: ['./field-item.component.scss']
})
export class FieldItemComponent {
  @Input() recipe!:any;
  name:string = '';
  type:string = '';

  ngOnInit(): void {
    this.name = this.recipe.name;
    this.type = this.recipe.type;
  }

  onDelete(){

  }
  onEdit(){

  }
  showMap(){

  }

}
