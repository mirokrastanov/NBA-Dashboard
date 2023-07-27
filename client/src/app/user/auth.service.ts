import { Injectable } from '@angular/core';
import { RegisterUser } from '../util/user-interfaces';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor() { }

  user: RegisterUser | null = null;




}
