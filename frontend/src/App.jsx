


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
          <Route path="/asd" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<DocArea />} />
        </Routes>
    </Router>
  )
}

export default App
