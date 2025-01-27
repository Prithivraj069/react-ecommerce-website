import React,{useState} from 'react'
import {Link, useLocation} from 'wouter';
import profile from './images/profile-user.png';
import brand from './images/brand.webp';


export default function Navbar() {
    const [isNavbarShowing, setNavShowing] = useState(false);
    const [location] = useLocation();

    const toggleNavbar = () => {
      setNavShowing(!isNavbarShowing);
      console.log("toggle")
    }

    return (
        <>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
              <a className="navbar-brand" href="#">
                <img src={brand} alt="brand logo" style={{height:'40px', width: '40px', borderRadius: '50%'}} className="me-2"></img>
                QuickPicker</a>
              <button
                className="navbar-toggler"
                type="button"
                 onClick={toggleNavbar}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className={`collapse navbar-collapse ${isNavbarShowing ? "show" : ""}`} 
                 id="navbarNav">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <Link className={`nav-link ${location == '/' ? 'active' : ''}`} aria-current="page" href="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link ${location == '/products' ? 'active' : ''}`} href="/products">Products</Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link ${location == '/cart' ? 'active' : ''}`} href="/cart">Cart</Link>
                  </li>
                  <li className="nav-item">
                  <Link className={`nav-link ${location == '/profile' ? 'active' : ''}`} href="/profile">Profile</Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link ${location == '/userLogin' ? 'active' : ''}`} href="/userLogin">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link ${location == '/register' ? 'active' : ''}`} href="/register">Register</Link>
                  </li>
                  <li className="nav-item">
                  <Link className={`nav-link ${location == '/profile' ? 'active' : ''}`} href="/profile">
                  <img src={profile} alt="profile image" style={{height:'40px', width: '40px'}}></img>
                  </Link>
                    </li> 
                </ul>
              </div>
            </div>
          </nav>
        </>
    )
}