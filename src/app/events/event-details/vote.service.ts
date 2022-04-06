import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { ISession } from "../shared";

@Injectable()

export class VoterService { 
  constructor(private http: HttpClient) {}
  
  deleteVoter(eventId: number, session: ISession, voteName: string ) {
    session.voters = session.voters.filter(voter => voter !== voteName);

    const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voteName}`; 
    this.http.delete(url)
      .pipe(catchError(this.handleError('addVoter')))
      .subscribe();
  }

  addVoter(eventId: number, session: ISession, voteName: string) { 
    session.voters.push(voteName);

    const options = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };
    const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voteName}`; 
    this.http.post(url, {}, options)
      .pipe(catchError(this.handleError('addVoter')))
      .subscribe();
  }

  userHasVoted(session: ISession, voteName: string) {
    return session.voters.some(voter => voter === voteName);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }  
}