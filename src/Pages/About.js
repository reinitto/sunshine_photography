import React, { Fragment } from 'react';
import AboutSection from '../components/AboutSection';
import ContactForm from '../components/contact/ContactForm';
import Navbar from '../components/layout/Navbar';
export default function About() {
  return (
    <Fragment>
      <Navbar />
      <div className='container'>
        <AboutSection />
        <ContactForm />
      </div>
    </Fragment>
  );
}
