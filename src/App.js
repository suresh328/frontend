import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Forgot from './forgot';

import ParticlesComponent from './Pro';
import Home from './Home';

function App() {
  return (
    <div>
      <ParticlesComponent id="praticels" />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home/>} />
        <Route path='/forgot' element={<Forgot />} />
      </Routes>

    </div>
  );
}

export default App;
