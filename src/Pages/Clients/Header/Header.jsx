import React, { useEffect, useState } from "react";
import "./Header.css";
import { ShoppingCart, Heart, Menu, X, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";


export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  //Récupération du client et du token depuis localStorage
  const client = JSON.parse(localStorage.getItem("client"));
  const token = localStorage.getItem("token");

  //Fonction de déconnexion
  const confirmLogout = () => {
    localStorage.removeItem("client");
    localStorage.removeItem("token");
    setShowDialog(false);
    navigate("/"); // redirige vers la page d'accueil ou de connexion
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`header ${isScrolled ? "scrolled" : ""}`}>
        <div className="header-top">
          {/* Hamburger (mobile) */}
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
  
          {/* Logo */}
          <div className="header-logo">
            <h2>Nir'Shop</h2>
            <span>com</span>
          </div>
  
          {/* Right side buttons */}
          <div className="header-right">
            {client && token ? (
              <>
                {/*  Bouton de profil */}
                <Link to="/mon-compte">
                  <button className="btn">Bonjour {client.nom}</button>
                </Link>
  
                {/* Bouton déconnexion */}
                <button
                  onClick={() => setShowDialog(true)}
                  className="btn-logout"
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid red",
                    borderRadius: "20px",
                    padding: "5px 10px",
                    color: "red",
                    cursor: "pointer",
                  }}
                >
                  Se déconnecter
                </button>
              </>
            ) : (
              <>
                {/*Boutons de connexion/inscription */}
                <Link to="/connexion">
                  <button className="btn">Se Connecter</button>
                </Link>
                <Link to="/inscription">
                  <button className="btn">S'inscrire</button>
                </Link>
              </>
            )}
  
            <span className="btn">|</span>
            <Link><button className="btn">Commandes</button></Link>
            <Link><button className="btn">Mon Compte</button></Link>
            <Link>
              <button id="icons-recherche" className="cart-btn">
                <Search size={20} />
              </button>
            </Link>
            <Link className="heart">
              <button className="cart-btn">
                <Heart size={20} color="red" />
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
  
        {/* Barre de recherche */}
        <div className="header-footer">
          <div className="header-search">
            <input type="text" placeholder="Rechercher catégories, brands..." />
            <button>Rechercher</button>
          </div>
        </div>
  
        {/* Menu mobile */}
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <div>
            <button className="close-btn" onClick={() => setMenuOpen(false)}>
              <X size={18} />
            </button>
            <div className="header-logo" id="logo">
              <h2>Nir'Shop</h2>
              <span>com</span>
            </div>
  
            <ul className="list">
              <li><Link>Accueil</Link></li>
              <li><Link>Achat par catégories</Link></li>
              <li><Link>Commandes</Link></li>
              <li><Link>Mon Compte</Link></li>
              <li><Link>Centre d'aide</Link></li>
            </ul>
          </div>
  
          <div className="mobile-bottom">
            {client && token ? (
              <>
                <p style={{textAlign: "center"}}>Bonjour <span>{client.nom}</span></p>
                <button
                  onClick={() => setShowDialog(true)}
                  className="register-btn"
                  style={{ backgroundColor: "red", color: "white", borderRadius: "20px", border: "none" }}
                >
                  Se déconnecter
                </button>
              </>
            ) : (
              <>
                <Link to="/connexion" className="login-btn" style={{ color: "white" }}>
                  Se Connecter
                </Link>
                <Link to="/inscription" className="register-btn">
                  S'inscrire
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
  
       {/* MODAL DE CONFIRMATION */}
       {showDialog && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirmation</h3>
            <p>Voulez-vous vraiment vous déconnecter ?</p>
  
            <div className="modal-buttons">
              <button
                className="btn-cancel"
                onClick={() => setShowDialog(false)}
              >
                Annuler
              </button>
              <button className="btn-confirm" onClick={confirmLogout}>
                Oui, se déconnecter
              </button>
            </div>
          </div>
        </div>
      )}
  </>
  );
}
