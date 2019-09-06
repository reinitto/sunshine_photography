import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ImageGallery from './ImageGallery';

const portfolioImages = {
  nature: [
    {
      src:
        'http://images.unsplash.com/photo-1513326238704-b2cd281a3d53?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      width: 4,
      height: 3,
      categories: ['landscape', 'nature', 'food', 'aerial']
    },
    {
      src:
        'http://images.unsplash.com/photo-1503049555010-f8616ee8f0f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      width: 1,
      height: 1,
      categories: ['landscape', 'nature', 'food', 'aerial']
    },
    {
      src:
        'http://images.unsplash.com/photo-1510525009512-ad7fc13eefab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      categories: ['landscape', 'nature', 'food', 'aerial'],
      width: 4,
      height: 3
    },
    {
      src:
        'http://images.unsplash.com/photo-1526402978125-f1d6df91cbac?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      categories: ['landscape', 'nature', 'food', 'aerial'],
      width: 4,
      height: 3
    },
    {
      src:
        'http://images.unsplash.com/photo-1537646692914-61d73c4d6bad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjI0MX0&auto=format&fit=crop&w=500&q=60',
      categories: ['landscape', 'nature', 'food', 'aerial'],
      width: 4,
      height: 3
    },
    {
      src:
        'http://images.unsplash.com/photo-1501786223405-6d024d7c3b8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      categories: ['landscape', 'nature', 'food', 'aerial'],
      width: 4,
      height: 3
    },
    {
      src:
        'http://images.unsplash.com/photo-1464241353125-b30586718640?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      categories: ['landscape', 'nature', 'food', 'aerial'],
      width: 1,
      height: 1
    },
    {
      src:
        'http://images.unsplash.com/photo-1534260933201-688b892637f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      categories: ['landscape', 'nature', 'food', 'aerial'],
      width: 4,
      height: 3
    },
    {
      src:
        'http://images.unsplash.com/photo-1529663991015-c3d2056835c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      categories: ['landscape', 'nature', 'food', 'aerial'],
      width: 4,
      height: 3
    }
  ],
  landscape: [
    {
      src:
        'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      width: 4,
      height: 3
    },
    {
      src:
        'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      width: 4,
      height: 3
    },
    {
      src:
        'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      width: 4,
      height: 3
    },
    {
      src:
        'https://images.unsplash.com/photo-1476610182048-b716b8518aae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      width: 4,
      height: 3
    },
    {
      src:
        'https://images.unsplash.com/photo-1433838552652-f9a46b332c40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      width: 4,
      height: 3
    },
    {
      src:
        'https://images.unsplash.com/photo-1504217051514-96afa06398be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      width: 4,
      height: 3
    },
    {
      src:
        'https://images.unsplash.com/photo-1537249011554-eb008faf38c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      width: 4,
      height: 3
    },
    {
      src:
        'https://images.unsplash.com/photo-1433087639215-37846ea63501?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      width: 4,
      height: 3
    }
  ],
  aerial: [
    {
      src:
        'https://images.unsplash.com/photo-1518144591331-17a5dd71c477?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      width: 4,
      height: 3
    },
    {
      src:
        'https://images.unsplash.com/photo-1506020757198-1a3adb04b6b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      width: 4,
      height: 3
    },
    {
      src:
        'https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      width: 4,
      height: 3
    },
    {
      src:
        'https://images.unsplash.com/photo-1510846606678-710c05a5c776?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      width: 4,
      height: 3
    },
    {
      src:
        'https://images.unsplash.com/photo-1476231682828-37e571bc172f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      width: 4,
      height: 3
    },
    {
      src:
        'https://images.unsplash.com/photo-1503079230625-8a7c589a9007?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      width: 4,
      height: 3
    },
    {
      src:
        'https://images.unsplash.com/photo-1508233620467-f79f1e317a05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      width: 4,
      height: 3
    },
    {
      src:
        'https://images.unsplash.com/photo-1513760870-d12407065ae4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      width: 4,
      height: 3
    }
  ],
  food: [
    {
      src:
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      width: 4,
      height: 3
    },
    {
      src:
        'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      width: 4,
      height: 3
    },
    {
      src:
        'https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      width: 4,
      height: 3
    },
    {
      src:
        'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      width: 4,
      height: 3
    },
    {
      src:
        'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      width: 4,
      height: 3
    },
    {
      src:
        'https://images.unsplash.com/photo-1546548970-71785318a17b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      width: 4,
      height: 3
    },
    {
      src:
        'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      width: 4,
      height: 3
    }
  ]
};

export default class Portfolio extends Component {
  state = {
    category: 'nature'
  };

  changeCategory = e => {
    e.preventDefault();
    this.setState({
      category: e.target.value
    });
  };

  render() {
    const { category } = this.state;
    return (
      <div>
        <h2>Portfolio</h2>
        <p>
          For higher resolution images <Link to='/contact'>contact me</Link> or
          Visit{' '}
          <a
            target='_blank'
            href='http://www.shutterstock.com'
            rel='noopener noreferrer'
          >
            shutterstock link goes here
          </a>
        </p>
        <div>
          <button value='landscape' onClick={this.changeCategory}>
            Landscape
          </button>
          <button value='nature' onClick={this.changeCategory}>
            Nature
          </button>
          <button value='aerial' onClick={this.changeCategory}>
            Aerial
          </button>
          <button value='food' onClick={this.changeCategory}>
            Food
          </button>
        </div>
        <ImageGallery photos={portfolioImages[category]} />
      </div>
    );
  }
}
