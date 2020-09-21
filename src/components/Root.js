import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './home/home';
import Print from './printer/printer';

class App extends Component {
  render() {
    return (
    <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/'} className="nav-link"> Home </Link></li>
            <li><Link to={'/printer'} className="nav-link"> Printer </Link></li>
            <li><Link to={'/bluetooth'} className="nav-link"> Bluetooth </Link></li>
            <li><Link to={'/alvicsvr'} className="nav-link"> Alvic Server </Link></li>
          </ul>
          </nav>
          <hr />
          <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/printer' component={Print} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;