import React from 'react';
import { Link } from '@reach/router';

const Navbar = () => (
  <header className='bg-blue-900 sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-3 items-center'>
    <div className='flex justify-between items-center px-4 py-3 sm:p-0'>
      <div className='px-4 py-3 sm:p-0'>
        <Link to='/' className='font-semibold text-white'>
          Find My Pet
        </Link>
      </div>
      <div className='sm:hidden'>
        <button
          type='button'
          className='text-blue-300 block focus:text-blue-300 focus:outline-none hover:text-blue-300'
        >
          <svg className='h-6 w-6 fill-current'>
            <path
              className='heroicon-ui'
              d='M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z'
            />
          </svg>
        </button>
      </div>
    </div>
    <nav className='sm:flex sm:p-0 px-2 pt-2 pb-4 hidden'>
      <a
        className='block text-white px-2 py-1 hover:bg-blue-800 rounded'
        href='#'
      >
        About
      </a>
      <a
        className='block mt-1 text-white px-2 py-1 hover:bg-blue-800 rounded sm:ml-2 sm:mt-0'
        href='#'
      >
        Sign In
      </a>
      <a
        className='block mt-1 text-white px-2 py-1 bg-blue-800 rounded sm:ml-2 sm:mt-0'
        href='#'
      >
        Register
      </a>
    </nav>
  </header>
);

export default Navbar;