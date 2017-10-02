import React from 'react';
import { Card } from 'semantic-ui-react';

export default class Orders extends React.Component {
    
    render() {
        
        const { person, orders } = this.props;
        const { login : person_login } = person;
        const person_orders = orders instanceof Array
            ? orders.filter( ({ buyer }) => buyer === person_login )
            : null;
        
        const _orders = person_orders instanceof Array
            && person_orders.length > 0
            ? person_orders.map( ( { delivery, dishes } = { delivery : { city : '',  street : '', addr : ''}, dishes : [] } ) => {
                var dishes_idx = 1;
                return {
                    header: delivery.city + " " + delivery.street, 
                    meta : delivery.addr,
                    description : dishes.reduce(
                        (res_str = '', { dish, type, addit } = {}) => res_str += ("" + dishes_idx++ + ". "  + dish + " " + type + " with " + addit).trim(),
                        ''
                    )
                };
            }
            )
            : null;
            
        debugger;
        
        return  <Card.Group items={_orders} />;
            
    }
        
}