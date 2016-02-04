import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';

import Home from './Home/Home';

function initialiseView() {
    ReactDOM.render(<Router>
        <Route path="/" component={Home} />
    </Router>, document.getElementById('mainApp'));
}

module.exports = initialiseView;