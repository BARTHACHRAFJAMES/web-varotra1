import React from "react";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";
import "./FooterPage.css";

export default function FooterPage() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* ==== Colonne 1 : Logo / description ==== */}
        <div className="footer-col">
          <h2 className="footer-logo">Nir’Shop</h2>
          <p className="footer-text">
            Votre boutique en ligne préférée pour découvrir des produits de qualité
            au meilleur prix. Livraison rapide et service client réactif !
          </p>
        </div>

        {/* ==== Colonne 2 : Liens rapides ==== */}
        <div className="footer-col">
          <h3>Liens rapides</h3>
          <ul>
            <li><a href="/">Accueil</a></li>
            <li><a href="/produits">Produits</a></li>
            <li><a href="/categories">Catégories</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/a-propos">À propos</a></li>
          </ul>
        </div>

        {/* ==== Colonne 3 : Contact ==== */}
        <div className="footer-col">
          <h3>Contact</h3>
          <p><MapPin size={16} /> Antananarivo, Madagascar</p>
          <p><Phone size={16} /> +261 34 00 000 00</p>
          <p><Mail size={16} /> contact@nirshop.com</p>
        </div>

        {/* ==== Colonne 4 : Réseaux ==== */}
        <div className="footer-col">
          <h3>Suivez-nous</h3>
          <div className="social-icons">
            <a href="#"><Facebook size={18} /></a>
            <a href="#"><Instagram size={18} /></a>
            <a href="#"><Twitter size={18} /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Nir’Shop — Tous droits réservés.</p>
      </div>
    </footer>
  );
}
