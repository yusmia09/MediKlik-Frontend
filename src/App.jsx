import { useState } from 'react'
import Layout from "./components/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './screen/login';
import Home from './screen/Home';
import AdminDashboard from './screen/AdminDashboard';
import ProductPage from './screen/ProductPage';
import ProductDetail from './screen/ProductDetail';
import About from './screen/About';
import CartPage from './screen/CartPage';
import ProfilePage from './screen/Profile';

function App() {
  const [count, setCount] = useState(0)

    return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/product' element={<ProductPage/>} />
        <Route path='/product/:id' element={<ProductDetail/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/cart' element={<CartPage/>} />
        <Route path='/profile' element={<ProfilePage />} />
        
      </Routes>
      
      <Routes>
        <Route path='/login' element={
          <div className='min-h-screen w-full flex place-items-center justify-center bg-gradient-to-r from-[#A8E6CF] via-[#BFE9F5] to-[#A0E9FF] overflow-y-auto'>
            <Login/>
          </div> } />
      </Routes>
        
      <Routes>
          <Route path='/admin/*' element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App
