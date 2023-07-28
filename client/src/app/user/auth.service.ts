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

  user: RegisterUser | null = null;

  login(params: LoginUser): Observable<any> {

    return from(this.auth.signInWithEmailAndPassword(
      params.email, params.password
    ));
  }



}
