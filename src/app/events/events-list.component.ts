import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeartbeat, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { IEvent } from './shared';


@Component({
  selector: 'events-list',
  templateUrl: './events-list.component.html',
})
export class EventsListComponent implements OnInit {
  events: IEvent[] | undefined;
  faHeart = faHeart;
  faHeartbeat = faHeartbeat;
  faHeartBroken = faHeartBroken;

  constructor(
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.events = this._route.snapshot.data['events'];
  }

  handleEventClickMe(data: string) {
    console.log('Recevied: ', data);
  }
}
