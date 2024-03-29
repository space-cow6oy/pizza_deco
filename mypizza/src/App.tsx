import { Route, Routes } from 'react-router-dom';
// import { createContext, useState } from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { Home } from './pages/Home/Home';
import { NotFound } from './pages/NotFound/NotFound';
import { Cart } from './pages/Cart/Cart';

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
