import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GlobalService {
    baseUrl = 'https://coffeeorderdetails.onrender.com/';
    constructor(private httpClient: HttpClient) { }

    getOrdersData(): Observable<any[]> {
        return this.httpClient.get<any[]>(this.baseUrl + 'orders');
    }

    getPriceList(): Observable<any[]> {
        return this.httpClient.get<any[]>(this.baseUrl + 'prices');
    }

    getPayments(): Observable<any[]> {
        return this.httpClient.get<any[]>(this.baseUrl + 'payments');
    }

    getData(): Observable<[any[], any[], any[]]> {
        return forkJoin([
            this.getPriceList(),
            this.getOrdersData(),
            this.getPayments(),
        ]);
    }
}
