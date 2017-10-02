import React from 'react';
import { Accordion, Icon, Button } from 'semantic-ui-react'
import { isEmpty } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Menu from 'containers/Menu.jsx';
import Person from 'components/Person.jsx';
import Address from 'components/Address.jsx';

import actionsOrder from 'actions/order.js';

class Order extends React.Component {
    
    static propTypes = {
        cats : React.PropTypes.object.isRequired,
        dishes : React.PropTypes.object.isRequired,
        addit : React.PropTypes.object.isRequired,
        person : React.PropTypes.object
    } 
    
    constructor(props, state) {
        super(props, state);
        
    }
    
    componentWillMount() {
        this.newOrder(this.props);    
    }
    
    newOrder(nextProps) {
        
       const { acts, state } = nextProps;
       acts.order.newOrder('def');
       
    }
    
    onbasketupdate() {
       this.nextstep();
    }
    
    nextstep() { 
        
       const { acts, state, address } = this.props;
       
        if ( state.order.step === 1 ) {
            acts.order.setDeliveryAddr(address);   
        }
       
        acts.order.nextStep(state.order.step); 
        
    }
    
    render() {
        
        const { person, address, state } = this.props;
        const { step, dishes } = state.order;
        
        debugger;
                
        return step !== 1 
            ? <div>
                <p>{person.name}, please choose:</p>
                <Menu onbasketupdate={::this.onbasketupdate} {...this.props} />
                { dishes instanceof Array && dishes.length > 0
                    ? <Button primary onClick={::this.nextstep}>Delivery details</Button>
                    : null
                }
            </div>
            : <div>
                <p>{person.name}, where we must to deliver your order?</p>
                <Address address={address} />
                <Button primary onClick={::this.nextstep}>Order it</Button>
            </div>;          
            
    }
    
    componentWillUnmount() {
       const { acts } = this.props;
       acts.order.stop();    
    }
        
}

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, { state } );

const mapDispatchToProps = (dispatch, ownProps) => Object.assign(
    {},
    ownProps, 
    {  acts: {
            order : bindActionCreators(actionsOrder, dispatch),
            dispatch
        }
    }
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Order);