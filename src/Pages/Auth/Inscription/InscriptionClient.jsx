import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Home, Mail, Lock, Loader2 } from 'lucide-react';
import './InscriptionClient.css';
import { BASE_URL } from '../../../Utils/URL';

export default function InscriptionClient() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    adresse: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [errors, setErrors] = useState({});
  const [passwordMessage, setPasswordMessage] = useState('');
  const [globalMessage, setGlobalMessage] = useState(null);
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);

  // Fonction de validation email
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  // Fonction de changement de champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Vérification du mot de passe
    if (name === 'password') {
      if (value.length < 6) {
        setPasswordMessage('Au moins 6 caractères.');
        setTimeout(() => setPasswordMessage(''), 5000);
      } else {
        setPasswordMessage('Mot de passe sécurisé');
        setTimeout(() => setPasswordMessage(''), 5000);
      }
    }
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setGlobalMessage(null);
    setLoading(true);

    // Vérification email
    if (!validateEmail(formData.email)) {
      setErrors({ email: 'Veuillez entrer un email valide (ex: exemple@mail.com)' });
      setLoading(false);
      return;
    }

    // Vérification mot de passe
    if (formData.password !== formData.password_confirmation) {
      setErrors({ password_confirmation: 'Les mots de passe ne correspondent pas.' });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/clients/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        if (data.message) {
          setGlobalMessage(data.message);
          setMessageType('error');
        } else {
          setGlobalMessage('Une erreur est survenue.');
          setMessageType('error');
        }
        setTimeout(() => setGlobalMessage(null), 5000);
      } else {
        setGlobalMessage(data.message || 'Inscription réussie');
        setMessageType('success');
        setTimeout(() => setGlobalMessage(null), 5000);
        setTimeout(() => navigate(`/inscription/verifymailclient/${formData.email}`), 2000);
      }
    } catch (error) {
      console.error('Erreur:', error);
      setGlobalMessage('Erreur serveur, veuillez réessayer.');
      setMessageType('error');
      setTimeout(() => setGlobalMessage(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form className="inscription-form" onSubmit={handleSubmit}>
        <h2>Inscription Client</h2>

        {/* Message global (succès ou erreur) */}
        {globalMessage && (
          <p className={`global-message ${messageType === 'success' ? 'success-text' : 'error-text'}`}>
            {globalMessage}
          </p>
        )}

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
        {errors.nom && <p className="error-text">{errors.nom}</p>}

        <div className="input-group">
          <User className="icon" />
          <input
            type="text"
            name="prenom"
            placeholder="Prénom"
            value={formData.prenom}
            onChange={handleChange}
          />
        </div>
        {errors.prenom && <p className="error-text">{errors.prenom}</p>}

        <div className="input-group">
          <Home className="icon" />
          <input
            type="text"
            name="adresse"
            placeholder="Adresse"
            value={formData.adresse}
            onChange={handleChange}
          />
        </div>
        {errors.adresse && <p className="error-text">{errors.adresse}</p>}
        {errors.email && <p className="error-text">{errors.email}</p>}

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
        
        {passwordMessage && (
          <p className={`password-text ${formData.password.length < 6 ? 'error-text' : 'success-text'}`}>
            {passwordMessage}
          </p>
        )}
        {errors.password && <p className="error-text">{errors.password}</p>}
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
        
        {errors.password_confirmation && (
          <p className="error-text">{errors.password_confirmation}</p>
        )}
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
       

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} /> &nbsp; Inscription...
            </>
          ) : (
            "S'inscrire"
          )}
        </button>

        <div className="login-link" style={{textAlign: "center"}}>
          <span>J'ai déjà un compte ? </span>
          <Link to="/connexion">Connexion</Link>
        </div>
      </form>
    </div>
  );
}
