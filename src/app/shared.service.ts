import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  static getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  static areResultsEqual(result1: string[], result2: string[]): boolean {
    return result1.every((value, index) => value === result2[index]);
  }


}
