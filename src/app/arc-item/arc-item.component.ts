import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SubtestModel } from '../subtestModel';
import { ColorEnum } from '../click-color.directive';


@Component({
  selector: 'app-arc-item',
  templateUrl: './arc-item.component.html',
  styleUrls: ['./arc-item.component.scss'],
})
export class ArcItemComponent implements OnInit{
  @Input() subtest: string[] = [];
  @Output() emitResults = new EventEmitter();

  values: any = new Array(9).fill('a');

  ngOnInit() {
    this.values.splice(0, this.subtest.length, ...this.subtest);
    this.emitResults.emit(this.subtest)
  }

  updateValue(color: string, index: number) {
    this.subtest[index] = color;
    this.emitResults.emit(this.subtest)
  }
}
