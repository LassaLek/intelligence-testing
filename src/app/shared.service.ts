import { Injectable } from '@angular/core';
import { SubtestTypeEnum } from './subtest.type.enum';
import { ColorEnum } from './click-color.directive';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  colorOption = Object.keys(ColorEnum);

  constructor() { }

  static getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  static getRandomOrder(max: number): number[] {
    var nums = Array(max).join().split(',').map(function(a){return this.i++},{i:1}),
      ranNums = [],
      i = nums.length,
      j = 0;

    while (i--) {
      j = Math.floor(Math.random() * (i+1));
      ranNums.push(nums[j]);
      nums.splice(j,1);
    }
    return ranNums;
  }

  static areResultsEqual(result1: string[], result2: string[]): boolean {
    return result1.every((value, index) => value === result2[index]);
  }

  generateTest(id) {
    return {
      "test_id": id,
      "test_type": "generated",
      "assignments": this.generateAssignments()
    }
  }

  generateAssignments() {
    var assignments = [];
    for (var i = 0; i < 9; i++) {
      assignments.push(this.generateAssignment(i));
    }
    return assignments;
  }

  private generateAssignment(index: number) {
    const types = Object.keys(SubtestTypeEnum);
    const testType = types[Math.floor(Math.random() * types.length)]
    let generated;
    if(testType === SubtestTypeEnum.ColorSwitch) {
      generated = this.generateColorSwitchAssignment();
    } else if(testType === SubtestTypeEnum.ColorSwitchAdvanced) {
      generated = this.generateColorSwitchAdvancedAssignment();
    } else if(testType === SubtestTypeEnum.Move) {
      generated = this.generateMoveAssignment();
    }
    else if(testType === SubtestTypeEnum.ColorSwitchAndMove) {
      generated = this.generateColorSwitchAndMoveAssignment();
    }  else if(testType === SubtestTypeEnum.PositionSwitch) {
      generated = this.generatePositionSwitchAssignment();
    } else {
      generated = this.generateCTestAssignment()
    }

    return {
      id: index + 1,
      type: testType,
      ...generated,
      score: this.countOffset(generated)
    }

  }

  private generateColorSwitchAssignment() {
    const assignment = Array(9).fill("a").map(() => this.colorOption[SharedService.getRandomInt(this.colorOption.length)]);

    // a -> b
    // b -> a
    return {
      boxes: assignment,
      result: assignment.map((color) =>
      {
        if(color === "a") {
          return "b";
        } else if(color === "b") {
          return "a";
        }
        return color;

      }),
    }
  }

  private generateColorSwitchAdvancedAssignment() {
    const assignment = Array(9).fill("a").map(() => this.colorOption[SharedService.getRandomInt(this.colorOption.length)]);

    // a -> b
    // b -> c
    return {
      boxes: assignment,
      result: assignment.map((color) =>
      {
        if(color === "a") {
          return "b";
        } else if(color === "b") {
          return "c";
        }
        return color;

      }),
    }
  }

  /**
   * Move by three positions
   * @private
   */
  private generateMoveAssignment() {
    const randomColor = "a";
    const randomFill = "c";
    const assignment = Array(9).fill(randomFill);
    const randPosition = SharedService.getRandomInt(assignment.length);
    const randomLength = SharedService.getRandomInt(assignment.length - randPosition);


    for(let i = randPosition; i < randPosition + randomLength; i++) {
      assignment[i] = randomColor;
    }
    // a -> b
    // b -> c

    let results = [...assignment];
    results.unshift(randomFill, randomFill, randomFill);

    return {
      boxes: assignment,
      result: results.slice(0, -3),
    }
  }

  /**
   * Move by three positions
   * @private
   */
  private generateColorSwitchAndMoveAssignment() {
    let { boxes, result } = this.generateMoveAssignment()

    return {
      boxes: boxes,
      result: result.map((color) =>{
        if(color === "a") {
          return "b";
        }
        return color;
      })
    }
  }

  private generatePositionSwitchAssignment() {
    return {
      boxes: ['b', 'b', 'c', 'c', 'b', 'b', 'b', 'a', 'a'],
      result: ['b', 'b', 'a', 'a', 'b', 'b', 'b', 'c', 'c'],
    }
  }

  private generateCTestAssignment() {
    const assignment = Array(9).fill(this.colorOption[SharedService.getRandomInt(this.colorOption.length)]);
    let result = [...assignment];
    for(let i = assignment.length - 1; i >= assignment.length - SharedService.getRandomInt(assignment.length); i--) {
      assignment[i] = null;
    }
    return {
      boxes: assignment,
      result: result,
    }
  }

  private countOffset(generated) {
    let score = 0;
    for (let i = 0; i < generated.result.length; i++) {
      if (generated.boxes[i] !== generated.result[i]) {
        score++;
      }
    }
    return score
  }

}
