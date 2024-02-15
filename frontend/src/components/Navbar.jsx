import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBlog, faBarsStaggered, faTimes } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // TOGGLE MENU
  const toggleMenu = () => {
    setisMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // NAV ITEMS
  const navItems = [
    { link: 'Home', path: '/' },
    { link: 'About', path: '/about' },
    { link: 'Shop', path: '/shop' },
    { link: 'Sell your Book', path: '/admin/dashboard' },
    { link: 'Blog', path: '/blog' },
  ];

  return (
    <header>
      <nav className={` ${isSticky ? 'sticky' : ''} bg-white shadow-md p-4`}>
        <div className="flex items-center justify-between">
          {/* logo */}
          <Link to="/" className="text-2xl font-bold text-blue-700 flex items-center gap-2">
            <FontAwesomeIcon icon={faBlog} size='2x' /> Books
          </Link>

          {/* Nav Items for large devices */}
          <ul className='hidden md:flex space-x-11'>
            {navItems.map(({ link, path }) => (
              <li key={link}>
                <Link to={path} className='block text-base text-black uppercase cursor-pointer hover:text-blue-700'>
                  {link}
                </Link>
              </li>
            ))}
          </ul>

          {/* Button for large devices */}
          <button className='w-5 hover:text-blue-700' onClick={toggleMenu}>
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBarsStaggered} />
          </button>

          {/* Menu button for mobile devices */}
          <div className='md:hidden'>
            <button onClick={toggleMenu} className='text-black focus:outline-none' aria-label="Toggle Menu">
              <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBarsStaggered} className='h-5 w-5 text-black' />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <ul className='md:hidden space-y-3'>
            {navItems.map(({ link, path }) => (
              <li key={link}>
                <Link to={path} className='block text-base text-black uppercase cursor-pointer hover:text-blue-700'>
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* Nav items for small devices */}
        <div className=''></div>
      </nav>
    </header>
  );
}

export default Navbar;
