import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Pricing from './components/Pricing';
import Contact from './components/contact/Contact';
import Portfolio from './components/portfolio/Portfolio';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/contact' component={Contact} />
            <Route path='/about' component={About} />
            <Route path='/portfolio' component={Portfolio} />
            <Route path='/Pricing' component={Pricing} />
          </Switch>
        </div>
        <Footer />
      </Router>
    );
  }
}
export default App;
