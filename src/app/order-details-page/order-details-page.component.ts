import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { getData } from '../store/loadData.actions';
import { selectData } from '../store/loadData.reducers';


@Component({
  selector: 'app-order-details-page',
  templateUrl: './order-details-page.component.html',
  providers: [DecimalPipe],
  styleUrls: ['./order-details-page.component.scss']
})

export class OrderDetailsPageComponent implements OnInit {
    orderDetails:any =[]
    priceDetailsList:any = []
    priceDetails:any = {}
    paymentsList:any = []
    paymentDetails:any = {}
    resultArray:any = []
    payments:any = []
    page = 1;
	pageSize =10;
	collectionSize = 0;
    ordersPermanentData: any=[]
    searchText = ''
    filter = new FormControl('', { nonNullable: true });
    constructor(private store: Store<{data: { prices: any[]; orders: any[]; payments: any[] };
    }>) {
        this.paginationData()
    }
    ngOnInit(): void {
        this.store.pipe(select(selectData)).subscribe((data) => {
            if (data.prices != undefined) {
                if (data.prices.length && data.orders.length && data.payments.length) {
                    this.priceDetailsList = data.prices;
                    this.priceDetailsList.forEach((price: any) => {
                        this.priceDetails[price.drink_name] = price.prices;
                    });
                    this.orderDetails = data.orders;
                    this.collectionSize = this.orderDetails.length
                    this.orderDetails = this.orderDetails.map((order: any) => ({
                        ...order,
                        price: this.priceDetails[order.drink][order.size]
                    }));
                    this.ordersPermanentData = this.orderDetails
                    this.orderDetails.sort((a:any,b:any) => a.user.localeCompare(b.user));
                    this.paginationData()
                }
            }
        });
        if(this.priceDetailsList.length === 0) {
            this.store.dispatch(getData());
        }
    }

    paginationData() {
        if(this.searchText.length === 0) {
            this.orderDetails = this.ordersPermanentData
        }
        this.collectionSize = this.orderDetails.length
        let pagination = this.orderDetails
		this.orderDetails  = pagination.map((order:any, i:any) => ({ id: i + 1, ...order })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
    }

    filterBrands (){
        this.orderDetails = this.ordersPermanentData.filter((order:any)=>{
            return order.user.toLowerCase().indexOf(this.searchText.toLowerCase())>=0  ||
                    order.drink.toString().toLowerCase().indexOf(this.searchText.toLowerCase())>=0 ||
                    order.size.toString().toLowerCase().indexOf(this.searchText.toLowerCase())>=0 ||
                    order.price.toString().toLowerCase().indexOf(this.searchText.toLowerCase())>=0
        })
        this.paginationData()
    }
}



