import localforage from 'localforage';
import { put, takeEvery, select } from 'redux-saga/effects'
   
export function* pushOrders(action) {
    let { orders, order, person } = yield select();
    order.buyer = person.login;
    let res = yield localforage.setItem(
        'redux.state.initState.orders',
        orders.concat(order)
    ).catch( e => e );
    debugger;
    if ( res instanceof Error === true ) yield put({
            type : 'PUSH_ORDER_ERROR',
            payload : res
        })
    else yield put({
            type : 'PUSH_ORDER_SUCCESS',
            payload : order
        });
        
    yield put({
            type : 'ORDER_STOP'
        });
}   
    
/*
    save all orders from the state into the storage
*/
export function* sagaPushOrders() {
    yield takeEvery('PUSH_ORDER', pushOrders)
}