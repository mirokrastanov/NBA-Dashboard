import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterUser } from 'src/app/util/user-interfaces';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  registerHandler(form: NgForm): void {
    const value: RegisterUser = form.value;
    if (form.invalid) {
      console.log(form.invalid);
    }
    // add validator conditionals
    // console.log(form.controls['username'].status);
    // console.log(form.controls['email'].status);
    // console.log(form.controls['password'].status);
    // console.log(form.controls['repeatPassword'].status);
    
  }



}
