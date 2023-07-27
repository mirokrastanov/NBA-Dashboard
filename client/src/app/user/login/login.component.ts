import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginUser } from 'src/app/util/user-interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  loginHandler(form: NgForm): void {
    const value: LoginUser = form.value;
    if (form.invalid) {
      console.log(form.invalid);
    }
    // add validator conditionals
    console.log(form.controls['email'].status);
    console.log(form.controls['password'].status);
    


  }

}
