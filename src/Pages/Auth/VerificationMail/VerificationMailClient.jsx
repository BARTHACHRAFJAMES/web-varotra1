import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../Utils/URL"; // tu l’as déjà dans tes autres fichiers
import "./VerificationMailClient.css";

export default function VerificationMailClient() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const { email } = useParams();
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) document.getElementById(`code-${index + 1}`).focus();
    }
  };

  //Fonction de vérification du code
  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalCode = code.join("");
    if (finalCode.length !== 6) {
      setMessage("Veuillez entrer un code à 6 chiffres.");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${BASE_URL}/clients/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          code: finalCode,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Code invalide ou expiré.");
        setMessageType("error");
      } else {
        setMessage("Email vérifié avec succès !");
        setMessageType("success");

        localStorage.setItem("client", JSON.stringify(data.client));
        localStorage.setItem("token", data.token);

        //Rediriger après 2 secondes (par exemple vers la page de connexion)
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      console.error("Erreur:", error);
      setMessage("Erreur serveur, veuillez réessayer.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-container">
      <div className="verify-card">
        <h2 className="verify-title">Vérification du mail</h2>
        <p className="verify-text">Entrez le code à 6 chiffres envoyé à <strong>{email}</strong></p>

        {message && (
          <p className={`verify-message ${messageType === "success" ? "success" : "error"}`}>
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
