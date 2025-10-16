import React from 'react';
import ClientPage from './Clients/ClientPage';
import FournisseurPage from './Fournisseurs/FournisseurPage';
import LivreurPage from './Livreurs/LivreurPage';


export default function Acceuil() {
  // Récupération du fournisseur depuis localStorage
  const fournisseur = localStorage.getItem('fournisseur')
    ? JSON.parse(localStorage.getItem('fournisseur'))
    : null;

  // Récupération du client depuis localStorage
  const client = localStorage.getItem('client')
    ? JSON.parse(localStorage.getItem('client'))
    : null;


  //Récupération de livreur et du token depuis localStorage
  const livreur = localStorage.getItem('livreur')
    ? JSON.parse(localStorage.getItem('livreur'))
    :null

  // Récupération du token
  const token = localStorage.getItem('token');

 

  // Affichage selon le type d'utilisateur
  if (client) {
    return <ClientPage />;
  }

  if (fournisseur) {
    return <FournisseurPage />;
  }

  if(livreur) {
    return <LivreurPage />;
  }

  // Par défaut, on affiche la page client
  return <ClientPage />;
}
