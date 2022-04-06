import { Directive, ElementRef, Inject, Input, OnInit } from "@angular/core";
import { JQ_TOKEN } from "./jQuery.service";

@Directive({
  selector: '[modal-trigger]'
})

export class ModalTriggerDirectvie implements OnInit {
  @Input('modal-trigger') modalId: string | undefined;
  private el: HTMLElement;

  constructor(
    ref: ElementRef,
    @Inject(JQ_TOKEN) private $: any
  ) {
    this.el = ref.nativeElement;
  }

  ngOnInit() { 
    this.el.addEventListener('click', e => {
      this.$(`#${this.modalId}`).modal({});
    });
  }

}