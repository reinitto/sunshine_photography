import React from "react";
import PricingItem from "./PricingItem";
import pricingItems from "../../content/pricing";

// let pricingItems = [
//   {
//     name: "Children",
//     price: "600/1000 NOK",
//     time: "30min/1h"
//   },
//   {
//     name: "Family",
//     price: "600/1000 NOK",
//     time: "30min/1h"
//   },
//   {
//     name: "Groups",
//     price: "600/1000 NOK",
//     time: "30min/1h"
//   },
//   {
//     name: "Event",
//     price: "600/1000 NOK",
//     time: "30min/1h"
//   },
//   {
//     name: "Lifestyle",
//     price: "600/1000 NOK",
//     time: "30min/1h"
//   }
// ];

export default function PricingList({
  items = pricingItems,
  title = "Session"
}) {
  let content = items.map((item, i) => <PricingItem {...item} key={i} />);
  return typeof items[0].time == "string" ? (
    <table className="table pricingList">
      <thead>
        <tr>
          <th scope="col">{title}</th>
          <th scope="col">Price</th>
          <th scope="col">Time</th>
        </tr>
      </thead>
      <tbody>{content}</tbody>
    </table>
  ) : (
    <table className="table pricingList">
      <thead>
        <tr>
          <th scope="col">{title}</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody>{content}</tbody>
    </table>
  );
}
