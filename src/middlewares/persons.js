import localforage from 'localforage';

export const mwPushPerson = (store) => {
        return function(next) {
            return function(action) {
                 const _store = store;
                 const _next = next;
                 const { payload, type } = action;
                 
                 if ( type === 'PUSH_PERSON' ) {
                    debugger;
                    localforage.setItem(
                         'redux.state.initState',
                          { person : action.payload }
                    )
                    .then( res=>{
                        const { person : cperson } = store.getState();
                        const actData = {
                                type: 'PUSH_PERSON_SUCCESS',
                                payload: Object.assign(
                                    action.payload,
                                    typeof(cperson.login) === 'string'
                                        && cperson.login.length > 4 
                                            ? { login : cperson.login }
                                            : {}
                                )
                        };
                        debugger;
                        next(actData);
                    })
                    .catch( e => next({
                                type: 'PUSH_PERSON_ERROR',
                                payload: new Error('A person is not defied')
                        }))
                 } else next(action);
            }
        }
    };