import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'

const Cart = () => {
    return (
        <div className="container" style={{ padding: '2rem 1.5rem', minHeight: '60vh' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Səbətiniz</h1>

            <div className="glass" style={{
                padding: '4rem 2rem',
                textAlign: 'center',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem'
            }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'var(--surface)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                }}>
                    <ShoppingCart size={40} color="var(--text-muted)" />
                </div>
                <h2 className="text-muted">Səbətiniz boşdur</h2>
                <p className="text-muted" style={{ maxWidth: '400px' }}>
                    Hələ heç nə əlavə etməmisiniz. Məhsullarımıza göz gəzdirin və bəyəndiklərinizi seçin.
                </p>
                <Link to="/" className="bg-gradient" style={{
                    padding: '0.75rem 2rem',
                    borderRadius: '99px',
                    color: 'white',
                    fontWeight: '600',
                    marginTop: '1rem',
                    display: 'inline-block'
                }}>
                    Alış-verişə başla
                </Link>
            </div>
        </div>
    )
}

export default Cart
