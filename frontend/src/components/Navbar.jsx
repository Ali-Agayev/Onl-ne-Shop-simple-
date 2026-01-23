import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Search, User, Menu, X, LogOut, Phone, MapPin, Heart, BarChart2 } from 'lucide-react'
import api from '../api/axios'

const Navbar = () => {
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
        <div style={{ width: '100%', zIndex: 1000, backgroundColor: '#fff' }}>
            {/* Top Bar */}
            <div style={{ borderBottom: '1px solid #eee', padding: '0.5rem 0', fontSize: '0.85rem', color: '#666' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <MapPin size={14} /> <span>Bakı şəhəri</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <Phone size={14} color="#a91260" />
                            <span style={{ fontWeight: 'bold', color: '#333' }}>+994 50 123 45 67</span>
                        </div>
                        {isLoggedIn ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span style={{ fontWeight: '500' }}>{userData?.username}</span>
                                <button onClick={handleLogout}><LogOut size={16} /></button>
                            </div>
                        ) : (
                            <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <User size={14} /> <span>Daxil ol</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div style={{ padding: '1.5rem 0' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
                    <Link to="/" style={{ fontSize: '2rem', fontWeight: 'bold', letterSpacing: '-1.5px', color: '#000' }}>
                        MAISON <span style={{ color: '#a91260' }}>D'OR</span>
                    </Link>

                    <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: '600px', position: 'relative' }}>
                        <input
                            type="text"
                            placeholder="Məhsul axtarın..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.8rem 1.5rem',
                                paddingRight: '3rem',
                                borderRadius: '4px',
                                border: '1px solid #ddd',
                                backgroundColor: '#f9f9f9',
                                outline: 'none'
                            }}
                        />
                        <button type="submit" style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)' }}>
                            <Search size={20} color="#666" />
                        </button>
                    </form>

                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        {userData?.is_staff && (
                            <a href="http://127.0.0.1:8000/admin/" target="_blank" rel="noopener noreferrer" style={{ color: '#a91260', fontWeight: 'bold' }}>ADMIN</a>
                        )}
                    </div>
                </div>
            </div>

            {/* Nav Menu */}
            <div style={{ borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                    <div style={{ backgroundColor: '#f9f9f9', padding: '1rem 2rem', borderRight: '1px solid #eee', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.8rem', fontWeight: 'bold' }}>
                        <Menu size={20} /> KATALOG
                    </div>
                    <div style={{ display: 'flex', gap: '2rem', fontWeight: '500', fontSize: '0.95rem' }}>
                        <Link to="/">ANA SƏHİFƏ</Link>
                        <Link to="/">YENİ MƏHSULLAR</Link>
                        <Link to="/">ENDİRİMLƏR</Link>
                        <Link to="/">ÇATDIRILMA</Link>
                        <Link to="/">ƏLAQƏ</Link>
                    </div>
                </div>
            </div>

            {/* Floating Sidebar */}
            <div className="floating-side-nav">
                <Link to="/cart" className="side-nav-item">
                    <ShoppingCart size={22} />
                    <span>Səbət</span>
                    {cartCount > 0 && <span className="badge">{cartCount}</span>}
                </Link>
                <div className="side-nav-item">
                    <Heart size={22} />
                    <span>İstək</span>
                    <span className="badge">0</span>
                </div>
                <div className="side-nav-item">
                    <BarChart2 size={22} />
                    <span>Müqayisə</span>
                    <span className="badge">0</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar
