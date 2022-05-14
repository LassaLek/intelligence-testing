import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  static getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }
}
