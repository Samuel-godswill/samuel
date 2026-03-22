import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/explore" className={({ isActive }) => isActive ? 'active' : ''}>
            Explore
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;