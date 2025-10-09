import React from 'react';
import { Link } from 'react-router-dom';
import { User, Package, Truck } from 'lucide-react';
import './OptionInscription.css';

export default function OptionInscription() {
  return (
    <div className="container">
      <div className="option-container">
        <Link to="/" className="back-arrow">← Retour</Link>
        <h2>Je vais m'inscrire en tant que</h2>
        <div className="options">
          <div>
            <Link to="/inscription/client" className="option-card client">
              <User className="icon" />
              Client
            </Link>
          </div>
          <div>
            <Link to="/inscription/fournisseur" className="option-card fournisseur">
              <Package className="icon" />
              Fournisseur
            </Link>
          </div>
          <div>
            <Link to="/inscription/livreur" className="option-card livreur">
              <Truck className="icon" />
              Livreur
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
