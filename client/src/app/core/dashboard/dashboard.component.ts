import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/user/auth.service';
import { Order, orders } from 'src/assets/mockData';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthService,
  ) { }

  isAuthenticated: any = false;

  ngOnInit(): void {
    this.authService.fireAuth.authState.subscribe(authStatus => this.isAuthenticated = authStatus);

  }


}
