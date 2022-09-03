import { Component } from '@angular/core';
import test1 from '../assets/tests/test_1.json';
import { TestModel } from './test.model';

const Config = {
  timeForTestSet: 1 * 60 //five minutes is 300 seconds! - TODO proper is 5 minutes
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
  score = 0;
  timer = '5:00';
  timerProgress = 100;

  private currentResults: boolean[] = [];

  updateTestResults(results: boolean[]) {
    this.currentResults = results;
  }

  /**
   * This method will initialize the test. It will set a random test from the list of tests to currentTest. It will set the test timer for the test.
   */
  startTheTest() {

    // TODO Pick a random test from the list of tests
    this.currentTest = test1[0]; //tests[SharedService.getRandomInt(tests.length)];

    // TODO Initiate the test - results, score, ...

    // TODO set the test timer
    this.setTestTimer();
  }

  /**
   * This method will end the test. It will count the score, save the results, and reset the test.
   */
  processTheTest() {

    // TODO count the score - not all correct, more tries


    // TODO - some score ALERT - modal - TOAST

    let testResult = this.countTheTestScore(this.currentResults, this.currentTest);
    alert('Test score: ' + testResult);
    console.log('AppComponent testResult:', testResult);

    // TODO switch test
    this.currentTest = test1[1];
  }

  /**
   * This will conclude the testing session.
   */
  endTheSet() {

    // TODO save results to a file
    // this.saveTestResults({totalScore: this.score, results: this.currentResults});

    this.currentTest = null;
    // TODO stop the timer
    clearInterval(this.timerInterval);
  }


  // TODO - to service
  countTheTestScore(results: boolean[], test: TestModel): number {
    results.forEach((result, index) => {
      if (result) {
        this.score += 10;
      }
    });
    return this.score;
  }

  // TODO - log + to service
  saveTestResults(data) {
    var a = document.createElement("a");
    document.body.appendChild(a);
    (<any>a).style = "display: none";
    let fileName = "my-download.json";
    var json = JSON.stringify(data),
      blob = new Blob([json], {type: "octet/stream"}),
      url = (<any>window).URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    (<any>window).URL.revokeObjectURL(url);
  }

  private setTestTimer() {
    const countDownDate = new Date().getTime() + Config.timeForTestSet * 1000;

// Update the count down every 1 second
    this.timerInterval = setInterval(() => {

      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      const distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      this.timer = minutes + "m " + seconds + "s ";
      this.timerProgress = (distance / (Config.timeForTestSet * 1000)) * 100;
      console.log('AppComponent minutes:', minutes);
      console.log('AppComponent seconds:', seconds);
      // If the count down is finished, write some text
      if (distance < 0) {
        this.endTheSet()
      }
    }, 1000);

  }
}
