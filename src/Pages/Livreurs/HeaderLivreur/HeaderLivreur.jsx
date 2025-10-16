import React, { useState } from "react";
import { Bell, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./HeaderLivreur.css";

export default function HeaderLivreur() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  // Récupération du livreur et du token depuis localStorage
  const livreur = JSON.parse(localStorage.getItem("livreur"));
  const token = localStorage.getItem("token");

  // Fonction finale de déconnexion
  const confirmLogout = () => {
    localStorage.removeItem("livreur");
    localStorage.removeItem("token");
    setShowDialog(false);
    navigate("/connexion");
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
            {livreur && token ? (
              <>
                <Link to="/mon-compte">
                  <button className="btn">Bonjour {livreur.nomLivreur}</button>
                </Link>

                {/* Bouton déconnexion → affiche la boîte de confirmation */}
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
            ) : null}

            <span className="btn">|</span>
            <Link>
              <button className="cart-btn">
                <Bell size={20} />
                <span className="cart-count">0</span>
              </button>
            </Link>
            <Link>
              <button className="btn">Mon Compte</button>
            </Link>
          </div>
        </div>

        {/* Barre de recherche */}
        <div className="header-footer">
          <div className="header-search">
            <h1 style={{ color: "white", textAlign: "center" }}>Livreur</h1>
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
              <li><Link>Mes courses du jour</Link></li>
              <li><Link>Mon Compte</Link></li>
              <li><Link>Centre d'aide</Link></li>
            </ul>
          </div>

          <div className="mobile-bottom">
            {livreur && token ? (
              <>
                <p style={{ textAlign: "center" }}>
                  Bonjour <span>{livreur.nomLivreur}</span>
                </p>
                <button
                  onClick={() => setShowDialog(true)}
                  className="register-btn"
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "20px",
                    border: "none",
                  }}
                >
                  Se déconnecter
                </button>
              </>
            ) : null}
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
