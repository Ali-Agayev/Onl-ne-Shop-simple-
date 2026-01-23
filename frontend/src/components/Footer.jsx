import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer style={{
            padding: '4rem 2rem',
            borderTop: '1px solid var(--border)',
            marginTop: '4rem',
            backgroundColor: 'var(--surface)',
        }}>
            <div className="container">
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '2rem',
                    marginBottom: '2rem'
                }}>
                    <Link to="/features" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>Features</Link>
                    <Link to="/contact" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>Contact</Link>
                    <Link to="/terms" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>Terms of Service</Link>
                    <Link to="/privacy" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>Privacy Policy</Link>
                    <Link to="/refund" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>Refund Policy</Link>
                </div>

                <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <p style={{ fontWeight: '500' }}>LAIHE Shop © 2026</p>
                </div>
            </div>

            <style>{`
                footer a:hover {
                    color: var(--primary) !important;
                }
            `}</style>
        </footer>
    )
}

export default Footer
