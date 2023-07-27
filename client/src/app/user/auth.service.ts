import { Injectable } from '@angular/core';


interface User {
  username: string,
  email: string,
  password: string,
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor() { }

  user: User | null = null;




}
