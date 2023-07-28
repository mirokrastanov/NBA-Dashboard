import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/util/user-interfaces';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  isLoggingIn: boolean = false;

  login(form: NgForm): void {
    // const value: LoginUser = form.value;
    // if (form.invalid) {
    //   console.log(form.invalid);
    // }
    // console.log(form.controls['email'].value);



    this.isLoggingIn = true;

    this.authService.login({
      email: form.controls['email'].value,
      password: form.controls['password'].value,
    }).subscribe(
      (next: any) => {
        this.isLoggingIn = false;
        this.router.navigate(['/dashboard']);
      },
      (error: any) => {
        this.isLoggingIn = false;
        // show error.message
      })
  }

  recoverPassword(form: NgForm): void {

  }

}
