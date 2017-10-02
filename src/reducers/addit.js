/**
 * @namespace addit_initState
 * @type additional~initState
 * @description
 * @prop {object} additionalName
 * @props {string[]} additionalName.dishName - name of a types for the additional
**/
const initState = {
    'catsup' : {
        'meat' : [
            'beef',
            'chicken',
            'pork'
        ],
        'sausage' : [
            'beef',
            'chicken',
            'pork'
        ]
    },
    'bun' : {
        'sausage' : [
            'beef',
            'chicken',
            'pork'
        ]
    },
    'redWine' : {
        'meat' : ['beef']
    },
    'mayo' : {
        'tortillaMeatball' : [],
        'frenchOnion' : ['hot']
    },
    'ice' : {
        'water' : [],
        'juice' : []
    }
};

/*
 * @type function~redux~reducer~addit
 * @param {addit~initState} state
*/
export default function addit( state = initState ) {
    return state;
}