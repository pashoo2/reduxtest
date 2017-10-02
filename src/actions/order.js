const actions = {
    
    newOrder(buyer) {
        return {
                    type: 'ORDER_NEW'
                };
    },
    
    stop() {
        return {
                    type: 'ORDER_STOP'
                };
    },
    
    nextStep : function(nextStep) {
        debugger;
        return nextStep === 1 ? {type: 'PUSH_ORDER'} : {type: 'ORDER_STEP_INCR'}
    },
    
    addDish : function addDish(dish) {
        
        return typeof(dish) === 'object'
            && dish !== null
                ? {
                    type: 'ORDER_ADD_DISH',
                    payload: dish
                }
                : null;
                  
    },
    
    removeDish : function removeDish(dish_idx) {
        
        return typeof(dish_idx) === 'number'
                ? {
                    type: 'ORDER_REMOVE_DISH',
                    payload: dish_idx
                }
                : null;
                  
    },
    
    setDeliveryAddr(delivery) {
        return typeof(delivery) === 'object'
            && delivery !== null
                ? {
                    type: 'ORDER_DELIVERY_SET',
                    payload: delivery
                }
                : null;    
    }
    
};

export default actions;