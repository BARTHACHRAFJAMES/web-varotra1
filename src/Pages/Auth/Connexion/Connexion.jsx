import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Loader2 } from "lucide-react";
import "./Connexion.css";
import { BASE_URL } from "../../../Utils/URL";

export default function Connexion() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // 🔹 Gestion du changement de champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🔹 Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
        //Nettoyer le localStorage avant d’ajouter les nouvelles données
        localStorage.removeItem("client");
        localStorage.removeItem("fournisseur");
        localStorage.removeItem("token");

        //Vérifie le type et stocke les bonnes infos
        if (data.type === "client" && data.user && data.token) {
          localStorage.setItem("client", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
        } else if (data.type === "fournisseur" && data.user && data.token) {
          localStorage.setItem("fournisseur", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
        } else if(data.type === "livreur" && data.user && data.token) {
          localStorage.setItem("livreur", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
        }

        setMessage("Connexion réussie !");
        setMessageType("success");

        //Redirection vers la page d’accueil après 1,5s
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setMessage(data.message || "Email ou mot de passe incorrect.");
        setMessageType("error");
      }
    } catch (error) {
      console.error(error);
      setMessage("Erreur de connexion au serveur.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form className="inscription-form" onSubmit={handleSubmit}>
        <Link to="/" className="back-arrow">← Page d'acceuil</Link>
        {/* <h2>Connexion</h2> */}

        {message && (
          <p
            className={`global-message ${
              messageType === "success" ? "success-text" : "error-text"
            }`}
          >
            {message}
          </p>
        )}

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

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} /> &nbsp; Connexion...
            </>
          ) : (
            "Se connecter"
          )}
        </button>

        <div className="login-link"style={{textAlign: "center"}}>
          <span>Je n'ai pas de compte ? </span>
          <Link to="/inscription">Inscription</Link>
        </div>
      </form>
    </div>
  );
}
