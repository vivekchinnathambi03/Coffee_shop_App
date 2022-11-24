import { createAction, props } from '@ngrx/store';

export const getData = createAction('[coffee] get data');

export const loadData = createAction(
    '[coffee] load Data',
    props<{ prices: any[]; orders: any[]; payments: any[] }>()
);
