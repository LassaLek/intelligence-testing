import { Component, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AssignmentModel } from '../assignment.model';

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
  @Input() assignment: AssignmentModel;

  state = "closed";

  changeState(): void {
    (this.state == "closed") ? this.state = "open" : console.log("close attempt");
  }

}
