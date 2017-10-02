/**
 * @namespace order_initState
 * @type order~initState
**/
const initState = {
    step : -1,
    buyer : '', //a login of a person
    delivery : {
        state : '',
        province : '',
        city : '',
        street : '',
        addr : ''
    },
    dishes : []
};

/*
 * @type function~redux~reducer~order
 * @param {order~initState} state
*/
export default function order( state = initState, action ) {
    switch (action.type) {
        
        case "ORDER_NEW":
            debugger;
            return Object.assign(
                {},
                initState,
                {step : 0}
            );
        case "ORDER_STOP":
           debugger;
           return Object.assign(
                {},
                initState
            ); 
        case "ORDER_STEP_INCR":
            const step_current = state.step;
            
            return Object.assign(
                {},
                state,
                { step: (step_current+1) }
            );
            
        case 'ORDER_ADD_DISH':
            const dish = action.payload;
            const dishes = state.dishes;
            
            return Object.assign(
                {  },
                state,
                { dishes : dishes.concat(dish) }
            );
            
        case 'ORDER_REMOVE_DISH': 
            
            const dish_idx = action.payload;
            const _dishes = state.dishes;
            
            return Object.assign(
                {},
                state,
                { dishes : _dishes.splice(dish_idx, 1) }
            );
            
        case 'ORDER_SET_DELIVERY': 
            
            const delivery = action.payload;
            
            return Object.assign(
                {},
                state,
                { delivery }
            );  
            
        default:
            return state;
    }
}