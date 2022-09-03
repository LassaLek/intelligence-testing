import { Component, Input, OnInit } from '@angular/core';
import { SubtestModel } from '../subtestModel';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.scss']
})
export class AssignmentListComponent implements OnInit {

  @Input() assignments: SubtestModel[]

  constructor() { }

  ngOnInit() {
  }

}
