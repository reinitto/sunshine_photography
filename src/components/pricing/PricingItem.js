import React from "react";

export default function PricingItem({ name, price, time }) {
  return (
    <tr>
      <td>{name}</td>
      <td>{price}</td>
      {time ? <td>{time}</td> : null}
    </tr>
  );
}
