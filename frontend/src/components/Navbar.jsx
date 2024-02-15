import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBlog } from '@fortawesome/free-solid-svg-icons';

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
    <nav className={isSticky ? 'sticky' : ''}>
      <div>
        {/* logo */}
        <Link to="/" className="text-2xl font-bold text-blue-700 items-center gap-2">
          <FontAwesomeIcon icon={faBlog} /> Books
        </Link>

        {/* Nav Items for large devices */}
        <ul className='md:flex space-x-11 hidden'>
          {navItems.map(({ link, path }) => (
            <li key={link}>
              <Link to={path} className='block text-base text-black uppercase cursor-pointer hover:text-blue-700'>
                {link}
              </Link>
            </li>
          ))}
        </ul>

        {/* Button for large devices */}
        <div>
          
        </div>
      </div>
    </nav>
  </header>
);

}

export default Navbar;
