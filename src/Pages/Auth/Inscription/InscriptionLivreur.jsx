import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Home, Mail, Lock, Loader2, Calendar, IdCard } from 'lucide-react';
import './InscriptionFournisseur.css';
import { BASE_URL } from '../../../Utils/URL';

export default function InscriptionLivreur() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nomLivreur: '',
    prenomLivreur: '',
    adresseLivreur: '',
    emailLivreur: '',
    CIN: '',
    dateCINLivreur: '',
    lieuCINLivreur: '',
    dateNaissanceLivreur: '',
    passwordLivreur: '',
    passwordLivreur_confirmation: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [globalMessage, setGlobalMessage] = useState(null);
  const [messageType, setMessageType] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  // 🔁 Disparition automatique des messages après 5 secondes
  useEffect(() => {
    if (globalMessage || Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        setGlobalMessage(null);
        setErrors({});
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [globalMessage, errors]);

  // 🧠 Gérer la saisie
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🔒 Validation dynamique du mot de passe
  useEffect(() => {
    if (formData.passwordLivreur.length === 0) {
      setPasswordMessage('');
    } else if (formData.passwordLivreur.length < 6) {
      setPasswordMessage('Au moins 6 caractères.');
    } else {
      setPasswordMessage('Mot de passe valide');
    }
  }, [formData.passwordLivreur]);

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setGlobalMessage(null);

    if (formData.passwordLivreur !== formData.passwordLivreur_confirmation) {
      setErrors({ passwordLivreur_confirmation: ["Les mots de passe ne correspondent pas."] });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/livreur/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setGlobalMessage('Inscription réussie !');
        setMessageType('success');
        setTimeout(() => navigate(`/inscription/verifymaillivreur/${formData.emailLivreur}`), 2000);
      } else if (response.status === 422) {
        setErrors(data.errors || {});
        setGlobalMessage('Veuillez corriger les erreurs ci-dessous.');
        setMessageType('error');
      } else if (response.status === 409) {
        setErrors(data.errors || {});
        setGlobalMessage(data.errors?.email?.[0] || 'Cet email est déjà utilisé.');
        setMessageType('error');
      } else {
        setGlobalMessage('Une erreur est survenue. Veuillez réessayer.');
        setMessageType('error');
      }
    } catch (error) {
      console.error(error);
      setGlobalMessage('Erreur de connexion au serveur.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form className="inscription-form" onSubmit={handleSubmit}>
        <h2>Inscription Livreur</h2>

        {/* 🧾 Message global */}
        {globalMessage && (
          <p className={`global-message ${messageType === 'success' ? 'success-text' : 'error-text'}`}>
            {globalMessage}
          </p>
        )}

        {/* NOM + PRÉNOM */}
        <div className="control-div">
          <div className="input-group">
            <User className="icon" />
            <input
              type="text"
              name="nomLivreur"
              placeholder="Nom"
              value={formData.nomLivreur}
              onChange={handleChange}
              required
            />
            {errors.nomLivreur && <small className="error-text">{errors.nomLivreur[0]}</small>}
          </div>

          <div className="input-group">
            <User className="icon" />
            <input
              type="text"
              name="prenomLivreur"
              placeholder="Prénom"
              value={formData.prenomLivreur}
              onChange={handleChange}
              required
            />
            {errors.prenomLivreur && <small className="error-text">{errors.prenomLivreur[0]}</small>}
          </div>
        </div>

        {/* DATE NAISSANCE + ADRESSE */}
        <div className="control-div">
          <div className="input-group">
            <Calendar className="icon" />
            <input
              type="date"
              name="dateNaissanceLivreur"
              value={formData.dateNaissanceLivreur}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <Home className="icon" />
            <input
              type="text"
              name="adresseLivreur"
              placeholder="Adresse"
              value={formData.adresseLivreur}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* EMAIL + CIN */}
        <div className="control-div">
          <div className="input-group">
            <Mail className="icon" />
            <input
              type="email"
              name="emailLivreur"
              placeholder="Email"
              value={formData.emailLivreur}
              onChange={handleChange}
              required
            />
            {errors.emailLivreur && <small className="error-text">{errors.emailLivreur[0]}</small>}
          </div>

          <div className="input-group">
            <IdCard className="icon" />
            <input
              type="text"
              name="CIN"
              placeholder="N° CIN"
              value={formData.CIN}
              onChange={handleChange}
              required
            />
            {errors.CIN && <small className="error-text">{errors.CIN[0]}</small>}
          </div>
        </div>

        {/* DATE + LIEU DELIVRANCE */}
        <div className="control-div">
          <div className="input-group">
            <Calendar className="icon" />
            <input
              type="date"
              name="dateCINLivreur"
              value={formData.dateCINLivreur}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <Home className="icon" />
            <input
              type="text"
              name="lieuCINLivreur"
              placeholder="Lieu de délivrance"
              value={formData.lieuCINLivreur}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* MOT DE PASSE */}
        <div className="input-group">
          <Lock className="icon" />
          <input
            type="password"
            name="passwordLivreur"
            placeholder="Mot de passe"
            value={formData.passwordLivreur}
            onChange={handleChange}
            required
          />
          {passwordMessage && (
            <p className={`password-text ${formData.passwordLivreur.length < 6 ? 'error-text' : 'success-text'}`}>
              {passwordMessage}
            </p>
          )}
          {errors.passwordLivreur && <p className="error-text">{errors.passwordLivreur[0]}</p>}
        </div>

        {/* CONFIRMATION */}
        <div className="input-group">
          <Lock className="icon" />
          <input
            type="password"
            name="passwordLivreur_confirmation"
            placeholder="Confirmer le mot de passe"
            value={formData.passwordLivreur_confirmation}
            onChange={handleChange}
            required
          />
          {errors.passwordLivreur_confirmation && (
            <p className="error-text">{errors.passwordLivreur_confirmation[0]}</p>
          )}
        </div>

        {/* BOUTON */}
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} /> &nbsp; Inscription...
            </>
          ) : (
            "S'inscrire"
          )}
        </button>

        <div className="login-link" style={{ textAlign: 'center' }}>
          <span>J'ai déjà un compte ? </span>
          <Link to="/connexion">Connexion</Link>
        </div>
      </form>
    </div>
  );
}
