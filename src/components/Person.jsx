import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { isEmpty } from 'lodash';

import Address from './Address.jsx';

export default class Person extends React.Component {
    
    constructor(props, state) {
        super(props, state);
        
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = Object.assign(
            {err:null},
            this.setPerson(props)
        );
        
    }
    
    setPerson({ person } = {}){
        return { 
            person : Object.assign(
                {
                    login : '',
                    name : '',
                    surname : '',
                    phone : '',
                    address : {} 
                },
                person
            )
        };    
    }
    
    componentWillReceiveProps(nextprops) {
        this.setState(Object.assign(
            {err:null},
            this.setPerson(nextprops)
        ));
    }
    
    onSubmit() {
        const { onsubmit } = this.props;
        const { person : state_person } = this.state;
        
        if( typeof(onsubmit) === 'function' ) {
            onsubmit(state_person);
        }
        
    }
    
    onInputChange({target} = {}) {
        
        const { person } = this.state; 
        
        if ( isEmpty(target) === false
            && isEmpty(person) === false
        ) {
            const { value, name } = target;  
            const { persons } = this.props;
            debugger;
            if ( name === 'login'
                && typeof(persons) === 'object'
                && persons !== null
                && typeof(persons[value]) === 'object'
                && persons[value] !== null
            ) Object.assign(person, persons[value]) //if user with this login is already exists
            
            person[name] = value;
            
            this.setState({ 
                person,
                err : null
            });
            
        } else {
            this.setState({ 
                err: new Error("Something was going wrong")
            }); 
        }

        
    }
    
    render() {
        
        const { err, person } = this.state;

        return isEmpty(person) === false
                 ? <Form>
                    <Form.Field>
                        <label className='err'>{ err != null ? err.message : null }</label>
                    </Form.Field>
                    <Form.Field>
                      <label>Login</label>
                      <input placeholder='Login' name="login" value={person["login"]} onChange={this.onInputChange} />
                    </Form.Field>
                    <Form.Field>
                      <label>First Name</label>
                      <input placeholder='First Name' name="name" value={person["name"]} onChange={this.onInputChange} />
                    </Form.Field>
                    <Form.Field>
                      <label>Last Name</label>
                      <input placeholder='Last Name'  name="surname" value={person["surname"]} onChange={this.onInputChange} />
                    </Form.Field>
                    <Form.Field>
                      <label>Phone</label>
                      <input placeholder='Phone number' name="phone" value={person["phone"]} onChange={this.onInputChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Address:</label>
                        <Address address={person.address}/>
                    </Form.Field>
                    <Button type='submit' onClick={this.onSubmit}>Sign In</Button>
                </Form>
                : <div>
                    <label className='err'>
                        A Person must not be empty
                    </label>
                </div>;
            
    }

}