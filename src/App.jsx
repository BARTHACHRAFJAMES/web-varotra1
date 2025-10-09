import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Acceuil from './Pages/Acceuil';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Acceuil />} /> 
      </Routes>
    </Router>
  );
}

export default App;
