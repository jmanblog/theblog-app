import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './index.css';
import App from './App';
import Article from './ArticleApp';
import Contact from './ContactApp';
import Privacy from './PrivacyApp';
import Mistake from './ErrorApp';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/main" component={App} />
            <Route path="/sub" component={App} />
            <Route path="/article" component={Article} />
            <Route path="/contact" component={Contact} />
            <Route path="/privacy" component={Privacy} />
            <Route path="*" component={Mistake} />
        </Switch>
    </BrowserRouter>, 
        document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
