import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import ProductCard from '../components/ProductCard'
import { Loader2, ChevronRight, ChevronLeft } from 'lucide-react'
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
        <div style={{ backgroundColor: '#fff' }}>
            <div className="container" style={{ display: 'flex', gap: '2rem', padding: '2rem 1.5rem' }}>
                {/* Sidebar Categories */}
                <aside style={{ width: '280px', flexShrink: 0 }}>
                    <div style={{ border: '1px solid #eee', borderRadius: '4px', overflow: 'hidden' }}>
                        {categories.map(cat => (
                            <div
                                key={cat.id}
                                onClick={() => navigate(`/?category=${cat.slug}`)}
                                style={{
                                    padding: '1rem 1.5rem',
                                    borderBottom: '1px solid #eee',
                                    cursor: 'pointer',
                                    backgroundColor: category === cat.slug ? '#f9f9f9' : 'white',
                                    fontWeight: category === cat.slug ? 'bold' : 'normal',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                {cat.name}
                                <ChevronRight size={14} color="#ccc" />
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '2rem' }}>
                        <img src="https://via.placeholder.com/280x400?text=Banner+Reklam" alt="Adv" style={{ width: '100%', borderRadius: '4px' }} />
                    </div>
                </aside>

                {/* Main Content */}
                <main style={{ flex: 1 }}>
                    {/* Hero Slider Mockup */}
                    {!category && !query && (
                        <div style={{ position: 'relative', width: '100%', height: '450px', backgroundColor: '#f5f5f5', borderRadius: '4px', overflow: 'hidden', marginBottom: '3rem' }}>
                            <img src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1000" alt="Hero" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', left: '10%', top: '50%', transform: 'translateY(-50%)', maxWidth: '400px' }}>
                                <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>Yeni Kolleksiya</h1>
                                <button className="bg-gradient" style={{ padding: '1rem 2rem', fontSize: '1.1rem', fontWeight: 'bold', borderRadius: '4px' }}>İndi Al</button>
                            </div>
                            <div style={{ position: 'absolute', top: '50%', left: '1rem', width: '40px', height: '40px', backgroundColor: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transform: 'translateY(-50%)' }}><ChevronLeft /></div>
                            <div style={{ position: 'absolute', top: '50%', right: '1rem', width: '40px', height: '40px', backgroundColor: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transform: 'translateY(-50%)' }}><ChevronRight /></div>
                        </div>
                    )}

                    <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <h2 style={{ fontSize: '1.8rem' }}>{category ? categories.find(c => c.slug === category)?.name : (query ? `"${query}" üçün nəticələr` : 'Seçilmiş Məhsullar')}</h2>
                        {!loading && <span style={{ color: '#999', fontSize: '0.9rem' }}>{products.length} məhsul tapıldı</span>}
                    </div>

                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', margin: '4rem 0' }}>
                            <Loader2 className="animate-spin" size={48} color="var(--primary)" />
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
                            {products.map((product, idx) => (
                                <ProductCard key={product.id} product={product} delay={idx * 0.05} />
                            ))}
                        </div>
                    )}

                    {!loading && products.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '4rem 0', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                            <h2 className="text-muted">Bu kateqoriyada məhsul tapılmadı.</h2>
                        </div>
                    )}

                    {/* Secondary banners */}
                    {!category && !query && (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '4rem' }}>
                            <div style={{ position: 'relative', height: '250px', overflow: 'hidden', borderRadius: '4px' }}>
                                <img src="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=800" alt="B1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', background: '#a91260', color: 'white', padding: '0.5rem 1rem', fontWeight: 'bold' }}>Xalatlar</div>
                            </div>
                            <div style={{ position: 'relative', height: '250px', overflow: 'hidden', borderRadius: '4px' }}>
                                <img src="https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?auto=format&fit=crop&q=80&w=800" alt="B2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', background: '#a91260', color: 'white', padding: '0.5rem 1rem', fontWeight: 'bold' }}>Dəsmallar</div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}

export default Home
