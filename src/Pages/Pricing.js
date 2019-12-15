import React, { Fragment } from "react";
import Navbar from "../components/layout/Navbar";
import PricingList from "../components/pricing/PricingList";

let digitalPhotos = [
  {
    name: "5",
    price: "1500 NOK"
  },
  {
    name: "10",
    price: "2500 NOK"
  },
  {
    name: "20",
    price: "4000 NOK"
  },
  {
    name: "30",
    price: "5000 NOK"
  }
];

export default function Pricing() {
  return (
    <Fragment>
      <Navbar />
      <div
        style={{
          height: "70px"
        }}
      ></div>
      <div className="container ">
        <h2 className="text-center">Photo sessions</h2>
        <p>
          Session length is about 2h. Depending on your choice. Baby sessions
          are shorter - up to 45min. You know how babies are...
        </p>
        <PricingList />
        <h3>Baby</h3>{" "}
        <p className="text-justify">
          I have good experience with photography of children of all ages. 1
          year old is a wonderful time of play and fun. It keeps bringing a few
          shifts, as the child is usually provided after that. If you are
          wondering what the child is going to wear during photography, I will
          be happy to help you. Feel free to take a few different shifts so we
          can look at it together. If you want pictures with bare skin, it is
          advisable not to wear tight clothing that makes marks on your skin. If
          there are any toys or teddy bears the child is very fond of, bring
          them. Otherwise, I have everything needed to get nice pictures of the
          child. It is nice if we can find a time of day that is favorable for
          the child, that is, the child is rested and satisfied. Then I have the
          greatest opportunity to bring out the best smiles.
        </p>
        <h3>Family</h3>
        <p className="text-justify">
          Taking pictures of siblings is an important memory to have. Dress in
          the same shades of color, avoid capitalized clothing and the pressure
          it takes away from you. Recommend to book the photo shoot at a time
          when the kids are obvious.
        </p>
         <h3>Portrait</h3>
        <p className="text-justify">
          Confirmation time is a time when you have finally grown up. It is
          about for posterity to document an important time in life.
          Confirmation pictures can be taken in many ways. It doesn't have to be
          boring! I take pictures that both the parents and the confirmant want.
          Feel free to bring two different shifts. I can take in both the fine
          station and everyday clothes. We can also take pictures outside if
          desired
        </p>
         <h3>Event</h3>
        <p className="text-justify">
          A special offer for you who are pregnant. Photograph yourself as
          pregnant alone or with your boyfriend - it's a time you will never
          have again. If you order pregnancy photography now you will get “My
          first portrait” on the purchase when the baby arrives. It's a little
          up to you whether you want to bring or without clothes. Wear me
          clothes that show the shape of the stomach. If you want pictures with
          bare skin, it is advisable not to use tight clothing that makes marks
          on the skin.
        </p>
        <h2>Digital Photos</h2>
        <p className="text-justify">
          Each photo is professionally edited. You will receive each photo in
          high quality so that You can print it and frame it if you wish. Each
          photo comes in color, black/white, high resolution for print, low
          resolution for instagram and other websites.
        </p>
        <PricingList title="Digital Photos" items={digitalPhotos} />
        <p className="text-left">
          <i>Each additional photo 200Nok</i>
        </p>
        <p className="text-left">
          It is recommended that you also back up your digital photos yourself{" "}
        </p>
        <ul>
          <li>Photography is payable on the day of photography.</li>
          <li>Picture products are paid in full at the time of order.</li>
          <li> Payment is by card or toggle.</li>
          <li>
            Pictures are kept in a safe system for 10 years from the date of the
            photograph, and it will be possible during this time to re-order
            pictures / products.Just get in touch.
          </li>
        </ul>
      </div>
    </Fragment>
  );
}
