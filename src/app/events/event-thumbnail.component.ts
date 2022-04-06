import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEvent } from './shared';

@Component({
  selector: 'event-thumbnail',
  template: `
    <div class="card">
      <img [src]="event?.imageUrl" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">{{event?.name | uppercase}}</h5>
        <div [ngSwitch]="event?.time" class="well" [class.txt-red]="event?.time === '8:00 AM'">
          <small *ngSwitchCase="'8:00 AM'">Early start</small>
          <small *ngSwitchCase="'10:00 AM'">Late start</small>
          <small *ngSwitchDefault>Normal start</small>
        </div>
        <ul class="list-group">
          <li class="list-group-item" *ngIf="event?.location">      
            <small class="text-muted">Location: {{event?.location?.address}}, {{event?.location?.city}}, {{event?.location?.country}}</small>
          </li>
          <li class="list-group-item" *ngIf="event?.onlineUrl">
            <small class="text-muted">{{event?.onlineUrl}}</small>
          </li>
        </ul>
        <button class="btn btn-primary mt-3" (click)="handleClickMe()" [routerLink]="['/events', event?.id]">
          Read more!
        </button>
      </div>
      <div class="card-footer">
        <small [ngClass]="setClassCSS()" class="float-left">Price: {{event?.price | currency:'USD'}}</small>
        <small class="text-muted float-right">{{event?.time}} | {{event?.date | date:'dd/mm/yyyy'}}</small>
      </div>
    </div>
  `,
  styles: [`
    .txt-red { color: red }
    .list-group-item { padding: 0.75rem 0.5rem }
    .list-group-item small { width:100%; display: block; }
  `]
})

export class EventThumbnailComponent {
  @Input() event: IEvent | undefined;
  @Output() eventClick = new EventEmitter();

  handleClickMe() {
    this.eventClick.emit(this.event?.name);
  }

  setClassCSS() {
    // [ngClass] well read string 'name_class1 name_class2' or ['name_class1', 'name_class2'] or {name_class1: true/false, name_class2: true/false}
    if (this.event?.time === '8:00 AM')
      return 'text-primary'
    return 'text-muted' 
  }
}