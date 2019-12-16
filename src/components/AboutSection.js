import React from "react";
import {
  faHome,
  faEnvelope,
  faPhone,
  faCamera
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

About.defaultProps = {
  paragraphs: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec laoreet euismod libero a vulputate. Sed eu lorem id ante pulvinar elementum sit amet vel risus. Donec malesuada eu enim sit amet consequat. Curabitur aliquam sollicitudin magna sit amet venenatis. Suspendisse id gravida urna. Aenean non libero vitae tortor suscipit tincidunt ut eu elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi iaculis viverra velit vitae aliquet. Integer quis sapien vulputate, pulvinar sem at, ullamcorper neque.`,
    `Nulla hendrerit libero id diam aliquet, dapibus tempus nibh accumsan. Vivamus vulputate metus ut felis cursus fringilla. Duis condimentum ac sem vel euismod. Phasellus quis semper nisl. Nullam in malesuada ante. Fusce lobortis nunc et nibh vulputate vestibulum. Nunc laoreet arcu vitae mi hendrerit, et varius enim euismod. Mauris nibh felis, ultrices at malesuada vitae, hendrerit eget odio. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce libero felis, ullamcorper non dolor ultrices, consectetur egestas nisl. Cras id mollis massa. Praesent faucibus purus ac efficitur feugiat. Duis eu euismod diam, sed efficitur magna. Etiam ultricies arcu vel nulla posuere pulvinar.`
  ],
  image:
    "https://cdn.pixabay.com/photo/2014/03/25/16/54/user-297566_960_720.png",
  contactInfo: {
    email: "info@gmail.com",
    phone: "+ 01 234 567 88",
    area: "Telemark/ Norway"
  },
  social: {
    facebook: "https://www.facebook.com",
    instagram: "https://www.instagram.com",
    shutterstock: "https://www.shutterstock.com"
  },
  backgroundImage:
    "https://res.cloudinary.com/sunshinephoto/image/upload/c_scale,w_1000/images/backgrounds/IMG_8997_1500_ymk08l.jpg"
};

const icons = {
  email: faEnvelope,
  phone: faPhone,
  area: faHome,
  facebook: faFacebook,
  instagram: faInstagram,
  shutterstock: faCamera
};

const ContactInfo = ({ contactInfo, social }) => {
  return (
    <div className="row">
      <div className="col-md-4 col-lg-3 col-xl-3">
        {contactInfo &&
          Object.keys(contactInfo).length > 0 &&
          Object.keys(contactInfo).map((item, i) => (
            <p key={i} className="contact-info-item">
              <FontAwesomeIcon icon={icons[item]} className="mr-3" />
              {contactInfo[item]}
            </p>
          ))}
      </div>
      <ul className="col-md-8 about-social">
        {social &&
          Object.keys(social).map((item, i) => (
            <li key={i}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={social[item]}
                className=" mx-auto"
              >
                <div>
                  <FontAwesomeIcon icon={icons[item]} size={"2x"} />
                </div>
                <p>{Object.keys(social)[i]}</p>
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default function About({
  image,
  paragraphs,
  contactInfo,
  social,
  backgroundImage,
  title = true
}) {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        /* Create the parallax scrolling effect */
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }}
    >
      <div className="container">
        <div className="about-section text-white">
          {title ? <h1>About Me</h1> : null}
          <div className="row">
            <div className="col-8">
              {paragraphs.map((par, i) => (
                <p key={i} className="text-justify">
                  {par}
                </p>
              ))}
            </div>
            <div className="col-4">
              <img className="img-fluid" src={image} alt="portrait" />
            </div>
          </div>
          <ContactInfo contactInfo={contactInfo} social={social} />
        </div>
      </div>
    </div>
  );
}
