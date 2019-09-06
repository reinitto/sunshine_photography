import React, { Fragment } from 'react';

export default function ContactForm() {
  return (
    <Fragment>
      <h3>Contact Me</h3>
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
        <div className='form-check'>
          <input
            type='checkbox'
            className='form-check-input'
            id='exampleCheck1'
          />
          <label className='form-check-label' htmlFor='exampleCheck1'>
            Check me out
          </label>
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </Fragment>
  );
}
