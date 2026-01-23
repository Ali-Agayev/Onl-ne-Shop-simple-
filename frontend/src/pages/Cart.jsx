import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Trash2, Loader2, CheckCircle2 } from 'lucide-react'
import api from '../api/axios'
import { motion, AnimatePresence } from 'framer-motion'

const Cart = () => {
    const [cart, setCart] = useState(null)
    const [loading, setLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState(false)
    const [isOrdered, setIsOrdered] = useState(false)

    useEffect(() => {
        fetchCart()
    }, [])

    const fetchCart = async () => {
        setLoading(true)
        try {
            const res = await api.get('orders/cart/')
            setCart(res.data)
        } catch (error) {
            console.error("Error fetching cart:", error)
        } finally {
            setLoading(false)
        }
    }

    const removeItem = async (productId) => {
        setActionLoading(true)
        try {
            const res = await api.post('orders/remove_from_cart/', { product_id: productId })
            setCart(res.data)
        } catch (error) {
            console.error("Error removing item:", error)
        } finally {
            setActionLoading(false)
        }
    }

    const handleCheckout = async () => {
        setActionLoading(true)
        try {
            await api.post('orders/checkout/')
            setIsOrdered(true)
            setCart(null)
        } catch (error) {
            console.error("Checkout error:", error)
            alert("Sifariş zamanı xəta baş verdi.")
        } finally {
            setActionLoading(false)
        }
    }

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <Loader2 className="animate-spin" size={48} color="var(--primary)" />
            </div>
        )
    }

    if (isOrdered) {
        return (
            <div className="container" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <CheckCircle2 size={80} color="#10b981" style={{ margin: '0 auto 2rem' }} />
                </motion.div>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Sifarişiniz Tamamlandı!</h1>
                <p className="text-muted" style={{ marginBottom: '2rem' }}>Sifarişiniz uğurla qəbul edildi. Tezliklə sizinlə əlaqə saxlanılacaq.</p>
                <Link to="/" className="bg-gradient" style={{ padding: '0.75rem 2rem', borderRadius: '99px', color: 'white' }}>
                    Alış-verişə davam et
                </Link>
            </div>
        )
    }

    const isEmpty = !cart || !cart.items || cart.items.length === 0

    return (
        <div className="container" style={{ padding: '2rem 1.5rem', minHeight: '60vh' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Səbətiniz</h1>

            {isEmpty ? (
                <div className="glass" style={{ padding: '4rem 2rem', textAlign: 'center', borderRadius: '24px' }}>
                    <ShoppingCart size={48} color="var(--text-muted)" style={{ marginBottom: '1.5rem' }} />
                    <h2 className="text-muted">Səbətiniz boşdur</h2>
                    <Link to="/" className="bg-gradient" style={{ padding: '0.75rem 2rem', borderRadius: '99px', color: 'white', marginTop: '1.5rem', display: 'inline-block' }}>
                        Məhsullara bax
                    </Link>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <AnimatePresence>
                            {cart.items.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="glass"
                                    style={{ padding: '1.5rem', borderRadius: '20px', display: 'flex', gap: '1.5rem', alignItems: 'center' }}
                                >
                                    <div style={{ width: '100px', height: '100px', borderRadius: '12px', overflow: 'hidden', background: 'white' }}>
                                        <img src={item.product.image || 'https://via.placeholder.com/100'} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{item.product.name}</h3>
                                        <p className="text-muted" style={{ fontSize: '0.9rem' }}>{item.quantity} ədəd x {item.product.price} ₼</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '0.5rem' }}>{item.price} ₼</p>
                                        <button
                                            onClick={() => removeItem(item.product.id)}
                                            style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer', padding: '0.5rem' }}
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <div className="glass" style={{ padding: '2rem', borderRadius: '24px', height: 'fit-content', position: 'sticky', top: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Ümumi</h2>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <span className="text-muted">Məhsul sayı:</span>
                            <span>{cart.items.length}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                            <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Cəmi:</span>
                            <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--primary)' }}>{cart.total_price} ₼</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            disabled={actionLoading}
                            className="bg-gradient"
                            style={{ width: '100%', padding: '1rem', borderRadius: '12px', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
                        >
                            {actionLoading ? <Loader2 className="animate-spin" style={{ margin: '0 auto' }} /> : 'Sifarişi tamamla'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart
