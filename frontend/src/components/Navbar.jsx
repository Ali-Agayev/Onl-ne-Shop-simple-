import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Search, User, Menu, X, LogOut } from 'lucide-react'
import api from '../api/axios'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [cartCount, setCartCount] = useState(0)
    const [userData, setUserData] = useState(null)
    const navigate = useNavigate()
    const isLoggedIn = !!localStorage.getItem('access_token')

    useEffect(() => {
        if (isLoggedIn) {
            fetchCartCount()
            fetchUserData()
        }
    }, [isLoggedIn])

    const fetchCartCount = async () => {
        try {
            const res = await api.get('orders/cart/')
            setCartCount(res.data.items.length)
        } catch (error) {
            console.error("Error fetching cart count:", error)
        }
    }

    const fetchUserData = async () => {
        try {
            const res = await api.get('accounts/profile/')
            setUserData(res.data)
        } catch (error) {
            console.error("Error fetching user data:", error)
        }
    }

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/?q=${searchQuery}`)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        navigate('/login')
        window.location.reload()
    }

    return (
        <nav className="glass" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, height: '80px', display: 'flex', alignItems: 'center' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '-1px' }}>
                    LAI<span className="text-gradient">HE</span>
                </Link>

                {/* Desktop Nav */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <form onSubmit={handleSearch} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <input
                            type="text"
                            placeholder="Axtar..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                background: 'var(--surface)',
                                border: '1px solid var(--border)',
                                color: 'var(--text)',
                                padding: '0.5rem 1rem 0.5rem 2.5rem',
                                borderRadius: '99px',
                                width: '240px',
                                outline: 'none'
                            }}
                        />
                        <Search size={18} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
                    </form>

                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        {userData?.is_staff && (
                            <a href="http://127.0.0.1:8000/admin/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--primary)' }}>
                                Admin
                            </a>
                        )}
                        <Link to="/cart" style={{ position: 'relative' }}>
                            <ShoppingCart size={22} />
                            {cartCount > 0 && (
                                <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'var(--primary)', color: 'white', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '50%' }}>
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        {isLoggedIn ? (
                            <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                <LogOut size={22} />
                            </button>
                        ) : (
                            <Link to="/login">
                                <User size={22} />
                            </Link>
                        )}
                    </div>
                </div>

                {/* Mobile menu toggle */}
                <button style={{ display: 'none' }} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X /> : <Menu />}
                </button>
            </div>
        </nav>
    )
}

export default Navbar
