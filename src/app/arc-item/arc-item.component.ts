import { Component, Input, OnInit } from '@angular/core';
import { AssignmentModel } from '../assignment.model';


@Component({
  selector: 'app-arc-item',
  templateUrl: './arc-item.component.html',
  styleUrls: ['./arc-item.component.scss'],
})
export class ArcItemComponent implements OnInit{
  @Input() assignment: AssignmentModel = {
    id: 0,
    boxes: []
  };

  values: any = new Array(10).fill('white');

  ngOnInit() {
    this.values.splice(0, this.assignment.boxes.length, ...this.assignment.boxes)
  }

}
