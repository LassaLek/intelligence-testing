import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SubtestModel } from '../subtestModel';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent {

  @Input() subtests: SubtestModel[];
  subtestResults = new Array(9).fill([]);

  @Output() testResults = new EventEmitter();

  updateSubtestResults(result: string[], id: number) {
    this.subtestResults[id - 1] = result;
    this.testResults.emit(this.subtestResults);
  }

}
