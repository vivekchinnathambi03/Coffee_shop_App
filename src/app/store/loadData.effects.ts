import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { getData, loadData } from './loadData.actions';
import { switchMap, catchError, map } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { GlobalService } from 'src/app/app.service';
@Injectable()
export class LoadDataEffect {
    constructor(
        private actions$: Actions,
        private globalService: GlobalService
    ) { }
    loadData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getData),
            switchMap(() =>
                this.globalService.getData().pipe(
                    map(([priceListData, ordersDetailsData, paymentsData]) =>
                        loadData({
                            orders: ordersDetailsData,
                            payments: paymentsData,
                            prices: priceListData,
                        })
                    ),
                    catchError(() =>
                        of(loadData({ orders: [], payments: [], prices: [] }))
                    )
                )
            )
        )
    );
}
