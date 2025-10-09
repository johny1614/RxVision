import {ElementRef, Renderer2} from '@angular/core';

export abstract class BaseComponent {
  constructor(protected el: ElementRef, protected renderer: Renderer2) {
  }

  // TODO wygenerowane, moze zle dzialac - trzeba sprawdzic i napisac unity

  protected setHostStyles(styles: Record<string, string | number | null | undefined>) {
    for (const [prop, val] of Object.entries(styles)) {
      if (val === null || val === undefined || val === '') {
        this.renderer.removeStyle(this.el.nativeElement, prop);
      } else {
        this.renderer.setStyle(this.el.nativeElement, prop, typeof val === 'number' ? `${val}px` : val);
      }
    }
  }

  protected setHostClasses(classes: string[] | Record<string, boolean>) {
    if (Array.isArray(classes)) {
      classes.forEach(c => this.renderer.addClass(this.el.nativeElement, c));
    } else {
      for (const [cls, on] of Object.entries(classes)) {
        on ? this.renderer.addClass(this.el.nativeElement, cls)
          : this.renderer.removeClass(this.el.nativeElement, cls);
      }
    }
  }

  private px(n?: number | null) {
    return n == null ? null : `${n}px`;
  }
}
