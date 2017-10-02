import { isEmpty } from 'lodash';

/**
 * @namespace persons_initState
 * @type persons~initState
 * @param {object} login - login of the user
**/
const initState = {};
/*
 * @type function~redux~reducer~persons
 * @param {person~initState} state
*/
export default function persons( state = initState, action ) {
  var nextState = Object.assign( 
    {},
    isEmpty(state) === true
        ? initState
        : state
  );  
 
  switch (action.type) {
    case 'PUSH_PERSON_SUCCESS':
        const person = action.payload;
        nextState[person.login] = person;
        debugger;
        break;
    case 'PUSH_PERSON_ERROR':
        debugger;
        console.log(action.payload);
        break;
  }
  
  return nextState;

}