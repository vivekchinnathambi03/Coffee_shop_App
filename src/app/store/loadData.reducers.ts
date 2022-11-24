import { loadData } from './loadData.actions';
import { on, createReducer } from '@ngrx/store';

export interface State {
    data: { prices: any[]; orders: any[]; payments: any[] };
}

export const initialState: State = {
    data: { prices: [], orders: [], payments: [] }
};

export const LoadDataReducer = createReducer(
    initialState,
    on(loadData, (state, action) => ({
        ...state,
        prices: action.prices,
        orders: action.orders,
        payments: action.payments
    }))
);

export const selectData = (state: State) => state.data;