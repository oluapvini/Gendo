


import { Login } from './screens/Login';
import { Home } from './screens/Home';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'
import { DoctorCard } from './components/doctorCard/DoctorCard';


function App() {
  

  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    </Router>
  )
}

export default App
