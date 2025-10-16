import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../Utils/URL";
import "./VerificationMailClient.css";

export default function VerificationMailFournisseur() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const { emailFRN } = useParams();
  const navigate = useNavigate();

  // 🔹 Gestion du changement de code
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };

  // 🔹 Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    const codeComplet = code.join("");
    if (codeComplet.length !== 6) {
      setMessage("Veuillez entrer le code complet à 6 chiffres.");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${BASE_URL}/fournisseurs/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailFRN,
          codeFournisseur: codeComplet,
        }),
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
        //  Vérification des données avant de stocker
        if (data.fournisseur && data.token) {
          localStorage.setItem("fournisseur", JSON.stringify(data.fournisseur));
          localStorage.setItem("token", data.token);
        }

        setMessage("Votre e-mail a été vérifié avec succès !");
        setMessageType("success");

        // Redirection après 2s
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setMessage(
          data.message || "Le code est incorrect ou a expiré. Veuillez réessayer."
        );
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
    <div className="verify-container">
      <div className="verify-card">
        <h2 className="verify-title">Vérification du mail</h2>
        <p className="verify-text">
          Entrez le code à 6 chiffres envoyé à <strong>{emailFRN}</strong>
        </p>

        {message && (
          <p
            className={`verify-message ${
              messageType === "success" ? "success" : "error"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="verify-form">
          <div className="code-inputs">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                className="code-box"
              />
            ))}
          </div>

          <button type="submit" className="verify-btn" disabled={loading}>
            {loading ? "Vérification..." : "Vérifier"}
          </button>
        </form>
      </div>
    </div>
  );
}
