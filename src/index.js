import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers';



//import { instanceOf } from 'prop-types';
import { CookiesProvider } from 'react-cookie';

const store = createStore(
    rootReducer,
    window.__INITIAL_STATE__,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

//store.dispatch(loginSuccess());


ReactDOM.render(  
<CookiesProvider>
    <Provider store={store}>
        <Router>
            <Route component={App} />
        </Router>
    </Provider>
</CookiesProvider>, document.getElementById('root'));
registerServiceWorker();
