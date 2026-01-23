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
        <div style={{ width: '100%', zIndex: 1000, backgroundColor: '#fff', position: 'sticky', top: 0, boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
            {/* Desktop Top Bar - Hidden on Mobile */}
            <div className="desktop-only" style={{ borderBottom: '1px solid #eee', padding: '0.5rem 0', fontSize: '0.85rem', color: '#666' }}>
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

            {/* Mobile Header - Visible only on Mobile */}
            <div className="mobile-only" style={{ padding: '0.75rem 1rem', display: 'none', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee' }}>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)}><Menu size={24} /></button>
                <Link to="/" style={{ fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '-1px' }}>
                    MAISON <span style={{ color: '#a91260' }}>D'OR</span>
                </Link>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <a href="tel:+994501234567"><Phone size={22} /></a>
                    <button onClick={() => navigate('/?search=open')}><Search size={22} /></button>
                </div>
            </div>

            {/* Main Header - Desktop Only */}
            <div className="desktop-only" style={{ padding: '1.5rem 0' }}>
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

                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        {userData?.is_staff && (
                            <a href="http://127.0.0.1:8000/admin/" target="_blank" rel="noopener noreferrer" style={{ color: '#a91260', fontWeight: 'bold' }}>ADMIN</a>
                        )}
                        <Link to="/cart" style={{ position: 'relative' }}>
                            <ShoppingCart size={24} />
                            {cartCount > 0 && <span className="badge" style={{ top: '-5px', right: '-10px' }}>{cartCount}</span>}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Nav Menu - Desktop Only */}
            <div className="desktop-only" style={{ borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}>
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

            {/* Floating Sidebar - Responsive adjustments via CSS */}
            <div className="floating-side-nav">
                <Link to="/cart" className="side-nav-item">
                    <ShoppingCart size={22} />
                    <span className="nav-text">Səbət</span>
                    {cartCount > 0 && <span className="badge">{cartCount}</span>}
                </Link>
                <div className="side-nav-item">
                    <Heart size={22} />
                    <span className="nav-text">İstək</span>
                    <span className="badge">0</span>
                </div>
                <div className="side-nav-item">
                    <BarChart2 size={22} />
                    <span className="nav-text">Müqayisə</span>
                    <span className="badge">0</span>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            {isMenuOpen && (
                <div className="mobile-only" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1002 }}>
                    <div style={{ width: '80%', height: '100%', backgroundColor: '#fff', padding: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.2rem' }}>MENU</h2>
                            <button onClick={() => setIsMenuOpen(false)}><X size={24} /></button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontWeight: '500' }}>
                            <Link to="/" onClick={() => setIsMenuOpen(false)}>ANA SƏHİFƏ</Link>
                            <Link to="/" onClick={() => setIsMenuOpen(false)}>KATALOG</Link>
                            <Link to="/" onClick={() => setIsMenuOpen(false)}>YENİ MƏHSULLAR</Link>
                            <Link to="/" onClick={() => setIsMenuOpen(false)}>ENDİRİMLƏR</Link>
                            <Link to="/cart" onClick={() => setIsMenuOpen(false)}>SƏBƏT ({cartCount})</Link>
                            {!isLoggedIn && <Link to="/login" onClick={() => setIsMenuOpen(false)}>DAXİL OL</Link>}
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @media (max-width: 768px) {
                    .desktop-only { display: none !important; }
                    .mobile-only { display: flex !important; }
                    .nav-text { display: none; }
                    .floating-side-nav { width: 40px; }
                    .side-nav-item { width: 40px; height: 50px; }
                }
            `}</style>
        </div>
    )
}

export default Navbar
