import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Acceuil from './Pages/Acceuil';
import OptionInscription from './Pages/Auth/OptionInscription';
import InscriptionClient from './Pages/Auth/Inscription/InscriptionClient';



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Acceuil />} />
        <Route path='/inscription' element={<OptionInscription />} />
        <Route path='/inscription/client' element={<InscriptionClient />} />
      </Routes>
    </Router>
  );
}

export default App;
