import { Component } from '@angular/core';
import test1 from '../assets/tests/test_1.json';
import test2 from '../assets/tests/test_2.json';
import test3 from '../assets/tests/test_3.json';
import test4 from '../assets/tests/test_4.json';
import test5 from '../assets/tests/test_5.json';
import test6 from '../assets/tests/test_6.json';
import test7 from '../assets/tests/test_7.json';
import test8 from '../assets/tests/test_8.json';
import test9 from '../assets/tests/test_9.json';
import example from '../assets/tests/example.json';

import { TestModel } from './test.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from './shared.service';
import { SubtestModel } from './subtestModel';
const tests = [test1, test2, test3, test4, test5, test6, test7, test8, test9 ].sort(function (a, b) {
  return a.total - b.total;
});


const Config = {
  timeForTestSet: 5 * 60, //five minutes is 300 seconds!
  testSetSize: tests.length
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  config;
  currentTest: TestModel = null;
  currentTestCounter = 0;
  score = 0;
  maximalScore = 0;
  timer = '5:00';
  timerProgress = 100;
  resultData = new Map<number, any>();
  name;
  iq;
  currentResults = new Array(9).fill(false);
  private timerInterval;
  private currentAnswers: string[][] = [];

  constructor(private snackBar: MatSnackBar, private sharedService: SharedService) {
    // Can generate some RANDOM test
    // let gen = this.sharedService.generateTest(22);
    // console.log(gen);
  }

  updateTestResults(results: string[][]) {
    this.currentAnswers = results;
    this.currentResults =  this.currentAnswers.map((    answers, index) => {
      return (answers.length > 0 && SharedService.areResultsEqual(answers, this.currentTest.assignments[index].result));
    });
  }

  assignmentOpened(id: number) {
    this.currentTest.assignments = this.currentTest.assignments.map((ass) => {
      if(ass.id === id){
        ass.opened = true;
      }
      return ass;
    });
  }

  /**
   * This method will initialize the test. It will set a random test from the list of tests to currentTest. It will set the test timer for the test.
   */
  startTheTest() {
    // clear previous test session
    this.score = 0;
    this.maximalScore = 0;
    this.resultData.clear();

    // init test session
    // this.testSet = SharedService.getRandomOrder(Config.testSetSize);
    this.currentTest = this.getTest();
    this.currentResults.fill(false, 0, this.currentTest.assignments.length);

    // init timer
    this.setTestTimer();
  }

  /**
   * This method will end the test. It will count the score, save the results, and reset the test.
   */
  processTheTest() {
    // console.log('All test answers: ', this.currentAnswers);
    // console.log('All test results: ', this.currentTest.assignments.map((ass: SubtestModel) => ass.result));
    // console.log('All test results: ', this.currentResults);
    const oneTestResult = this.countTheTestScore(this.currentResults, this.currentTest);
    this.snackBar.open('Test score:' + oneTestResult, null, {
      duration: 2000,
      verticalPosition: 'top',
    });
    this.resultData.set(this.currentTest.test_id, {score: this.score, answers:  this.currentAnswers, results: this.currentResults, test: this.currentTest})
    this.currentTest = this.getTest();
    if(!this.currentTest) {
      this.endTheSet();
    }
  }

  getTest(): TestModel{
    this.currentTestCounter++;
    return tests[this.currentTestCounter];
  }

  /**
   * This will conclude the testing session.
   */
  endTheSet() {
    // save results to a file
    this.saveTestResults(this.resultData);
    // clear the test session
    this.currentTest = null;
    this.currentTestCounter = 0;
    // stop the timer
    clearInterval(this.timerInterval);
  }

  countTheTestScore(results: boolean[], test: TestModel): string {
    let oneTestResult = 0;
    let oneTestMaximalResult = 0;
    results.forEach((result, index) => {
      if (result) {
        this.score += test.assignments[index].score;
        oneTestResult += test.assignments[index].score;
      }
      this.maximalScore += test.assignments[index].score;
      oneTestMaximalResult += test.assignments[index].score;
    });

    return oneTestResult + "/" + oneTestMaximalResult;
  }

  saveTestResults(data: Map<number, any>) {
    const obj = {};
    for (const item of [...data]) {
      const [
        key,
        value
      ] = item;
      obj[key] = value;
    }
    var a = document.createElement("a");
    document.body.appendChild(a);
    (<any>a).style = "display: none";
    let fileName = `${this.name}_${this.iq}.json`;
    var json = JSON.stringify(obj),
      blob = new Blob([json], {type: "octet/stream"}),
      url = (<any>window).URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    (<any>window).URL.revokeObjectURL(url);
  }

  private setTestTimer() {
    const countDownDate = new Date().getTime() + Config.timeForTestSet * 1000;

// Update the count-down every 1 second
    this.timerInterval = setInterval(() => {

      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the count-down date
      const distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      this.timer = minutes + "m " + seconds + "s ";
      this.timerProgress = (distance / (Config.timeForTestSet * 1000)) * 100;
      // If the count-down is finished, write some text
      if (distance < 0) {
        this.endTheSet()
      }
    }, 1000);

  }
}
