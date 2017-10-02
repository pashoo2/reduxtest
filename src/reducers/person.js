

/**
 * @namespace person_initState
 * @type person~initState
**/
const initState = {
        login : '', //index into the array with all persons
        name : '',
        surname : '',
        phone : '',
        address : {
            state : '',
            province : '',
            city : '',
            street : '',
            addr : ''
        }    
    };

/*
 * @type function~redux~reducer~person
 * @param {person~initState} state
*/
export default function person( state = initState, action ) {
    var nextState = Object.assign( 
        {},
        state //for now it is a person
    );  
 
  switch (action.type) {
    case 'PUSH_PERSON_SUCCESS':
        const person = action.payload;
        nextState = Object.assign( //merge a new person data with the current data of the person
            nextState,
            person,
            typeof(state.login) === 'string' //do not modify the login if it's already specified
                && state.login.trim().length > 4
                ? { login : state.login }
                : {}
        );
        debugger;
        break;
  }
  
  return nextState;
}