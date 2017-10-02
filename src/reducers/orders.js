/**
 * @namespace orders_initState
 * @type orders~initState
**/
const initState = [
    /*{
        buyer : '', //a login of a person
        delivery : {
            state : '',
            province : '',
            city : '',
            street : '',
            addr : ''
        },
        dishes : [ 
            { 
                dish : '', 
                type: '',
                addit : ''
            }
        ]
    }*/
];

/*
 * @type function~redux~reducer~orders
 * @param {orders~initState} state
*/
export default function orders( state = initState, action ) {
    switch (action.type) {
        case 'PUSH_ORDER_SUCCESS':
            debugger;
            const order = action.payload;
            return state.concat(order);
        case 'PUSH_ORDER_ERROR':
            console.log(action.payload);
        default:
            return state.concat();
    }
}