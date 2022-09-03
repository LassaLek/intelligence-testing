import { Component, Input } from '@angular/core';
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
  example: AssignmentModel = {
    assignment: [],
    result: []
  };
  state = "closed";

  changeState(): void {
    (this.state == "closed") ? this.state = "open" : console.log("close attempt");
  }

  ngOnInit() {
    this.example = this.getTestExampleSample(this.assignment.type);
  }

  private getTestExampleSample(testType: string): AssignmentModel {
    // TODO testType if
    return {
      assignment: ["#688290", "#688290", "#688290", "#688290", "#efe7d6", "#688290", "#688290", "#688290", "#688290", "#688290"],
      result: ["#efe7d6", "#efe7d6", "#efe7d6", "#efe7d6", "#688290", "#efe7d6", "#efe7d6", "#efe7d6", "#efe7d6", "#efe7d6"],
    }
  }

}
