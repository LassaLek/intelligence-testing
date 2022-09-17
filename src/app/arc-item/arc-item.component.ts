import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';



@Component({
  selector: 'app-arc-item',
  templateUrl: './arc-item.component.html',
  styleUrls: ['./arc-item.component.scss'],
})
export class ArcItemComponent implements OnInit{
  @Input() subtest: string[] = [];
  // Here you can change click-ability of the arc
  @Input() isResult = false;
  @Output() emitResults = new EventEmitter();

  values: any = new Array(9).fill('a');

  ngOnInit() {
    this.values.splice(0, this.subtest.length, ...this.subtest);
    this.emitResults.emit(this.subtest)
  }

  updateValue(color: string, index: number) {
    this.subtest[index] = color;
    console.log('TEST LINE', this.subtest);
    this.emitResults.emit(this.subtest)
  }
}
