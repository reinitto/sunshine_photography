import React from 'react';
import PricingItem from './PricingItem';

let pricingItems = [
  {
    name: 'Session',
    price: '$100'
  },
  {
    name: 'Editing',
    price: '$50'
  },
  {
    name: 'Coloring',
    price: '$100'
  },
  {
    name: 'Event',
    price: '$100'
  }
];

export default function PricingList({ items = pricingItems }) {
  let content = items.map((item, i) => <PricingItem {...item} key={i} />);
  return (
    <table class='table'>
      <thead>
        <tr>
          <th scope='col'>Product</th>
          <th scope='col'>Price</th>
        </tr>
      </thead>
      <tbody>{content}</tbody>
    </table>
  );
}
