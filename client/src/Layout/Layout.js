import React from 'react';
import Footer from './Footer/Footer.jsx';
import NavBar from './NavBar/NavBar.jsx';
import MobileFooter from './Footer/MobileFooter.jsx';

function Layout({ children, hideFooter, transparentNav, hideNav }) {
    return (
        <div className={`relative min-h-screen ${transparentNav ? 'bg-transparent' : 'bg-dry'} text-white`}>
            {!hideNav && (
                <NavBar transparent={transparentNav} absolute={transparentNav} />
            )}
            <div className="flex-grow">
                {children}
            </div>
            {!hideFooter && (
                <>
                    <Footer />
                    <MobileFooter />
                </>
            )}
        </div>
    );
}

export default Layout;
