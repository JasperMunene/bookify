import React, { useEffect, useState } from 'react'

function Navbar() {
    const  [isMenuOpen , setisMenuOpen] = useState(false);
    const [isSticky  , setIsSticky ] = useState(false) ;

    //TOGGLE MENU
    const toggleMenu = () => {
        setisMenuOpen(!isMenuOpen);
    }

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > 100) {
                setIsSticky(true)
            } else {
                setIsSticky(false)
            }
        }

        window.addEventListener(scroll, handleScroll);

        return () => {
            window.addEventListener(scroll, handleScroll)
        }
    }, []);

    //NAV ITEMS
    const navItems = [
        {link: "Home", path: '/'},
        {link: "About", path: '/about'},
        {link: "Shop", path: '/shop'},
        {link: "Sell your Book", path: '/admin/dashboard'},
        {link: "Blog", path: '/blog'},
    ]
  return (
    <header>
        <nav>
            <div></div>
        </nav>
    </header>
  )
}

export default Navbar