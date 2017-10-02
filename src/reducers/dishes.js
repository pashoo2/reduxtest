/**
 @prop {string[]} dish_name - name of a dish types  
**/
const initState = {
    'meat' : ['beef', 'chicken', 'pork'],
    'sausage' : ['beef', 'chicken', 'pork'],
    'frenchOnion' : ['cold', 'hot'],
    'tortillaMeatball' : [],
    'water':['cold', 'warm'],
    'wine':['red', 'white']
};

export default function dishes( state = initState ) {
    return state;
}