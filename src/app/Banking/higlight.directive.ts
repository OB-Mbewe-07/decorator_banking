import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appHighlight]',
    standalone: true
})
export class HighlightDirective {

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    @HostListener('mouseenter')
    onMouseEnter(): void {
        this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(-3px)');
        this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 8px 20px rgba(0,0,0,0.12)');
    }

    @HostListener('mouseleave')
    onMouseLeave(): void {
        this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(0)');
        this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 2px 8px rgba(0,0,0,0.06)');
    }
}