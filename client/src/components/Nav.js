import '../style/Nav.css';
import { useState } from 'react';

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <nav className={`navbar ${isOpen ? 'open' : ''}`}>

        <a className='pretrip'>
          <span>PreTrip</span>
        </a>
        <ul className='nav-menu'>
          <li><a>Spot</a></li>
          <li><a>Calendar</a></li>
        </ul>

        <ul className='nav-menu'>
          <li><a>Login</a></li>
          <li className='division'>|</li>
          <li><a>Sign Up</a></li>
        </ul>

        <button className='nav-toggle' onClick={handleMenuToggle}>
          <i class="fa-solid fa-bars"></i>
        </button>
      </nav>
    </div>
  );
}

export default Nav;