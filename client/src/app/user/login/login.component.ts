import { Component } from '@angular/core';
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

  login(form: NgForm): void {
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
      next: () => {
        this.isLoggingIn = false;
        this.errorMessage = null;
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

  recoverPassword(form: NgForm): void {

  }

}
