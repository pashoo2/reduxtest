import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/root.js';
import localforage from 'localforage';
import { isEmpty } from 'lodash';

/**
 * middlewares
**/
import { mwPushPerson } from 'middlewares/persons.js';
import { logger } from 'middlewares/logger.js';

/**
 * sagas
**/
import { sagaPushOrders } from 'sagas/orders.js';


export default function getState() {
    
    return  Promise.all([
                localforage.getItem('redux.state.initState'),
                localforage.getItem('redux.state.initState.orders')
            ])
            .then( ( [initState, orders] ) => Object.assign(
                        orders instanceof Array === true
                        && orders.length > 0
                            ? { orders }
                            : {},
                        isEmpty(initState) === true
                            ? {}
                            : initState
                    ),
                e => e
            )
            .then( res => {
                const initState = typeof(res) !== 'object' 
                    || res instanceof Error 
                    || res === null
                        ? {}
                        : res;
                debugger;
                
                const sagaMiddleware = createSagaMiddleware();
                
                const store = createStore(
                            rootReducer,
                            initState,
                            applyMiddleware(
                                logger,
                                sagaMiddleware,
                                mwPushPerson
                            )
                        );   
                
                sagaMiddleware.run(sagaPushOrders);
                
                return store;
            });
}