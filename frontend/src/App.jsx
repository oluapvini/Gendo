


import { Login } from './screens/Login';
import { Home } from './screens/Home';
import { DocArea } from './screens/docArea';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'
import { DoctorCard } from './components/doctorCard/DoctorCard';


function App() {
  

  return (
    <Router>
      <Routes>
          <Route path="/" element={<DocArea />} />
          <Route path="/login" element={<Login />} />
          <Route path="/docArea" element={<Login />} />
        </Routes>
    </Router>
  )
}

export default App
