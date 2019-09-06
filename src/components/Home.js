import React, { Component } from 'react';
import Portfolio from './portfolio/Portfolio';
import About from './About';
import Pricing from './Pricing';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Portfolio />
        <Pricing />
        <About />
      </div>
    );
  }
}
