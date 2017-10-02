import React from 'react';
import { Accordion, Icon, Button } from 'semantic-ui-react'
import { isEmpty } from 'lodash';

import Menu from './Menu.jsx';
import Person from './Person.jsx';
import Address from './Address.jsx';

export default class Order extends React.Component {
    
    static propTypes = {
        cats : React.PropTypes.object.isRequired,
        dishes : React.PropTypes.object.isRequired,
        addit : React.PropTypes.object.isRequired,
        person : React.PropTypes.object
    } 
    
    state = {
        step : 0,
        basket : []   
    }
    
    componentWillReceiveProps() {
        this.setState({
            step : 0,
            basket : []
        });    
    }
    
    onbasketupdate(basket) {
        debugger;
        this.setState({basket});
    }
    
    nextstep(){ 
        var { step, basket } = this.state;
        const { address, onsubmit, person } = this.props;
        if ( step === 1 ) {
            onsubmit(basket, address, person);
        } else {
            this.setState({ step : ++this.state.step }); 
        }
    }
    
    render() {
        
        const { step, basket } = this.state;
        const { person, address } = this.props;
                
        return step !== 1 
            ? <div>
                <p>{person.name}, please choose:</p>
                <Menu onbasketupdate={::this.onbasketupdate} {...this.props} />
                { basket instanceof Array && basket.length > 0
                    ? <Button primary onClick={::this.nextstep}>Delivery details</Button>
                    : null
                }
            </div>
            : <div>
                <p>{person.name}, where we must to deliver your order?</p>
                <Address address={address} />
                <Button primary onClick={::this.nextstep}>Order it</Button>
            </div>
          
            
    }
        
}