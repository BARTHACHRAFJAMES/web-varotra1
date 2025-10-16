import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Acceuil from './Pages/Acceuil';
import OptionInscription from './Pages/Auth/OptionInscription';
import InscriptionClient from './Pages/Auth/Inscription/InscriptionClient';
import VerificationMailClient from './Pages/Auth/VerificationMail/VerificationMailClient';
import InscriptionFournisseur from './Pages/Auth/Inscription/InscriptionFournisseur';
import VerificationMailFournisseur from './Pages/Auth/VerificationMail/VerificationMailFournisseur';
import Connexion from './Pages/Auth/Connexion/Connexion';
import InscriptionLivreur from './Pages/Auth/Inscription/InscriptionLivreur';
import VerificationMailLivreur from './Pages/Auth/VerificationMail/VerificationMailLivreur';
import LivreurPage from './Pages/Livreurs/LivreurPage';
import AjoutProduit from './Pages/Fournisseurs/HeaderFRN/PagesFRN/AjoutProduit/AjoutProduit';






function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Acceuil />} />
        <Route path='/inscription' element={<OptionInscription />} />

        {/* Login */}
        <Route path='/connexion' element={<Connexion />} />

        {/* Clients */}
        <Route path='/inscription/client' element={<InscriptionClient />} />
        <Route path="/inscription/verifymailclient/:email" element={<VerificationMailClient />} />

        {/* Fournisseurs */}
        <Route path='/inscription/fournisseur' element={<InscriptionFournisseur />} />
        <Route path="/inscription/verifymailfournissseur/:emailFRN" element={<VerificationMailFournisseur />} />
        <Route path='/produit/ajout' element={<AjoutProduit />} />

        {/*Livreurs */}
        <Route path='/inscription/livreur' element={<InscriptionLivreur />} />
        <Route path="/inscription/verifymaillivreur/:emailLivreur" element={<VerificationMailLivreur />} />
        <Route path="/livreur" element={<LivreurPage />} />

      </Routes>
    </Router>
  );
}

export default App;
