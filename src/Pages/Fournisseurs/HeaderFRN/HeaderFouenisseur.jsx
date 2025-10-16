import React, { useState } from "react";
import "./HeaderFournisseur.css";
import { Bell, Menu, X, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function HeaderFournisseur() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  // 🔹 Récupération du fournisseur et du token depuis localStorage
  const fournisseur = JSON.parse(localStorage.getItem("fournisseur"));
  const token = localStorage.getItem("token");

  // 🔹 Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem("fournisseur");
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
          {/* === MENU BURGER === */}
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* === LOGO === */}
          <div className="header-logo">
            <h2>Nir'Shop</h2>
            <span>com</span>
          </div>

          {/* === NAVIGATION PRINCIPALE === */}
          <div className="header-right">
            <Link to="/fournisseur/produits">
              <button className="btn">Mes Produits</button>
            </Link>

            <Link to="/fournisseur/commandes">
              <button className="btn">Commandes</button>
            </Link>

            <Link to="/fournisseur/compte">
              <button className="btn">Mon Compte</button>
            </Link>

            <Link to="/fournisseur/aide">
              <button className="btn">Centre d’aide</button>
            </Link>

            <span className="btn">|</span>

            {fournisseur && token && (
              <>
                <p className="nomFRN" style={{ textAlign: "center" }}>
                  Bonjour <strong>{fournisseur.nomFournisseur}</strong>
                </p>
                <button
                  onClick={() => setShowDialog(true)}
                  className="btn-logout"
                  style={{
                    backgroundColor: "transparent",
                    color: "red",
                    borderRadius: "20px",
                    border: "1px solid red",
                    padding: "10px"
                  }}
                  
                >
                  Se déconnecter
                </button>
              </>
            )}

            {/* === NOTIFICATIONS === */}
            <div className="cart-btn">
              <Bell size={22} />
              <span className="cart-count">2</span>
            </div>

            {/* === ICÔNE RECHERCHE (mobile) === */}
            <button id="icons-recherche" className="cart-btn">
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* === BARRE BLEUE TITRE SECTION === */}
        <div className="header-footer">
          <div className="header-search">
            <h1 style={{ color: "white", textAlign: "center" }}>
              Tableau de bord Fournisseur
            </h1>
          </div>
        </div>

        {/* === MENU MOBILE === */}
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
              <li><Link to="/fournisseur">Accueil</Link></li>
              <li><Link to="/fournisseur/produits">Mes Produits</Link></li>
              <li><Link to="/fournisseur/commandes">Commandes</Link></li>
              <li><Link to="/fournisseur/compte">Mon Compte</Link></li>
              <li><Link to="/fournisseur/aide">Centre d’aide</Link></li>
            </ul>
          </div>

          <div className="mobile-bottom">
            {fournisseur && token ? (
              <>
                <p style={{ textAlign: "center" }}>
                  Bonjour <strong>{fournisseur.nomFournisseur}</strong>
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
            ) : (
              <>
                <Link to="/connexion" className="login-btn">
                  Se connecter
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* === MODAL DE DÉCONNEXION === */}
      {showDialog && (
        <div className="modal-overlay" onClick={() => setShowDialog(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Confirmation</h3>
            <p>Voulez-vous vraiment vous déconnecter ?</p>
            <div className="modal-buttons">
              <button
                className="btn-cancel"
                onClick={() => setShowDialog(false)}
              >
                Annuler
              </button>
              <button className="btn-confirm" onClick={handleLogout}>
                Oui, se déconnecter
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
