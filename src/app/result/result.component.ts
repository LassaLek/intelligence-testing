import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SubtestModel } from '../subtestModel';
import { ColorEnum } from '../click-color.directive';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  @Input() subtest: SubtestModel;
  @Output() resultChange = new EventEmitter<string[]>();

  result = new Array(9).fill('a');
  constructor() { }

  updateResults(result: string[]) {
    this.result = result;
    this.resultChange.emit(this.result);
  }

}
