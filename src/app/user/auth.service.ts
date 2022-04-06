import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs/internal/observable/of";
import { catchError, tap } from "rxjs/operators";
import { IUser } from "./user.model";

@Injectable()

export class AuthService {
  currentUser: IUser | undefined;

  constructor(private http: HttpClient) {}

  loginUser(userName: string, password: string) {
    // this.currentUser = {
    //   id: 1,
    //   userName: userName,
    //   firstName: 'Jackie',
    //   lastName: 'Trang'
    // }

    let loginInfo = { username: userName, password: password };
    const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

    return this.http.post('/api/login', loginInfo, options)
      .pipe(tap((data: any) => {
        this.currentUser = <IUser>data['user'];
      }))
      .pipe(catchError((err) => {
        return of (false);
      }));
  }

  isAuthenticated() {
    return !!this.currentUser;
  }
  
  checkAuthenticationStatus() {
    this.http.get('/api/currentIdentity')
      .pipe(tap(data => {
        if(data instanceof Object) {
          this.currentUser = <IUser>data;
        }
      }))
      .subscribe();
  }

  updateCurrentUser(firstName: string, lastName:string) {
    this.currentUser!.firstName = firstName;
    this.currentUser!.lastName = lastName;
    // this.currentUser = {...this.currentUser, userName: firstName, firstName, lastName};
    const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post(`/api/users/${this.currentUser?.id}`, this.currentUser, options);
  }

  logout() {
    this.currentUser = undefined;

    const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post('/api/logout', {}, options);
  }
}