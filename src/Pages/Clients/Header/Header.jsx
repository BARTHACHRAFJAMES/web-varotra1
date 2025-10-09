import React, { useState } from "react";
import "./Header.css";
import { ShoppingCart, Heart, Menu, X, Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-top">
        {/* Hamburger (mobile) */}
        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? null : <Menu size={20} />}
        </button>

        {/* Logo */}
        <div className="header-logo">
          <h2>Nir'Shop</h2>
          <span>com</span>
        </div>

        {/* Search bar (hidden on mobile) */}
        {/* <div className="header-search">
          <input type="text" placeholder="Search for products, brands..." />
          <button>Search</button>
        </div> */}

        {/* Right side buttons */}
        <div className="header-right">
          <Link><button className="btn">Se Connecter</button></Link>
          <Link to="/inscription"><button className="btn">S'Inscrire</button></Link>
          <span className="btn">|</span>
          <Link><button className="btn">Commandes</button></Link>
          <Link><button className="btn">Mon Compte</button></Link>
          <Link>
            <button id="icons-recherche" className="cart-btn">
              <Search size={20}/>
            </button>
          </Link>
          <Link>
            <button className="cart-btn">
              <Heart size={20} color="red"/>
            </button>
          </Link>
          <Link>
            <button className="cart-btn">
              <ShoppingCart size={20} />
              <span className="cart-count">0</span>
            </button>
          </Link>
        </div>
      </div>
      <div className="header-footer">
        <div className="header-search">
          <input type="text" placeholder="Search for products, brands..." />
          <button>Search</button>
        </div> 
      </div>

      {/* Sidebar menu (mobile) */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
         {/* Logo */}
        <div>
            {/* Bouton pour fermer */}
            <button className="close-btn" onClick={() => setMenuOpen(false)}>
              <X size={18} />
            </button>
            <div className="header-logo" id="logo">
              <h2>Nir'Shop</h2>
              <span>com</span>
            </div>
    
            <ul className="list">
              <li><Link>Acceuil</Link></li>
              <li><Link>Achat par catégories</Link></li>
              <li><Link>Commandes</Link></li>
              <li><Link>Mon Compte</Link></li>
              <li><Link>Centre d'aide</Link></li>
            </ul>
        </div>

        <div className="mobile-bottom">
          <Link className="login-btn" style={{color: "white"}}>Se Connecter</Link>
          <Link className="register-btn">S'Inscrire</Link>
        </div>
      </div>
    </header>
  );
}
