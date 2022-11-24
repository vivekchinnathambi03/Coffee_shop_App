import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
//import { loadOrders } from '../state/actions';
// import { order } from '../state/models';
// import { getOrders } from '../state/selector';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
   links = [
    { title: 'Dashboard', fragment: '/' },
    { title: 'Order Details', fragment: '/orderDetails' },
    { title: 'Price List', fragment: '/priceList' }
  ];
  constructor(public route: ActivatedRoute){}

  ngOnInit(): void {

  }

}
