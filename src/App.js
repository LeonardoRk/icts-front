import { Component } from 'react';
import Nav from './components/Nav';
import Product from './components/Product';
import Purchase from './components/Purchase';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {

  click() {
    console.log("clicked");
  }

  currentComponent = "";

  render() {
    return (
      <Router>
        <Nav />
        
        <Switch>
          <Route path="/products">
            <Product type="product" />
          </Route>
          <Route path="/purchases">
            <Purchase type="purchase" />
          </Route>
        </Switch>
      </Router>
    );
  }

}

export default App;
