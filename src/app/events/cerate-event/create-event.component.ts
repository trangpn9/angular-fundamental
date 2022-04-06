import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { EventService } from "../shared";

@Component({
  selector: 'create-event',
  templateUrl: './create-event.component.html',
  styles: [`
    em {float: right; color: #E05C65;}
    .error input { background-color: #E3C3E5 }
    .error ::-webkit-input-placeholder { color: #999999 }
    .error ::-moz-placeholder { color: #999999 }
    .error :-webkit-input-placeholder { color: #999999 }
    .error :ms-input-placeholder { color: #999999 }
  `]
})

export class CreateEventComponent {
  newEvent: any;
  isDirty = true;
  constructor(private _route: Router, private _eventService: EventService) {}

  handleCancel() {
    this._route.navigate(['/events'])
  }

  saveEvent(formValues: any) {
    // console.log('Test value: ', formValues);
    this._eventService.saveEvent(formValues).subscribe(() => {
      this.isDirty = false;
      this._route.navigate(['/events'])
    });
  }

}