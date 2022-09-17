import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { SharedService } from './shared.service';

export enum ColorEnum {
  a = '#efe7d6', // Peignoir
  b = '#688290', // Alfresco
  c = '#6d6d6d', // Farrow

}
const colors = Object.keys(ColorEnum);
const numColors = colors.length - 1;

@Directive({
  selector: '[appClickColor]'
})
export class ClickColorDirective {
  @Input() colorCode = this.getRandomColor();
  @Input() isResult: boolean = false;
  @Output() updateValue: EventEmitter<any> = new EventEmitter();

  constructor(private doms: DomSanitizer) { }

  @HostBinding('style') get myStyle(): SafeStyle {
    return this.doms.bypassSecurityTrustStyle(`background: ${ColorEnum[this.colorCode] || 'white'}; ${(this.isResult ? 'cursor: pointer;' : '')}`);
  }

  @HostListener('click') onClick() {
    if(this.isResult){
      this.colorCode = colors[colors.indexOf(this.colorCode) + 1];
      this.updateValue.emit(this.colorCode);
    }
  }

  getRandomColor(): string {
    return colors[SharedService.getRandomInt(numColors)];
  }

}
