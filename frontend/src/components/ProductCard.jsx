import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingCart, Eye, Heart } from 'lucide-react'

const ProductCard = ({ product, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay }}
            style={{
                position: 'relative',
                backgroundColor: '#fff',
                border: '1px solid #eee',
                borderRadius: '4px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'box-shadow 0.3s'
            }}
            whileHover={{ boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
        >
            <Link to={`/product/${product.slug}`} style={{ position: 'relative', height: '280px', overflow: 'hidden', display: 'block' }}>
                <img
                    src={product.image || 'https://via.placeholder.com/300'}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '1rem' }}
                />

                {/* Hover overlays */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                    opacity: 0,
                    transition: 'opacity 0.2s',
                }}
                    className="card-overlay"
                >
                    <div style={{ backgroundColor: '#fff', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                        <Heart size={20} color="#666" />
                    </div>
                </div>
            </Link>

            <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Link to={`/?category=${product.category?.slug}`} style={{ fontSize: '0.75rem', color: '#999', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    {product.category_name}
                </Link>
                <Link to={`/product/${product.slug}`} style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', height: '2.4em' }}>
                    {product.name}
                </Link>

                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#a91260' }}>
                            {product.price} ₼
                        </span>
                    </div>
                    <Link to={`/product/${product.slug}`} style={{
                        color: '#666',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid #ddd',
                        padding: '0.5rem',
                        borderRadius: '4px'
                    }}>
                        <Eye size={18} />
                    </Link>
                </div>
            </div>

            <style>{`
                div:hover > .card-overlay {
                    opacity: 1 !important;
                }
            `}</style>
        </motion.div>
    )
}

export default ProductCard
