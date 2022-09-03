import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SubtestModel } from '../subtestModel';
import { ColorEnum } from '../click-color.directive';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  @Input() subtest: SubtestModel;
  @Output() resultChange = new EventEmitter();

  result = new Array(9).fill(ColorEnum.Peignoir);
  constructor() { }

  ngOnInit() {
    console.log('ResultComponent result:', this.subtest);

  }

  updateResults(result: string[]) {
    this.result = result;
    console.log('ResultComponent result:', this.result);
    console.log('Is result correct:', SharedService.areResultsEqual(this.result, this.subtest.result));
    this.resultChange.emit(SharedService.areResultsEqual(this.result, this.subtest.result));
  }

}
