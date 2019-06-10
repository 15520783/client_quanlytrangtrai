import { Directive, ElementRef, Input, Renderer } from '@angular/core';
import { DomController, Platform } from 'ionic-angular';

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

  constructor(public element: ElementRef, public renderer: Renderer , public platform : Platform, public DomCtrl: DomController) {
    console.log('Hello HideHeaderDirective Directive');
  }

  ngOnInit() {
      // this.renderer.setElementStyle(this.header, 'transition', 'max-height 700ms ease-out');
      // this.scrollContent = this.element.nativeElement.getElementsByClassName("scroll-content")[0];
      // this.renderer.setElementStyle(this.scrollContent, 'transition', 'margin-top 700ms ease-out');
  }

  onContentScroll(event) {
      // if (event.scrollTop > 20) {
      //   this.DomCtrl.write(()=>{
      //     this.renderer.setElementStyle(this.header, "max-height", "0px");
      //     this.renderer.setElementStyle(this.scrollContent, "margin-top", "18vH");
      //     this.renderer.setElementStyle(this.title, 'text-align', 'left');
      //   })
      // } else {
      //   this.DomCtrl.write(()=>{
      //     this.renderer.setElementStyle(this.header, "max-height", "15vH");
      //     this.renderer.setElementStyle(this.scrollContent, "margin-top", "31vH");
      //     this.renderer.setElementStyle(this.title, 'text-align', 'center');
      //   })
      // }
  }
}
