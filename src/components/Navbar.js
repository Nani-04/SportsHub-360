import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const styles = {
    nav: {
      display: 'flex',
      justifyContent: 'space-around',
      padding: '10px',
      background: '#1976d2',
      color: 'white',
    },
    link: {
      color: 'white',
      textDecoration: 'none',
      fontSize: '18px',
    },
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link}>Home</Link>
      <Link to="/about" style={styles.link}>About</Link>
      <Link to="/contact" style={styles.link}>Contact</Link>
    </nav>
  );
};

export default Navbar;
