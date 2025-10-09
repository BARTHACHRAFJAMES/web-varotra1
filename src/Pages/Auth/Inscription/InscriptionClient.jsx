import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // ✅ Ajouter import Link
import { User, Home, Mail, Lock } from 'lucide-react';
import './InscriptionClient.css';

export default function InscriptionClient() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    adresse: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Ici tu peux appeler ton API pour l'inscription
  };

  return (
    <div className="form-container">
      <form className="inscription-form" onSubmit={handleSubmit}>
        <h2>Inscription Client</h2>

        <div className="input-group">
          <User className="icon" />
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <User className="icon" />
          <input
            type="text"
            name="prenom"
            placeholder="Prénom"
            value={formData.prenom}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <Home className="icon" />
          <input
            type="text"
            name="adresse"
            placeholder="Adresse"
            value={formData.adresse}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <Mail className="icon" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <Lock className="icon" />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <Lock className="icon" />
          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirmer le mot de passe"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">S'inscrire</button>

        <div className="login-link" style={{textAlign: "center"}}>
          <span>Vous avez déjà un compte ? </span>
          <Link to="/">Connexion</Link>
        </div>
      </form>
    </div>
  );
}
