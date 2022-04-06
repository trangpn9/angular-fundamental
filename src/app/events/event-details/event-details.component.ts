import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { IEvent, ISession } from "../shared";
import { EventService } from "../shared/event.service";

@Component({
  selector: 'event-details',
  templateUrl: './event-details.component.html',
})

export class EventDetailsComponent implements OnInit{
  event!: IEvent;
  addMode = false;
  filterBy = 'all';
  sortBy = 'name';

  constructor(
    private _eventService: EventService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._route.data.forEach(data => {
      this.event = data['event'];
      this.addMode = false;
    })
    // this._route.params.forEach((params: Params) => {
      // this._eventService.getEventById(+params['id'])?.subscribe((event: IEvent) => {
      //   this.event = event;
      // });
    // })
  }

  addSession() {
    this.addMode = !this.addMode;  
  }

  handleSaveSession(session:ISession) {
    const nextId = Math.max.apply(null, this.event!.sessions.map(s => s.id));
    session.id = nextId;

    this.event?.sessions.push(session);
    this._eventService.saveEvent(this.event).subscribe();
    this.addMode = false;
  }

  canselAddSession() {
    this.addMode = false;
  }
}