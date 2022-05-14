import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { SharedService } from './shared.service';

const colors = ['black',  'blue',  'red'];
const numColors = colors.length-1;

@Directive({
  selector: '[appClickColor]'
})
export class ClickColorDirective {
  @Input() color: string = this.getRandomColor();
  @Input() isResult: boolean = false;

  constructor(private doms: DomSanitizer) { }

  @HostBinding('style') get myStyle(): SafeStyle {
    return this.doms.bypassSecurityTrustStyle(`background: ${this.color}`);
  }

  @HostListener('click') onClick() {
    // TODO change for DEV purposes
    if(this.isResult){
      this.color = colors[colors.indexOf(this.color) + 1]
    }
  }

  getRandomColor(): string {
    return colors[SharedService.getRandomInt(numColors)];
  }

}
