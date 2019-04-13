import { Directive, Input, Renderer, ElementRef } from '@angular/core';
import { Platform } from 'ionic-angular';

/**
 * Generated class for the HideHeaderDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[hide-header]', // Attribute selector
  host: {
    '(ionScroll)': 'onContentScroll($event)'
  }
})
export class HideHeaderDirective {

  @Input("header") header: HTMLElement;
  @Input("title") title: HTMLElement;

  headerHeight;
  scrollContent

  constructor(public element: ElementRef, public renderer: Renderer , public platform : Platform) {
    console.log('Hello HideHeaderDirective Directive');
  }

  ngOnInit() {
      this.headerHeight = this.header.clientHeight;
      // this.renderer.setElementStyle(this.header, 'webkitTransition', 'top 700ms');
      this.renderer.setElementStyle(this.header, 'transition', 'max-height 700ms ease-out');
      this.scrollContent = this.element.nativeElement.getElementsByClassName("scroll-content")[0];
      this.renderer.setElementStyle(this.scrollContent, 'transition', 'margin-top 700ms ease-out');
  }

  onContentScroll(event) {
      if (event.scrollTop > 20) {
        this.renderer.setElementStyle(this.header, "max-height", "0px")
        this.renderer.setElementStyle(this.scrollContent, "margin-top", "18vH")
        this.renderer.setElementStyle(this.title, 'text-align', 'left');
        this.renderer.setElementStyle(this.title, 'padding-left', '50px');
      } else {
        this.renderer.setElementStyle(this.header, "max-height", "15vH");
        this.renderer.setElementStyle(this.scrollContent, "margin-top", "31vH");
        this.renderer.setElementStyle(this.title, 'text-align', 'center');
        this.renderer.setElementStyle(this.title, 'padding-left', '0');
      }
  }
}
