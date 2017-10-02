import React from 'react';
import { Form } from 'semantic-ui-react';
import { isEmpty, defaults } from 'lodash';

export default class Address extends React.Component {
    
    static address_defaults = {
        state : '',
        province : '',
        city : '',
        street : '',
        addr : ''    
    };
    
    constructor(props, state) {
        super(props, state);
        
        this.onInputChange = this.onInputChange.bind(this);
        
    }
    
    state = {
        err : null    
    }
    
    onInputChange({target} = {}) {
        
        const { address } = this.props; 
        debugger;
        if ( isEmpty(target) === false
            && isEmpty(address) === false
        ) {
            const { value, name } = target;    
            address[name] = value;
            
            this.setState({ 
                err : null
            });
            
        } else {
            
            this.setState({ 
                err: new Error("Something was going wrong")
            }); 
            
        }

        
    }
    
    render() {
        
        const { address } = this.props;
        const { err } = this.state;
        debugger;
        defaults(
            address,
            this.constructor.address_defaults
        );
        
        return typeof(address) === 'object' && isEmpty(address) === false
                 ? <div>
                    { err != null //if an error
                         ? <Form.Field>
                                <label className='err'>
                                    {err.message}
                                </label>
                            </Form.Field>
                        : null
                    }
                    <Form.Field>
                      <label>State</label>
                      <input placeholder='State' name="state" value={address["state"]} onChange={this.onInputChange} />
                    </Form.Field>
                    <Form.Field>
                      <label>Province</label>
                      <input placeholder='Province'  name="province" value={address["province"]} onChange={this.onInputChange} />
                    </Form.Field>
                    <Form.Field>
                      <label>City</label>
                      <input placeholder='City' name="city" value={address["city"]} onChange={this.onInputChange} />
                    </Form.Field>
                    <Form.Field>
                      <label>Street</label>
                      <input placeholder='Street' name="street" value={address["street"]} onChange={this.onInputChange} />
                    </Form.Field>
                    <Form.Field>
                      <label>Address line</label>
                      <input placeholder='Address line' name="addr" value={address["addr"]} onChange={this.onInputChange} />
                    </Form.Field>
                </div>
                : <div>
                    <label className='err'>
                        An Address must not be empty
                    </label>
                </div>;
            
    }

}