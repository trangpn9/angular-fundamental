import { Component } from '@angular/core';
import { EventService, ISession } from '../events';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html'
})

export class NavBarComponent {
  searchTerm = '';
  findSessions?: ISession[];

  constructor(public authService:AuthService, private eventService: EventService) {}

  searchSessions(searchTerm: string) {
    this.eventService.searchSessions(searchTerm).subscribe((sessions:ISession[]) => {
      this.findSessions = sessions;
    });
  }

}