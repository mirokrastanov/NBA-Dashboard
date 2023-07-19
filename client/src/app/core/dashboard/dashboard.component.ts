import { Component } from '@angular/core';
import { Order, orders } from 'src/assets/mockData';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  orders: Order[] = orders;

}
