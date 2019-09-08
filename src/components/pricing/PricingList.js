import React from 'react';
import PricingItem from './PricingItem';

let pricingItems = [
  {
    name: 'Baby',
    price: '1500 NOK'
  },
  {
    name: 'Family',
    price: '2000 NOK'
  },
  {
    name: 'Portrait',
    price: '1500 NOK'
  },
  {
    name: 'Event',
    price: '1500 NOK'
  }
];

export default function PricingList({
  items = pricingItems,
  title = 'Session'
}) {
  let content = items.map((item, i) => <PricingItem {...item} key={i} />);
  return (
    <table className='table'>
      <thead>
        <tr>
          <th scope='col'>{title}</th>
          <th scope='col'>Price</th>
        </tr>
      </thead>
      <tbody>{content}</tbody>
    </table>
  );
}
