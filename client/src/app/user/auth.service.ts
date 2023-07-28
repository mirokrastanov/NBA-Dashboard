import { Injectable } from '@angular/core';
import { LoginUser, RegisterUser } from '../util/user-interfaces';
import { Observable, from, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(
    private auth: AngularFireAuth
  ) { }

  // save CURRENT USER
  // add display name during reg
  // also add an option to edit it in their profile


  login(params: LoginUser): Observable<any> {
    return from(this.auth.signInWithEmailAndPassword(
      params.email, params.password
    ));
  }

  register(params: LoginUser): Observable<any> {
    return from(this.auth.createUserWithEmailAndPassword(
      params.email, params.password
    ));
  }

  logout(): void {
    this.auth.signOut();
    localStorage.removeItem('user');
  }
}