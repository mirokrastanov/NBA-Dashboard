import { Injectable } from '@angular/core';
import { LoginUser, RegisterUser } from '../util/user-interfaces';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(
    public fireAuth: AngularFireAuth,
    private router: Router,
  ) {
    this.authStatusListener();
  }

  isAuthenticated: boolean = this.fireAuth.currentUser != null ? true : false;
  currentUser: any = undefined;

  authStatusListener(): void {
    this.fireAuth.onAuthStateChanged(async (credential) => {
      if (credential) {
        this.isAuthenticated = true;
        this.currentUser = credential;
        localStorage.setItem('user', JSON.stringify(credential));
        if (!localStorage.getItem('user')) {
          console.log(credential);
          console.log('User is logged in');
        }
      } else {
        this.isAuthenticated = false;
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
    this.router.navigate(['/dashboard']);
  }

  recoverPassword(email: string): Observable<void> {
    return from(this.fireAuth.sendPasswordResetEmail(email));
  }

  async sendVerificationEmail(): Promise<any> {
    return (await this.fireAuth.currentUser)?.sendEmailVerification();
  }
}