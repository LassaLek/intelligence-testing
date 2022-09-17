import { Component, EventEmitter, Input, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SubtestModel } from '../subtestModel';
import { SubtestTypeEnum } from '../subtest.type.enum';

interface AssignmentModel {
  assignment: string[];
  result: string[];
}

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss'],
  animations: [
    trigger('widthGrow', [
      state('closed', style({
        width: 100,
      })),
      state('open', style({
        width: 600
      })),
      transition('* => *', animate(150))
    ]),
  ],
})
export class AssignmentComponent {
  @Input() assignment: SubtestModel;
  @Output() assignmentOpened = new EventEmitter<number>();
  example: AssignmentModel = {
    assignment: [],
    result: []
  };
  state = "closed";

  changeState(): void {
    (this.state == "closed") ? this.state = "open" : console.log("close attempt");
    this.assignmentOpened.emit(this.assignment.id)
  }

  ngOnInit() {
    this.example = this.getTestExampleSample(this.assignment.type);
  }

  private getTestExampleSample(testType: string): AssignmentModel {
    if(testType === SubtestTypeEnum.ColorSwitch) {
      // a -> b
      // b -> a
      return {
        assignment: ["a", "a", "a", "a", "b", "a", "a", "a", "a"],
        result: ["b", "b", "b", "b", "a", "b", "b", "b", "b"],
      }
    } else if(testType === SubtestTypeEnum.ColorSwitchAdvanced) {
      // a -> b
      // b -> c
      return {
        assignment: ["a", "a", "a", "a", "c", "a", "a", "a", "b"],
        result: ["b", "b", "b", "b", "a", "b", "b", "b", "c"],
      }
    }

    return {
      assignment: ["a", "b", "c", "a", "b", "c", null, null, null],
      result: ["a", "b", "c", "a", "b", "c", "a", "b", "c"],
    }
  }

}
