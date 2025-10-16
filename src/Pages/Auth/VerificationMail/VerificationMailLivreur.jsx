import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../Utils/URL";
import "./VerificationMailClient.css"; // tu peux renommer en VerificationMailLivreur.css

export default function VerificationMailLivreur() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const { emailLivreur } = useParams(); // récupère email depuis l’URL
  const navigate = useNavigate();

  // 🔹 Gestion du changement de code chiffre par chiffre
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) document.getElementById(`code-${index + 1}`).focus();
    }
  };

  // 🔹 Soumission du formulaire de vérification
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
        const response = await fetch(`${BASE_URL}/livreurs/verify-email`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              emailLivreur,
              code: codeComplet,
            }),
          });
          
      const data = await response.json();
      setLoading(false);

      if (response.ok && data.status === "success") {

         //  Vérification des données avant de stocker
         if (data.livreur && data.token) {
          localStorage.setItem("livreur", JSON.stringify(data.livreur));
          localStorage.setItem("token", data.token);
        }

        setMessage("Email vérifié avec succès");
        setMessageType("success");
        
        //Redirection vers la page de connexion après 2 secondes
        setTimeout(() => navigate("/"), 2000);
      } else {
        setMessage(data.message || "Code invalide ou expiré");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Erreur lors de la vérification :", error);
      setMessage("Erreur de connexion au serveur.");
      setMessageType("error");
      setLoading(false);
    }
  };

  return (
    <div className="verify-container">
      <div className="verify-card">
        <h2 className="verify-title">Vérification de votre email</h2>
        <p className="verify-text">
          Entrez le code à 6 chiffres envoyé à <strong>{emailLivreur}</strong>
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
                disabled={loading}
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
