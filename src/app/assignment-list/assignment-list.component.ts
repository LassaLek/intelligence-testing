import { Component, Input, OnInit } from '@angular/core';
import { AssignmentModel } from '../assignment.model';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.scss']
})
export class AssignmentListComponent implements OnInit {

  @Input() assignments: AssignmentModel[]

  constructor() { }

  ngOnInit() {
  }

}
