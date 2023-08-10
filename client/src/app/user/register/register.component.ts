import { Component } from '@angular/core';
import { AbstractControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser, RegisterUser } from 'src/app/util/user-interfaces';
import { AuthService } from '../auth.service';
import { Database, set, ref, update } from '@angular/fire/database';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    public database: Database,
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
        // response.user.updateProfile({ displayName: formUsername.value });
        this.authService.authStatusListener();
        this.authService.updateProfile({ displayName: formUsername.value });
        this.authService.sendVerificationEmail();
        localStorage.setItem('user', JSON.stringify(response.user));
        set(ref(this.database, 'users/' + response.user.uid), {
          name: formUsername.value,
          email: formEmail.value,
          uid: response.user.uid,
          favorites: {
            players: {
              service: true,
            },
            teams: {
              service: true,
            },
          },
        });
        form.reset();
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

  togglePassVisibility(e1: HTMLInputElement, e2: HTMLInputElement): void {
    if (e1.getAttribute('type') == 'password') {
      e1.setAttribute('type', 'text');
      e2.setAttribute('type', 'text');
    } else {
      e1.setAttribute('type', 'password');
      e2.setAttribute('type', 'password');
    }
  }
}
