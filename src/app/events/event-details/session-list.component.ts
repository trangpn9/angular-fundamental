import { Component, Input, OnChanges } from "@angular/core";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faFire, faFireAlt } from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "src/app/user/auth.service";
import { ISession } from "../shared";
import { VoterService } from "./vote.service";

@Component({
  selector: 'session-list',
  templateUrl: './session-list.component.html'
})

export class SessionListComponent implements OnChanges {
  @Input() sessions: ISession[] | undefined;
  @Input() filterBy!: string;
  @Input() sortBy: string | undefined;
  @Input() eventId!: number;
  faHeart = faHeart;
  faFireAlt = faFireAlt;

  visibilitySessions: ISession[] | undefined;

  constructor(public auth: AuthService, private voterService: VoterService) {}

  ngOnChanges() {
    if(this.sessions) {
      this.filterSessions(this.filterBy);
      this.sortBy === 'name' ? this.visibilitySessions?.sort(sortByNameAsc) : this.visibilitySessions?.sort(sortByVotesDesc);
    }

  }

  filterSessions(level: string): void {
    if (level === 'all') {
      this.visibilitySessions = this.sessions?.slice(0);
    } else {
      this.visibilitySessions = this.sessions?.filter(session => session.level.toLocaleLowerCase() === level)
    }
  }

  toggleVote(session: ISession) {
    if (this.userHasVoted(session)) {
      this.voterService.deleteVoter(this.eventId, session, this.auth.currentUser!.userName);
    } else {
      this.voterService.addVoter(this.eventId, session, this.auth.currentUser!.userName);
    }

    if (this.sortBy === 'votes') {
      this.visibilitySessions?.sort(sortByVotesDesc);
    }
  }

  userHasVoted(session: ISession) {
    return this.voterService.userHasVoted(session, this.auth.currentUser!.userName)
  }
}

function sortByNameAsc(s1: ISession, s2: ISession): number {
  if (s1.name > s2.name) return 1;
  else if (s1.name === s2.name) return 0;
  else return -1;
}

function sortByVotesDesc(s1: ISession, s2: ISession): number {
  return s2.voters.length - s1.voters.length;
}