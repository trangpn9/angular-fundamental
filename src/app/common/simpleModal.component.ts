import { Component, ElementRef, Inject, Input, ViewChild } from "@angular/core";
import { JQ_TOKEN } from "./jQuery.service";

@Component({
  selector: 'simple-modal',
  template: `
    <div id="{{elementId}}" #modalContainer class="modal flade" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4>{{title}}</h4>
            <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
          </div>
          <div class="modal-body" (click)="closeModal()">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-body {
      height: 350px;
      overflow-y: scroll;
    } 
  `]
})

export class SimpleModalComponent {
  @Input() title: string | undefined;
  @Input() elementId: string | undefined;
  @Input() closeOnBodyClick: string | undefined;
  @ViewChild('modalContainer') containerEl!: ElementRef;

  constructor(@Inject(JQ_TOKEN) private $:any) {}

  closeModal() {
    if (this.closeOnBodyClick?.toLocaleLowerCase() === "true") {
      this.$(this.containerEl.nativeElement).modal('hide');
    }
  }
}