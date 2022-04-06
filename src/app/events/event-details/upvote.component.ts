import { Component, EventEmitter, Input, Output } from "@angular/core";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeartbeat } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'upvote',
  styleUrls: ['./upvote.component.scss'],
  template: `
    <div class="votingWidgetContainer pointadble" (click)="onClick()">
      <div class="well votingWidget">
        <div class="votingButton">
          <!-- <fa-icon *ngIf="voted" [icon]="faHeart"></fa-icon> -->
          <fa-icon *ngIf="!voted" [icon]="faHeartbeat" [style.color]="iconColor"></fa-icon>
        </div>
        <div class="badge badge-inverse votingCount">
          {{count}}
        </div>
      </div>
    </div>
  `,
})

export class UpvoteComponent {
  @Input() count: number | undefined;
  @Input() set voted(val: boolean) {
    this.iconColor = val ? 'red' : 'blue';
  };
  @Output() vote = new EventEmitter();
  iconColor: string | undefined;

  faHeart = faHeart;
  faHeartbeat = faHeartbeat;

  onClick() {
    this.vote.emit({});
  }
}