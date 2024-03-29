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
  _subtest: SubtestModel;
  get subtest(): SubtestModel {
    return this._subtest;
  }
  @Input() set subtest(value: SubtestModel) {
    if(!this.isCheatSheet) {
      this.result = new Array(9).fill('a');
    } else {
      this.result = value?.result
    }
    this._subtest = value;
  }

  // here you can turn on/off the cheat sheet
  @Input() isCheatSheet;
  @Output() resultChange = new EventEmitter<string[]>();
  result;

  updateResults(result: string[]) {
    this.result = result;
    this.resultChange.emit(this.result);
  }

}
