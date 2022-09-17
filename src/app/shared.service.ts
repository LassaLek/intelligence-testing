import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

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


}
