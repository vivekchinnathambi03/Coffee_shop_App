import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getData } from '../store/loadData.actions';
import { selectData } from '../store/loadData.reducers';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss']
})
export class PriceListComponent implements OnInit {

    priceDetailsList:any =[]

    constructor(
        private store: Store<{
            data: { prices: any[]; orders: any[]; payments: any[] };
        }>
    ) { }

    ngOnInit(): void {
        this.store.pipe(select(selectData)).subscribe((data) => {
            if (data.prices != undefined) {
                if (data.prices.length) {
                    this.priceDetailsList = data.prices;
                }
            }
        });
        if(this.priceDetailsList.length === 0) {
            this.store.dispatch(getData());
        }
    }
}
