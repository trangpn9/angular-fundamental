import { Component, Input } from "@angular/core";

@Component({
  selector: 'collapse-well',
  styles: [`
    h4 { cursor: pointer }
  `],
  template: `
    <!-- Example for simple ng-content -->
    <!-- <h4 (click)="toggleContent()">{{sessionName}}</h4>
    <ng-content *ngIf="visible"></ng-content> -->

    <!-- Example for multiple ng-content -->
    <div (click)="toggleContent()">
      <h4>
        <ng-content select="[well-title]"></ng-content>
      </h4>
      <ng-content select="[well-body]" *ngIf="visible"></ng-content>
    </div>
  `
})

export class CollapseWellComponent {
  @Input() sessionName!:string;
  visible = false;

  toggleContent() {
    this.visible = !this.visible;
  }
}