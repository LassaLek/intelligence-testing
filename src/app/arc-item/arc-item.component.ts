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

  values: any = new Array(9).fill(ColorEnum.Peignoir);

  ngOnInit() {
    this.values.splice(0, this.subtest.length, ...this.subtest)
  }

  updateValue(color: string, index: number) {
    // console.log('Color: ', color);
    // console.log('Index: ', index);
    this.subtest[index] = color;
    // console.log('this.values: ', this.values);
    console.log('this.values: ', this.subtest);
    this.emitResults.emit(this.subtest)
  }
}
