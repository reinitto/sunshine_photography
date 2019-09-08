import React, { Fragment } from 'react';
import ContactForm from '../components/contact/ContactForm';
import Navbar from '../components/layout/Navbar';

export default function Contact() {
  return (
    <Fragment>
      <Navbar />
      <div className='container'>
        <ContactForm />
      </div>
    </Fragment>
  );
}
