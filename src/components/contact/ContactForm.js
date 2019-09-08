import React, { Fragment } from 'react';

export default function ContactForm() {
  return (
    <Fragment>
      <h2>Contact Me</h2>
      <form>
        <div className='form-group'>
          <label htmlFor='exampleName'>Name</label>
          <input
            type='text'
            className='form-control'
            id='exampleName'
            aria-describedby='nameHelp'
            placeholder='Enter your name'
          />
          <small id='nameHelp' className='form-text text-muted'>
            What should I call you?
          </small>
        </div>
        <div className='form-group'>
          <label htmlFor='exampleInputTelephone'>Phone number</label>
          <input
            type='tel'
            className='form-control'
            id='exampleInputTelephone'
            aria-describedby='phoneHelp'
            placeholder='Enter phone number'
          />
          <small id='phoneHelp' className='form-text text-muted'>
            We'll never share your phone number with anyone
          </small>
        </div>
        <div className='form-group'>
          <label htmlFor='exampleInputAddress'>Address</label>
          <input
            type='text'
            className='form-control'
            id='exampleInputAddress'
            aria-describedby='addressHelp'
            placeholder='Enter your address'
          />
          <small id='addressHelp' className='form-text text-muted'>
            We'll never share your address with anyone
          </small>
        </div>
        <div className='form-group'>
          <label htmlFor='exampleInputEmail1'>Email address</label>
          <input
            type='email'
            className='form-control'
            id='exampleInputEmail1'
            aria-describedby='emailHelp'
            placeholder='Enter email'
          />
          <small id='emailHelp' className='form-text text-muted'>
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className='form-group'>
          <label htmlFor='exampleInputMessage'>Message: </label>
          <textarea
            className='form-control'
            id='exampleInputMessage'
            placeholder='Your Message...'
            rows='10'
            cols='70'
          />
        </div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </Fragment>
  );
}
