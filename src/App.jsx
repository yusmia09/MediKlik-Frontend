import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './screen/login';
import Home from './screen/Home';
import AdminDashboard from './screen/AdminDashboard';

function App() {
  const [count, setCount] = useState(0)

    return (
    <Router>
      <Routes>
        <Route path='/home' element={<Home/>} />
        <Route path='/login' element={
          <div className='min-h-screen w-full flex place-items-center justify-center bg-gradient-to-r from-[#A8E6CF] via-[#BFE9F5] to-[#A0E9FF] overflow-y-auto'>
            <Login/>
          </div> } />
          <Route path='/admin' element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App
