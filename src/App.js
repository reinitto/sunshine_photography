import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Pricing from './Pages/Pricing';
import Contact from './Pages/Contact';
import Gallery from './Pages/Gallery';
import Footer from './components/layout/Footer';
import ScrollToTop from './ScrollToTop';
import './compiledScss/style.css';

class App extends Component {
  render() {
    return (
      <Router>
        <ScrollToTop>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/contact' component={Contact} />
            <Route path='/about' component={About} />
            <Route path='/gallery' component={Gallery} />
            <Route path='/Pricing' component={Pricing} />
          </Switch>
        </ScrollToTop>
        <Footer />
      </Router>
    );
  }
}
export default App;
