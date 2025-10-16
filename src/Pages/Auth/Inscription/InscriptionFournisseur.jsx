import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, FileText, Building, Loader2 } from 'lucide-react';
import './InscriptionFournisseur.css';
import { BASE_URL } from '../../../Utils/URL';

export default function InscriptionFournisseur() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomFournisseur: '',
    prenomFournisseur: '',
    nomEntreprise: '',
    emailFRN: '',
    nif: '',
    stat: '',
    rcs: '',
    passwordFRN: '',
    passwordFRN_confirmation: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [globalMessage, setGlobalMessage] = useState(null);
  const [messageType, setMessageType] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  //Disparition automatique des messages après 5 secondes
  useEffect(() => {
    if (globalMessage || Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        setGlobalMessage(null);
        setErrors({});
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [globalMessage, errors]);

  // Gestion des champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //Vérification mot de passe dynamique
  useEffect(() => {
    if (formData.passwordFRN.length === 0) {
      setPasswordMessage('');
    } else if (formData.passwordFRN.length < 6) {
      setPasswordMessage('Au moins 6 caractères.');
    } else {
      setPasswordMessage('Mot de passe valide');
    }
  }, [formData.passwordFRN]);

  //Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setGlobalMessage(null);

    if (formData.passwordFRN !== formData.passwordFRN_confirmation) {
      setErrors({ passwordFRN_confirmation: ["Les mots de passe ne correspondent pas."] });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/fournisseur/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setGlobalMessage('Inscription réussie !');
        setMessageType('success');
        setTimeout(() => navigate(`/inscription/verifymailfournissseur/${formData.emailFRN}`), 2000);
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
        <h2>Inscription Fournisseur</h2>

        {/* Message global (disparaît après 5s) */}
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
              name="nomFournisseur"
              placeholder="Nom"
              value={formData.nomFournisseur}
              onChange={handleChange}
              required
            />
            {errors.nomFournisseur && <small className="error-text">{errors.nomFournisseur[0]}</small>}
          </div>

          <div className="input-group">
            <User className="icon" />
            <input
              type="text"
              name="prenomFournisseur"
              placeholder="Prénom"
              value={formData.prenomFournisseur}
              onChange={handleChange}
              required
            />
            {errors.prenomFournisseur && <small className="error-text">{errors.prenomFournisseur[0]}</small>}
          </div>
        </div>

        {/* EMAIL */}
        <div className="input-group">
          <Mail className="icon" />
          <input
            type="email"
            name="emailFRN"
            placeholder="Email"
            value={formData.emailFRN}
            onChange={handleChange}
            required
          />
          {errors.email && <small className="error-text">{errors.email[0]}</small>}
          {errors.emailFRN && <small className="error-text">{errors.emailFRN[0]}</small>}
        </div>

        {/* ENTREPRISE + NIF */}
        <div className="control-div">
        <div className="input-group">
          <Building className="icon" />
          <input
            type="text"
            name="nomEntreprise"
            placeholder="Nom de l’entreprise"
            value={formData.nomEntreprise}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
            <FileText className="icon" />
            <input type="text" name="nif" placeholder="NIF" value={formData.nif} onChange={handleChange} required />
          </div>
        </div>

        {/*STAT / RCS */}
        <div className="control-div">

          <div className="input-group">
            <FileText className="icon" />
            <input type="text" name="stat" placeholder="STAT" value={formData.stat} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <FileText className="icon" />
            <input type="text" name="rcs" placeholder="RCS" value={formData.rcs} onChange={handleChange} required />
          </div>
        </div>

        {/* MOT DE PASSE */}
        <div className="input-group">
          <Lock className="icon" />
          <input
            type="password"
            name="passwordFRN"
            placeholder="Mot de passe"
            value={formData.passwordFRN}
            onChange={handleChange}
            required
          />
          {passwordMessage && (
            <p className={`password-text ${formData.passwordFRN.length < 6 ? 'error-text' : 'success-text'}`}>
              {passwordMessage}
            </p>
          )}
          {errors.passwordFRN && <p className="error-text">{errors.passwordFRN[0]}</p>}
        </div>

        {/* CONFIRMATION */}
        <div className="input-group">
          <Lock className="icon" />
          <input
            type="password"
            name="passwordFRN_confirmation"
            placeholder="Confirmer le mot de passe"
            value={formData.passwordFRN_confirmation}
            onChange={handleChange}
            required
          />
          {errors.passwordFRN_confirmation && (
            <p className="error-text">{errors.passwordFRN_confirmation[0]}</p>
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

        <div className="login-link" style={{textAlign: "center"}}>
          <span>J'ai déjà un compte ? </span>
          <Link to="/connexion">Connexion</Link>
        </div>
      </form>
    </div>
  );
}
