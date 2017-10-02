import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { Button }  from 'semantic-ui-react';

import Person from 'components/Person.jsx';
import Orders from 'components/Orders.jsx';
import Order  from 'components/Order.jsx';

import actionsOrders from 'actions/orders.js';

const propTypes = {
    state_root : React.PropTypes.object.isRequired,
    'state_root.cats' : React.PropTypes.object.isRequired,
    'state_root.dishes' : React.PropTypes.object.isRequired,
    'state_root.addit' : React.PropTypes.object.isRequired,
    'state_root.persons' : React.PropTypes.object.isRequired,
    'state_root.orders' : React.PropTypes.object.isRequired
};

class App extends React.Component {
    
    static propTypes = propTypes;
    
    constructor(props, state) {
        super(props, state);  
        
        this.person_onsubmit = this.person_onsubmit.bind(this);
        this.order_createnew = this.order_createnew.bind(this);
        this.order_onsubmit  = this.order_onsubmit.bind(this);
        this.person_edit = this.person_edit.bind(this);
        
    }
    
    state = {
        new_order : false,
        edit : false
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({ new_order : false, edit : false });
    }
    
    person_onsubmit(person) {
        const { acts } = this.props;
        const { dispatch } = acts;
 
        dispatch({
            type : 'PUSH_PERSON',
            payload : person    
        });
        
        this.setState({ 
            edit : false
        });
        
    }
    
    order_createnew() {
        this.setState({ new_order : true, edit : false });  
    }
    
    order_onsubmit( dishes, delivery, { login : buyer } = { login : '' } ) {        
        const { acts } = this.props;
        debugger; 
        acts.orders.pushOrder({ dishes, delivery, buyer });
        this.setState({ new_order : false, edit : false });
    }
    
    person_edit() {
        this.setState({ new_order : false, edit : true });    
    }
    
    render() {
        
        const { new_order, edit } = this.state;
        const { person, persons, orders, cats, dishes, addit } = this.props.state_root;
        const menu = { cats, dishes, addit, person, address : Object.assign({}, person.address) };
        debugger;            
        return edit === true
            || isEmpty(person) === true
            || person.login === ''
                ? <Person persons={persons} person={person} onsubmit={this.person_onsubmit}/>
                : new_order !== true ? <div>
                    <h1>Welcome, {person.name}</h1>
                    <Button basic color='red' onClick={this.order_createnew}>New order</Button>
                    <Button basic color='red' onClick={this.person_edit}>Edit profile</Button>
                    { orders instanceof Array && orders.length > 0
                        ? <div>
                            <p>Your orders:</p>
                            <Orders orders={orders} person={person}/>
                        </div>
                        : null
                    }
                </div>
                : <Order {...menu} onsubmit={this.order_onsubmit} />;
    }
    
}

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, { state_root : state } );

const mapDispatchToProps = (dispatch, ownProps) => Object.assign(
    {},
    ownProps, 
    {  acts: {
            orders : bindActionCreators(actionsOrders, dispatch),
            dispatch
        }
    }
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);