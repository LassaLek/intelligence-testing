import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SubtestModel } from '../subtestModel';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnInit {

  @Input() subtests: SubtestModel[]
  subtestResults = new Array(9).fill(false);

  @Output() testResults = new EventEmitter();
  constructor() { }

  ngOnInit() {
    console.log('ResultListComponent results:', this.subtests);
  }

  updateSubtestResults(result: boolean, index: number) {
    console.log('ResultListComponent result:', result);
    console.log('ResultListComponent index:', index);
    this.subtestResults[index] = result;
    console.log('ResultListComponent this.subtestResults:', this.subtestResults);
    this.testResults.emit(this.subtestResults);
  }

}
