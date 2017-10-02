const actions = {
    
    pushOrder : function pushOrder(order) {
        
        return typeof(order) === 'object'
            && order !== null
                ? {
                    type: 'PUSH_ORDER',
                    payload: order
                }
                : null;
                  
    }
    
};

export default actions;