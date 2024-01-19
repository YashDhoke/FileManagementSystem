import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className='my-8'>
      <h1 className='text-7xl'>Welcome to FileDrive</h1>
      <h2 className='text-4xl my-8'>
        Manage your files with ease!
      </h2>
      {currentUser ? (
        <>
          <p className='text-center my-5 text-5xl'>
            View Your Files
          </p>
          <Link to={'/profile'}>
            <span className='text-blue-700 flex justify-center text-2xl'>Go to Profile</span>
          </Link>
        </>
      ) : (
        <>
          <p className='text-center my-5 text-5xl'>
            Get Started
          </p>
          <Link to={'/sign-up'}>
            <span className='text-blue-700 flex justify-center text-2xl'>Sign Up</span>
          </Link>
          <span className='text-blue-700 flex justify-center text-2xl'>
            &nbsp;|&nbsp;
          </span>
          <Link to={'/sign-in'}>
            <span className='text-blue-700 flex justify-center text-2xl'>Sign In</span>
          </Link>
        </>
      )}
    </div>
  );
}
