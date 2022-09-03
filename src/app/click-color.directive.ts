import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { SharedService } from './shared.service';

export enum ColorEnum {
  Peignoir = '#efe7d6',
  Alfresco = '#688290',
  Farrow = '#6d6d6d',

}
const colors = ['#efe7d6',  '#688290',  '#6d6d6d'];
const numColors = colors.length - 1;

@Directive({
  selector: '[appClickColor]'
})
export class ClickColorDirective {
  @Input() color: string = this.getRandomColor();
  @Input() isResult: boolean = false;
  @Output() updateValue: EventEmitter<any> = new EventEmitter();

  constructor(private doms: DomSanitizer) { }

  @HostBinding('style') get myStyle(): SafeStyle {
    return this.doms.bypassSecurityTrustStyle(`background: ${this.color}`);
  }

  @HostListener('click') onClick() {
    // TODO change for DEV purposes
    if(this.isResult){
      this.color = colors[colors.indexOf(this.color) + 1];
      this.updateValue.emit(this.color);
    }
  }

  getRandomColor(): string {
    return colors[SharedService.getRandomInt(numColors)];
  }

}
