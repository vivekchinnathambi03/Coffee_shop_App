import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { forkJoin, take } from 'rxjs';
import { GlobalService } from '../app.service';
import { getData } from '../store/loadData.actions';
import { selectData } from '../store/loadData.reducers';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    orderDetails: any = [];
    priceDetailsList: any = [];
    priceDetails: any = {};
    paymentsList: any = [];
    paymentDetails: any = {};
    resultArray: any = [];
    payments: any = [];
    constructor(
        private store: Store<{
            data: { prices: any[]; orders: any[]; payments: any[] };
        }>
    ) { }
    ngOnInit(): void {
        this.store.pipe(select(selectData)).subscribe((data) => {
            if (data.prices != undefined) {
                if (data.prices.length && data.orders.length && data.payments.length) {
                    this.priceDetailsList = data.prices;
                    this.priceDetailsList.forEach((price: any) => {
                        this.priceDetails[price.drink_name] = price.prices;
                    });
                    this.orderDetails = JSON.parse(JSON.stringify(data.orders));
                    this.orderDetails = this.orderDetails.map((order: any) => ({
                        ...order,
                        price: this.priceDetails[order.drink][order.size]
                    }));
                    this.paymentsList = data.payments;
                    this.paymentsList.forEach((price: any) => {
                        this.paymentDetails[price.user] = price.amount;
                    });
                    this.payment();
                }
            }
        });
        this.store.dispatch(getData());
    }

    payment() {
        const purchases = this.orderDetails;
        this.payments = Object.values(
            purchases.reduce((r: any, { user, price }: { user: any; price: any }) => {
                r[user] = r[user] || { user, price: 0 };
                r[user].price += price;
                return r;
            }, {})
        );
        this.payments.map((payment: any) => {
            payment.amountPaid = this.paymentDetails[payment.user];
            payment.owes = Math.abs(payment.price - payment.amountPaid);
        });
    }
}
