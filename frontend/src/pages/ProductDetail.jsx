import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { Loader2, ArrowLeft, ShoppingCart, ShieldCheck, Truck } from 'lucide-react'
import { motion } from 'framer-motion'

const ProductDetail = () => {
    const { slug } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [cartLoading, setCartLoading] = useState(false)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`products/${slug}/`)
                setProduct(response.data)
            } catch (error) {
                console.error("Error fetching product:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [slug])

    const addToCart = async () => {
        if (!localStorage.getItem('access_token')) {
            navigate('/login')
            return
        }
        setCartLoading(true)
        try {
            await api.post('orders/add_to_cart/', { product_id: product.id, quantity: 1 })
            navigate('/cart')
        } catch (error) {
            console.error("Error adding to cart:", error)
            alert("Məhsul səbətə əlavə edilərkən xəta baş verdi.")
        } finally {
            setCartLoading(false)
        }
    }

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <Loader2 className="animate-spin" size={48} color="var(--primary)" />
        </div>
    )

    if (!product) return (
        <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
            <h2>Məhsul tapılmadı.</h2>
            <Link to="/" className="text-gradient" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                <ArrowLeft size={20} /> Ana səhifəyə qayıt
            </Link>
        </div>
    )

    return (
        <div className="container" style={{ paddingBottom: '4rem' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-muted)' }}>
                <ArrowLeft size={20} /> Geri
            </Link>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>
                {/* Product Image */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass"
                    style={{ borderRadius: '32px', overflow: 'hidden', maxHeight: '600px' }}
                >
                    <img
                        src={product.image || 'https://via.placeholder.com/600'}
                        alt={product.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </motion.div>

                {/* Product Info */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <span className="text-gradient" style={{ fontWeight: '600', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>
                        {product.category_name}
                    </span>
                    <h1 style={{ fontSize: '3rem', margin: '1rem 0', lineHeight: '1.1' }}>{product.name}</h1>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '2rem' }}>
                        {product.price} AZN
                    </p>

                    <div className="glass" style={{ padding: '2rem', borderRadius: '24px', marginBottom: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Məhsul haqqında</h3>
                        <p className="text-muted" style={{ whiteSpace: 'pre-line' }}>{product.description}</p>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
                        <button
                            onClick={addToCart}
                            disabled={cartLoading}
                            className="bg-gradient"
                            style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '1.25rem', borderRadius: '16px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', opacity: cartLoading ? 0.7 : 1 }}
                        >
                            {cartLoading ? <Loader2 className="animate-spin" /> : <><ShoppingCart /> Səbətə at</>}
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="glass" style={{ padding: '1rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Truck color="var(--primary)" />
                            <div style={{ fontSize: '0.9rem' }}>
                                <div style={{ fontWeight: '600' }}>Sürətli Çatdırılma</div>
                                <div className="text-muted">24 saat ərzində</div>
                            </div>
                        </div>
                        <div className="glass" style={{ padding: '1rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <ShieldCheck color="var(--primary)" />
                            <div style={{ fontSize: '0.9rem' }}>
                                <div style={{ fontWeight: '600' }}>Zəmanət</div>
                                <div className="text-muted">1 il rəsmi</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default ProductDetail
