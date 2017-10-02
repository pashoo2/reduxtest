import { combineReducers } from 'redux';

import cats from './cats.js';
import dishes from './dishes.js';
import addit from './addit.js';
import persons from './persons.js';
import orders from './orders.js';
import person from './person.js';
import order from './order.js';

/*
 root state:
 app : {
    cats : { //categories of a dishes
        cat_name : [ 'dish1',...,'dishN' ]
    },
    dishes : { //dishes and it's types
        dush_name : ['type1'....'typeN']
    },
    addit : { //additional dishes for a main dish
        addit_name : {
            dish_name : ['type1',...,'typeN'] //on which dishes this additional may be applied
        }
    },
    persons : { //the user who is order
        login : {
            name : '',
            surname : '',
            phone : '',
            address : { //default delivery address
                state : '',
                province : '',
                city : '',
                street : '',
                addr : ''
            } 
        }
    },
    order:{
        buyer : idx, //index in persons
        delivery : {
            state : '',
            province : '',
            city : '',
            street : '',
            addr : ''
        },
        ,
        dishes : [ 
            { 
                dish : '', 
                dish_type: '',
                addit : ''
            }
        ]
    },
    orders : [{
        buyer : idx, //index in persons
        delivery : {
            state : '',
            province : '',
            city : '',
            street : '',
            addr : ''
        },
        ,
        dishes : [ 
            { 
                dish : '', 
                dish_type: '',
                addit : ''
            }
        ]
    }],
    person : { //the current person
            login : '', //index of the current person in persons
            name : '',
            surname : '',
            phone : '',
            address : { //default delivery address
                state : '',
                province : '',
                city : '',
                street : '',
                addr : ''
            } 
        }
 } 
*/

export default combineReducers(
    {
        cats,
        dishes,
        addit,
        persons,
        orders,
        order,
        person
    }    
);