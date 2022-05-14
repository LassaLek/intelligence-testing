import { Component, Input, OnInit } from '@angular/core';
import { AssignmentModel } from '../assignment.model';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnInit {

  @Input() results: AssignmentModel[]

  constructor() { }

  ngOnInit() {
    console.log('ResultListComponent results:', this.results);
  }
}
