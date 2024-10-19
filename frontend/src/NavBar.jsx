import React from 'react';

function NavBar() {
  return (
    <div className='NavBar'>
      <img src="images/commerzbank_logo.png" alt="Commerzbank Logo" />
      <div className='LoginLock'>
        <img src="images/LoginLock.png" alt="Lock Icon" />
        <span className="LoginText">Log out</span> {/* Added Login text */}
      </div>
    </div>
  );
}

export default NavBar;
