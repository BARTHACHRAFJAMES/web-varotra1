import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowed }) {
  // allowed = boolean indiquant si l'accès est permis

  if (!allowed) {
    // si non autorisé, redirection vers la page d'accueil ou connexion
    return <Navigate to="/" replace />;
  }

  return children;
}
