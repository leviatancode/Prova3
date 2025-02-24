import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import axios from 'axios';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Usa direttamente '/api/products/search' senza il base URL
                const response = await axios.get('/api/products/search', {
                    params: { query },
                    withCredentials: true
                });
                
                setProducts(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Error searching products');
                console.error('Search error:', err);
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchSearchResults();
        } else {
            setProducts([]);
            setLoading(false);
        }
    }, [query]);

    if (loading) return <LoadingSpinner />;

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-red-500 bg-red-100 p-4 rounded-md">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">
                Search Results for: {query}
            </h1>
            
            {products.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-300">No products found for &quot;{query}&quot;</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                        >
                            {product.imageUrl && (
                                <img 
                                    src={product.imageUrl} 
                                    alt={product.name}
                                    className="w-full h-48 object-cover"
                                />
                            )}
                            <div className="p-4">
                                <h2 className="text-lg font-semibold">{product.name}</h2>
                                <p className="text-gray-400 mt-2">${product.price}</p>
                                <p className="text-gray-500 text-sm mt-1">{product.category}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResults;