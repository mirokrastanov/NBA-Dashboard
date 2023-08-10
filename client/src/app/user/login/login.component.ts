import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, NgForm } from '@angular/forms';
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

  errorMessage: string | null = null;
  isLoggingIn: boolean = false;
  isRecoveringPassword: boolean = false;

  onLogin(form: NgForm): void {
    const formEmail: AbstractControl<any> = form.controls['email'];
    const formPassword: AbstractControl<any> = form.controls['password'];
    const params: LoginUser = {
      email: formEmail.value,
      password: formPassword.value,
    };
    this.isLoggingIn = true;
    this.errorMessage = null;

    if (params.email == '' || params.password == '') this.errorMessage = 'Inputs cannot be empty';
    else if (!formEmail.valid) this.errorMessage = 'Invalid Email';
    else if (!formPassword.valid) this.errorMessage = 'Password must be 6 or more characters';

    if (this.errorMessage != null) {
      setTimeout(() => { this.errorMessage = null }, 5000);
      setTimeout(() => { this.isLoggingIn = false }, 1000);
      return;
    }

    this.authService.login(params).subscribe({
      next: (response) => {
        this.isLoggingIn = false;
        this.errorMessage = null;
        form.reset();
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoggingIn = false;
        this.errorMessage = err.message;
        setTimeout(() => { this.errorMessage = null }, 5000);
      },
      complete: () => { }
    });
  }

  onRecoverPassword(form: NgForm): void {
    this.isRecoveringPassword = true;
    this.authService.recoverPassword(form.controls['email'].value).subscribe({
      next: (response) => {
        this.isRecoveringPassword = false;
        this.errorMessage = null;
        form.reset();
        alert('Success! You can recover your password in your email account.');
      },
      error: (err) => {
        this.isRecoveringPassword = false;
        this.errorMessage = err.message;
        setTimeout(() => { this.errorMessage = null }, 5000);
      },
      complete: () => { }
    });
  }

  togglePassVisibility(e1: HTMLInputElement): void {
    if (e1.getAttribute('type') == 'password') {
      e1.setAttribute('type', 'text');
    } else {
      e1.setAttribute('type', 'password');
    }
  }
}
