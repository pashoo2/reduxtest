import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';

import App from './containers/App.jsx';

import getStore from './getStore.js';

const store = getStore()
    .then( store => render( 
            <Provider store={store}>
                <App/>
            </Provider>,
            document.getElementById("root")    
        )
    );