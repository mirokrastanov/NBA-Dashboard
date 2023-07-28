import { Component } from '@angular/core';
import { AbstractControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser, RegisterUser } from 'src/app/util/user-interfaces';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }
  errorMessage: string | null = null;
  isLoggingIn: boolean = false;

  onRegister(form: NgForm): void {
    const formUsername: AbstractControl<any> = form.controls['username'];
    const formEmail: AbstractControl<any> = form.controls['email'];
    const formPassword: AbstractControl<any> = form.controls['password'];
    const formRepeatPassword: AbstractControl<any> = form.controls['repeatPassword'];
    const params: LoginUser = {
      email: formEmail.value,
      password: formPassword.value,
    };
    this.isLoggingIn = true;
    this.errorMessage = null;

    if (params.email == '' || params.password == '' || formUsername.value == ''
      || formRepeatPassword.value == '') this.errorMessage = 'Inputs cannot be empty';
    else if (!formUsername.valid) this.errorMessage = 'Username must be 8 or fewer characters';
    else if (!formEmail.valid) this.errorMessage = 'Invalid Email';
    else if (!formPassword.valid) this.errorMessage = 'Password must be 6 or more characters';
    else if (!formRepeatPassword.valid || formRepeatPassword.value != formPassword.value) this.errorMessage = 'Passwords must match';
    else if (form.invalid) {
      this.errorMessage = 'Invalid inputs';
      return;
    }

    if (this.errorMessage != null) {
      setTimeout(() => { this.errorMessage = null }, 5000);
      setTimeout(() => { this.isLoggingIn = false }, 1000);
      return;
    }
    
    this.authService.register(params).subscribe({
      next: (response) => {
        this.isLoggingIn = false;
        this.errorMessage = null;
        this.authService.authStatusListener();
        this.authService.updateProfile({
          displayName: formUsername.value,
        });
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


}
