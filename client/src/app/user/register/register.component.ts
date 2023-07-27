import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  registerHandler(form: NgForm): void {
    console.log(form.value);
  }

}
