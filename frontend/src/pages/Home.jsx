import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import ProductCard from '../components/ProductCard'
import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

const Home = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const query = searchParams.get('q') || ''
    const category = searchParams.get('category') || ''

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const [prodRes, catRes] = await Promise.all([
                    api.get(`products/?search=${query}&category__slug=${category}`),
                    api.get('categories/')
                ])
                setProducts(prodRes.data)
                setCategories(catRes.data)
            } catch (error) {
                console.error("Error fetching data:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [query, category])

    return (
        <div className="container">
            <header style={{ margin: '3rem 0', textAlign: 'center' }}>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ fontSize: '3rem', fontWeight: 'bold' }}
                >
                    Keyfiyyətli <span className="text-gradient">Məhsullar</span>
                </motion.h1>
                <p className="text-muted" style={{ maxWidth: '600px', margin: '1rem auto' }}>
                    Ən yeni və keyfiyyətli elektronika, geyim və aksesuarlar burada.
                </p>
            </header>

            {/* Categories Filter */}
            <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '2rem', marginBottom: '2rem' }}>
                <button
                    onClick={() => navigate('/')}
                    className={!category ? 'bg-gradient' : ''}
                    style={{ padding: '0.5rem 1.5rem', borderRadius: '99px', border: '1px solid var(--border)', whiteSpace: 'nowrap', backgroundColor: !category ? 'var(--primary)' : 'transparent' }}
                >
                    Hamısı
                </button>
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => navigate(`/?category=${cat.slug}`)}
                        className={category === cat.slug ? 'bg-gradient' : ''}
                        style={{ padding: '0.5rem 1.5rem', borderRadius: '99px', border: '1px solid var(--border)', whiteSpace: 'nowrap', backgroundColor: category === cat.slug ? 'var(--primary)' : 'transparent' }}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', margin: '4rem 0' }}>
                    <Loader2 className="animate-spin" size={48} color="var(--primary)" />
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                    {products.map((product, idx) => (
                        <ProductCard key={product.id} product={product} delay={idx * 0.1} />
                    ))}
                </div>
            )}

            {!loading && products.length === 0 && (
                <div style={{ textAlign: 'center', margin: '4rem 0' }}>
                    <h2 className="text-muted">Məhsul tapılmadı.</h2>
                </div>
            )}
        </div>
    )
}

export default Home
