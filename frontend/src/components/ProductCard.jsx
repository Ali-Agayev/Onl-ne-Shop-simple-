
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingCart, Plus } from 'lucide-react'

const ProductCard = ({ product, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay }}
            className="glass"
            style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                transition: 'transform 0.3s ease'
            }}
            whileHover={{ y: -10 }}
        >
            <div style={{ position: 'relative', height: '300px', overflow: 'hidden' }}>
                <img
                    src={product.image || 'https://via.placeholder.com/300'}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                    <span className="glass" style={{ padding: '0.25rem 0.75rem', borderRadius: '99px', fontSize: '0.8rem' }}>
                        {product.category_name}
                    </span>
                </div>
            </div>

            <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{product.name}</h3>
                <p className="text-muted" style={{ fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '1rem' }}>
                    {product.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                        {product.price} AZN
                    </span>
                    <Link to={`/product/${product.slug}`} className="bg-gradient" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', borderRadius: '12px', fontWeight: 'bold' }}>
                        Bax
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}

export default ProductCard
