import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from './user/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {} // implements OnInit {
//   constructor(private authService: AuthService) { }

//   ngOnInit(): void {
//     this.authService.authStatusListener();
//     setTimeout(() => {
//       console.log(this.authService.currentUser);

//     }, 500);

//   }

// }