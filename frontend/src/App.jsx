import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import ProductDetail from './pages/ProductDetail'
import './index.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main style={{ paddingTop: '80px', minHeight: '100vh' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
          </Routes>
        </main>
        <footer style={{ padding: '2rem', textAlign: 'center', borderTop: '1px solid var(--border)', marginTop: '4rem' }}>
          <p className="text-muted">© 2026 Laihe Store. Premium Experience.</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
