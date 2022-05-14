import { Component, Input, OnInit } from '@angular/core';
import { AssignmentModel } from '../assignment.model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  @Input() result: AssignmentModel;

  constructor() { }

  ngOnInit() {
    console.log('ResultComponent result:', this.result);
  }

}
