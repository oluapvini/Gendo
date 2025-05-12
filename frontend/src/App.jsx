


import { Login } from './screens/Login';
import { Home } from './screens/home';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'
import { DoctorCard } from './components/doctorCard/doctorCard';


function App() {
  

  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
    </Router>
  )
}

export default App
