import React from 'react';
import { Accordion, Icon, Container, Header, Button } from 'semantic-ui-react';
import { isEmpty, compact } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actionsOrder from 'actions/order.js';

class Menu extends React.Component {
    
    static propTypes = {
        cats : React.PropTypes.object.isRequired,
        dishes : React.PropTypes.object.isRequired,
        addit : React.PropTypes.object.isRequired
    } 
    
    constructor(props, state) {
        
        super(props, state);
        
    }
    
    state = { 
        activeIndex: 0,
        activeIndex_dish : 0, 
        activeIndex_dishType : 0
    }

    catClick = (e, titleProps) => {
        const { index } = titleProps;
        const { activeIndex } = this.state;
    
        this.setState({ activeIndex: activeIndex === index ? -1 : index });
    }
    
    dishClick = (e, titleProps) => {
        const { index } = titleProps;
        const { activeIndex_dish } = this.state;
    
        this.setState({ activeIndex_dish: activeIndex_dish === index ? -1 : index });
    }
    
    dishTypeClick = (e, titleProps) => {
        const { index } = titleProps;
        const { activeIndex_dishType } = this.state;
    
        this.setState({ activeIndex_dishType: activeIndex_dishType === index ? -1 : index });
    }

    addDish(dish, type, addit){
        
        const { acts } = this.props;
        
        acts.order.addDish({
            dish, type, addit    
        });
        
    }
    
    removeDish( {target} ){
        
        const { acts } = this.props;
        const { name } = target;
        
        acts.order.removeDish(parseInt(name));
        
    }
    
    render() {
        
        var menuView = null;
        const { cats, dishes, addit, state : cstate } = this.props;
        const { dishes : chosen_dishes } = cstate.order;
        const { activeIndex, activeIndex_dish, activeIndex_dishType } = this.state;
        
        debugger;
                  
        if ( isEmpty(cats) === false ) {
            const cat_names = Object.keys(cats);
            let idx = 0;
            let idx_dish=0;
            menuView = cat_names.map(
                
                cat_name => <Accordion.Accordion key={cat_name}>
                    
                    <Accordion.Title active={activeIndex === idx} index={idx} onClick={::this.catClick} style={{backgroundColor:'orange'}}>
                        <span>
                            <Icon name='dropdown'/>
                            {cat_name}
                        </span>
                    </Accordion.Title>
                    
                    <Accordion.Content active={activeIndex === idx++}>
                        <div>
                            <Header>Dishes:</Header>
                            <Container>
                                    {cats[cat_name].map( 
                                    
                                        dish_name => {
                                            let idx_dishType=0;
                                            let dishTypes = dishes[dish_name];
                                            let flTypes = dishTypes instanceof Array
                                                            && dishTypes.length > 0;
                                            return <Accordion.Accordion key={dish_name}>
                                        
                                                        <Accordion.Title active={activeIndex_dish === idx_dish} index={idx_dish} onClick={ flTypes === true ? ::this.dishClick : ()=>this.addDish(dish_name) } style={{backgroundColor:'yellow'}}>
                                                            <span>
                                                                { flTypes === true ? <Icon name='dropdown'/> : null }
                                                                <b>{dish_name}</b>
                                                            </span>
                                                        </Accordion.Title>
                                                        
                                                        { flTypes === true
                                                            ?  <Accordion.Content active={activeIndex_dish === idx_dish++}>
                                                                <p>Types:</p>
                                                                <div>
                                                                    {   dishTypes.map( 
                                                                            type_name => <DishTypeWithAdditionals key={type_name} dish_name={dish_name} type_name={type_name} addit={addit} active={activeIndex_dishType === idx_dishType} index={idx_dishType++} addDish={::this.addDish} onclck={::this.dishTypeClick}/>
                                                                        )
                                                                    }
                                                                </div>
                                                            </Accordion.Content>
                                                            : null
                                                        }
                                                
                                                    </Accordion.Accordion>;
                                        }
                                    )}
                            </Container>
                        </div>
                    </Accordion.Content>
                    
                </Accordion.Accordion>
            )
        }
        
        debugger;
         
        return <Accordion>
            <Header>Menu:</Header>
            <div>
                {menuView}
            </div> 
            <Header>Basket:</Header>
            <div>
                {chosen_dishes instanceof Array && chosen_dishes.length > 0 
                    ? chosen_dishes.map(
                        ({ dish, type = '', addit = '' }, idx) => <Container key={idx}>
                            <Header>{ dish + "  " + type + " " + addit }</Header>
                            <Button name={idx} onClick={::this.removeDish}>Remove</Button>
                        </Container>
                    )
                    : <h5>There is nothing in your basket!</h5>
                }
            </div>
        </Accordion>;
          
            
    }
        
}

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, { state : state } );

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
)(Menu);

class DishTypeWithAdditionals extends React.Component {
    
    render() {
        
        const { dish_name, type_name, addit, active, index, onclck, addDish } = this.props;
        
        const additionals = compact(Object.keys(addit).map( 
            addit_name => {
                const addit_desc = addit[addit_name];
                const addit_desc_dish = addit_desc[dish_name];
                
                return  addit_desc_dish instanceof Array
                        && addit_desc_dish.includes(type_name) === true
                            ? <Button key={addit_name} size='mini' onClick={()=>addDish(dish_name, type_name, addit_name)}>
                                {addit_name}
                              </Button>
                            : null;
                
            }    
        ));
        
        const flAdditionals = additionals instanceof Array 
                && additionals.length > 0;
        
        flAdditionals === true
            ? additionals.push(<Button key={'wo'} size='mini' onClick={()=>addDish(dish_name, type_name)}>
                Without
            </Button>)
            : null;
        
        return <Accordion.Accordion>
            
            <Accordion.Title active={active} index={index} onClick={flAdditionals === true ? onclck : ()=>addDish(dish_name, type_name)} style={{backgroundColor: 'cyan'}}>
                <span>
                   { flAdditionals === true ? <Icon name='dropdown'/> : null }
                   {type_name}
                </span>
            </Accordion.Title>
            
            {flAdditionals === true
                ? <Accordion.Content active={active}>
                    <Header>Additional: </Header>
                    <div>
                        {additionals}
                    </div>
                </Accordion.Content>
                 : null
            }
        
        </Accordion.Accordion>;
            
    }

}