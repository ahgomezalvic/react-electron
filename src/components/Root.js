import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './home/home';
import Print from './printer/printer';
import SocketTCP from './AlvicSrvConection/socketTCP';
import ExportToPDF from './exporter/toPDFFile';

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
            <li><Link to={'/AlvicSrvConection'} className="nav-link"> Alvic Server </Link></li>
            <li><Link to={'/exporter'} className="nav-link"> Export PDF </Link></li>
          </ul>
          </nav>
          <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/printer' component={Print} />
              <Route exact path='/exporter' component={ExportToPDF} />
              <Route exact path='/AlvicSrvConection' component={SocketTCP} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;