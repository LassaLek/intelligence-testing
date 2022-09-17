import { Component } from '@angular/core';
import test1 from '../assets/tests/test_1.json';
import { TestModel } from './test.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from './shared.service';
import { FormControl, Validators } from '@angular/forms';

const Config = {
  timeForTestSet: 60 * 60 //five minutes is 300 seconds! // TODO proper count
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private timerInterval;
  title = 'intelligence-testing';
  currentTest: TestModel = null;
  currentTestCounter = 0;
  score = 0;
  maximalScore = 0;
  timer = '5:00';
  timerProgress = 100;
  resultData = new Map<number, any>();
  name;
  iq;


  private currentResults: boolean[] = [];

  constructor(private snackBar: MatSnackBar) {
  }

  updateTestResults(results: boolean[]) {
    this.currentResults = results;
  }

  /**
   * This method will initialize the test. It will set a random test from the list of tests to currentTest. It will set the test timer for the test.
   */
  startTheTest() {

    // TODO Pick a random test from the list of tests
    this.currentTest = test1[SharedService.getRandomInt(test1.length)];
    this.currentResults.fill(false, 0, this.currentTest.assignments.length);

    this.setTestTimer();
  }

  /**
   * This method will end the test. It will count the score, save the results, and reset the test.
   */
  processTheTest() {
    this.countTheTestScore(this.currentResults, this.currentTest);
    this.snackBar.open('Test score:' + this.score + "/"  + this.maximalScore, null, {
      duration: 2000,
      verticalPosition: 'top',
    });
    console.log('AppComponent testResult:', this.score);
    this.resultData.set(this.currentTestCounter, {score: this.score, results: this.currentResults, id: this.currentTest.test_id})
    // TODO switch test
    this.currentTestCounter++;
    this.currentTest = test1[SharedService.getRandomInt(test1.length)];
    // TODO end the test after XXX
    if(this.currentTestCounter > 3) {
      this.endTheSet();
    }
  }

  /**
   * This will conclude the testing session.
   */
  endTheSet() {
    // save results to a file
    // TODO proper map mapping
    this.saveTestResults(this.resultData);
    // clear the test session
    this.currentTest = null;
    this.currentTestCounter = 0;
    // stop the timer
    clearInterval(this.timerInterval);
  }


  // TODO - to service
  countTheTestScore(results: boolean[], test: TestModel): void {
    results.forEach((result, index) => {
      if (result) {
        this.score += test.assignments[index].score;
      }
      this.maximalScore += test.assignments[index].score;
    });
  }

  // TODO - log + to service
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
