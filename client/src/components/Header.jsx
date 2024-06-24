import React from 'react';
import './css/Header.css';
import Logo from '/logo.png'

function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <img src={Logo} alt="Google Meet" />
        <span>Google Meet</span>
      </div>
      <div className="header-options">
        {/* <button>Join a meeting</button>
        <button>Start a meeting</button> */}
      </div>
    </header>
  );
}

export default Header;
