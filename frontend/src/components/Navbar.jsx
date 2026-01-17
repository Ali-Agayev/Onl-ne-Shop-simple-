import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Search, User, Menu, X } from 'lucide-react'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate()

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/?q=${searchQuery}`)
        }
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
                        <Link to="/cart" style={{ position: 'relative' }}>
                            <ShoppingCart size={22} />
                            <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'var(--primary)', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '50%' }}>0</span>
                        </Link>
                        <Link to="/login">
                            <User size={22} />
                        </Link>
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
