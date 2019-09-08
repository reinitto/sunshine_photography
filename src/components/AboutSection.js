import React, { Fragment } from 'react';
import ContactForm from './contact/ContactForm';
import { faHome, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

About.defaultProps = {
  paragraphs: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec laoreet euismod libero a vulputate. Sed eu lorem id ante pulvinar elementum sit amet vel risus. Donec malesuada eu enim sit amet consequat. Curabitur aliquam sollicitudin magna sit amet venenatis. Suspendisse id gravida urna. Aenean non libero vitae tortor suscipit tincidunt ut eu elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi iaculis viverra velit vitae aliquet. Integer quis sapien vulputate, pulvinar sem at, ullamcorper neque.`,
    `Nulla hendrerit libero id diam aliquet, dapibus tempus nibh accumsan. Vivamus vulputate metus ut felis cursus fringilla. Duis condimentum ac sem vel euismod. Phasellus quis semper nisl. Nullam in malesuada ante. Fusce lobortis nunc et nibh vulputate vestibulum. Nunc laoreet arcu vitae mi hendrerit, et varius enim euismod. Mauris nibh felis, ultrices at malesuada vitae, hendrerit eget odio. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce libero felis, ullamcorper non dolor ultrices, consectetur egestas nisl. Cras id mollis massa. Praesent faucibus purus ac efficitur feugiat. Duis eu euismod diam, sed efficitur magna. Etiam ultricies arcu vel nulla posuere pulvinar.`,
    `Phasellus porta molestie dui id tincidunt. Proin luctus odio ac neque feugiat laoreet. Donec eu velit dolor. Morbi porta non velit quis sagittis. Pellentesque elementum eget tellus quis fermentum. Morbi nunc libero, suscipit id dolor quis, porta consequat diam. Phasellus purus est, varius quis libero at, commodo lobortis massa. Suspendisse eget dictum nunc, commodo mollis dui.`
  ],
  image:
    'https://cdn.pixabay.com/photo/2014/03/25/16/54/user-297566_960_720.png',
  contactInfo: {
    email: 'info@gmail.com',
    phone: '+ 01 234 567 88',
    area: 'Telemark/ Norway'
  },
  social: {
    facebook: 'http://www.facebook.com',
    instagram: 'http://www.instagram.com'
  }
};

const icons = {
  email: faEnvelope,
  phone: faPhone,
  area: faHome,
  facebook: faFacebook,
  instagram: faInstagram
};

const ContactInfo = ({ contactInfo, social }) => {
  return (
    <div className='col-md-4 col-lg-3 col-xl-3 mt-3'>
      {contactInfo &&
        Object.keys(contactInfo).length > 0 &&
        Object.keys(contactInfo).map((item, i) => (
          <p key={i}>
            <FontAwesomeIcon icon={icons[item]} className='mr-3' />
            {contactInfo[item]}
          </p>
        ))}
      <ul>
        {social &&
          Object.keys(social).map((item, i) => (
            <li className='list-inline-item' key={i}>
              <a
                target='_blank'
                rel='noopener noreferrer'
                href={item}
                className='btn-floating btn-sm rgba-white-slight mx-1'
              >
                <FontAwesomeIcon icon={icons[item]} className='mr-3' />
              </a>
            </li>
          ))}
      </ul>
      <a
        target='_blank'
        href='http://www.shutterstock.com'
        rel='noopener noreferrer'
      >
        Shutterstock
      </a>
    </div>
  );
};

export default function About({ image, paragraphs, contactInfo, social }) {
  return (
    <div className='about-section'>
      <h1>About Me</h1>
      <div className='row'>
        <div className='col-8'>
          {paragraphs.map((par, i) => (
            <p key={i}>{par}</p>
          ))}
        </div>
        <div className='col-4'>
          <img className='img-fluid' src={image} alt='portrait' />
        </div>
      </div>
      <ContactInfo contactInfo={contactInfo} social={social} />
    </div>
  );
}
