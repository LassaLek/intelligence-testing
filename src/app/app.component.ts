import { Component } from '@angular/core';
import tests from '../assets/tests/tests.json';
import { SharedService } from './shared.service';
import { TestModel } from './test.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'intelligence-testing';
  test: TestModel = tests[SharedService.getRandomInt(tests.length)];
}
