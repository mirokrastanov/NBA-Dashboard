import { Injectable } from '@angular/core';
import { LoginUser, RegisterUser } from '../util/user-interfaces';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(
    public fireAuth: AngularFireAuth
  ) { this.authStatusListener(); }

  currentUser: any = undefined;
  private authStatusSub = new BehaviorSubject(this.currentUser);
  currentAuthStatus = this.authStatusSub.asObservable();

  authStatusListener(): void {
    this.fireAuth.onAuthStateChanged((credential) => {
      if (credential) {
        if (!localStorage.getItem('user')) {
          console.log(credential);
          this.authStatusSub.next(credential);
          localStorage.setItem('user', JSON.stringify(credential));
          console.log('User is logged in');
        }
      } else {
        this.authStatusSub.next(null);
        if (localStorage.getItem('user')) {
          localStorage.removeItem('user');
          console.log('User is logged out');
        }
      }
    })
  }

  login(params: LoginUser): Observable<any> {
    return from(this.fireAuth.signInWithEmailAndPassword(
      params.email, params.password
    ));
  }

  register(params: LoginUser): Observable<any> {
    return from(this.fireAuth.createUserWithEmailAndPassword(
      params.email, params.password
    ));
  }

  async updateProfile(params: any): Promise<any> {
    return (await this.fireAuth.currentUser)?.updateProfile(params);
  }

  logout(): void {
    this.fireAuth.signOut();
    localStorage.removeItem('user');
  }
}