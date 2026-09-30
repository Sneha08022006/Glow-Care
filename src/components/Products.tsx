import { useState, useEffect } from 'react';
import { Star, Plus, X, Search, Check } from 'lucide-react';
import { products, type Product, type SkinType } from '@/data';
import { useReveal } from '@/hooks/useReveal';

function ProductModal({ product, onClose, onAdd, isAdded, suggestedSkinType, onSelectRelated }: { product: Product; onClose: () => void; onAdd: () => void; isAdded: boolean; suggestedSkinType?: SkinType | null; onSelectRelated: (p: Product) => void }) {
  if (!product) return null;

  // Calculate related products
  // 1. If user has a suggested skin type, show products for that skin type
  // 2. Otherwise, show products that share the current product's skin types
  const relatedProducts = products
    .filter(p => p.id !== product.id)
    .filter(p => {
      if (suggestedSkinType) return p.suitableSkinTypes.includes(suggestedSkinType);
      return p.suitableSkinTypes.some(t => product.suitableSkinTypes.includes(t));
    })
    .slice(0, 3); // show up to 3 related products

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-cream rounded-4xl shadow-2xl animate-[fadeIn_0.3s_ease]" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-white/50 hover:bg-white text-ink transition-colors z-10">
          <X className="w-5 h-5" />
        </button>
        <div className="grid md:grid-cols-2">
          <div className="h-64 md:h-auto relative">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <span className="absolute top-4 left-4 rounded-full bg-cream/90 backdrop-blur px-3 py-1 text-xs font-semibold text-blush-600 ring-1 ring-blush-100">
              {product.category}
            </span>
          </div>
          <div className="p-6 sm:p-8 flex flex-col">
            <h3 className="mt-2 font-serif text-3xl font-semibold text-ink">{product.name}</h3>
            <p className="text-lg text-ink font-medium mt-1">{product.price}</p>
            <div className="flex items-center gap-1 text-blush-500 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? 'fill-current' : 'opacity-30'}`} />
              ))}
              <span className="text-sm text-ink/60 ml-1">{product.rating.toFixed(1)}</span>
            </div>
            <p className="mt-4 text-ink/80 leading-relaxed text-sm">{product.description}</p>
            
            <div className="mt-4">
              <span className="text-xs font-semibold text-ink/50 uppercase">Suitable for:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {product.suitableSkinTypes?.map(t => (
                  <span key={t} className="text-xs px-2 py-0.5 bg-blush-50 text-blush-600 rounded-full capitalize border border-blush-100">{t}</span>
                ))}
              </div>
            </div>
            
            <div className="mt-4 flex-1">
              <span className="text-xs font-semibold text-ink/50 uppercase">Ingredients:</span>
              <p className="text-xs text-ink/70 mt-1">{product.ingredients?.join(', ')}</p>
            </div>

            <button onClick={onAdd} className={`mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-colors duration-300 ${isAdded ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-ink text-cream hover:bg-blush-600'}`}>
              {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {isAdded ? 'Added to Routine' : 'Add to Routine'}
            </button>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="p-6 sm:p-8 bg-beige-50 border-t border-blush-100">
            <h4 className="font-serif text-xl font-semibold text-ink mb-4">
              {suggestedSkinType ? 'More options for your skin type' : 'Pairs well with'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedProducts.map(rp => (
                <div 
                  key={rp.id} 
                  onClick={() => onSelectRelated(rp)}
                  className="group cursor-pointer rounded-2xl bg-white p-3 ring-1 ring-blush-100 shadow-sm hover:shadow-soft transition-all duration-300 flex items-center gap-3"
                >
                  <img src={rp.image} alt={rp.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-ink leading-tight group-hover:text-blush-600 transition-colors">{rp.name}</p>
                    <p className="text-xs text-ink/60 mt-0.5">{rp.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product, index, onClick, onAdd, isAdded }: { product: Product; index: number; onClick: () => void; onAdd: (e: React.MouseEvent) => void; isAdded: boolean }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`reveal ${visible ? 'is-visible' : ''} cursor-pointer group relative rounded-4xl bg-cream ring-1 ring-blush-100 overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-500 hover:-translate-y-1.5 flex flex-col`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <div className="relative h-64 overflow-hidden shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <span className="absolute top-4 left-4 rounded-full bg-cream/90 backdrop-blur px-3 py-1 text-xs font-semibold text-blush-600 ring-1 ring-blush-100">
          {product.category}
        </span>
        <span className="absolute top-4 right-4 rounded-full bg-ink/80 backdrop-blur px-3 py-1 text-xs font-semibold text-cream">
          {product.price}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-1 text-blush-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${i < Math.round(product.rating) ? 'fill-current' : 'opacity-30'}`}
            />
          ))}
          <span className="text-xs text-ink/60 ml-1">{product.rating.toFixed(1)}</span>
        </div>

        <h3 className="mt-3 font-serif text-2xl font-semibold text-ink leading-tight">
          {product.name}
        </h3>
        <p className="text-sm text-blush-600 font-medium mt-0.5">{product.tagline}</p>
        <p className="mt-3 text-sm text-ink/70 leading-relaxed line-clamp-2">{product.description}</p>

        <div className="mt-4 flex flex-wrap gap-2 mb-4">
          {product.benefits.map((b) => (
            <span
              key={b}
              className="rounded-full bg-blush-50 px-3 py-1 text-xs font-medium text-blush-600 ring-1 ring-blush-100"
            >
              {b}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-2">
          <button onClick={onAdd} className={`w-full inline-flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-colors duration-300 ${isAdded ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-ink text-cream hover:bg-blush-600'}`}>
            {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {isAdded ? 'Added' : 'Add to Routine'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Products({ suggestedSkinType }: { suggestedSkinType?: SkinType | null }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [routine, setRoutine] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('glowcare_routine');
    if (saved) setRoutine(JSON.parse(saved));
  }, []);

  // Auto-switch to Recommended category when a skin type is suggested
  useEffect(() => {
    if (suggestedSkinType) {
      setCategory('✨ Recommended');
    }
  }, [suggestedSkinType]);

  const toggleRoutine = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setRoutine(prev => {
      const next = prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id];
      localStorage.setItem('glowcare_routine', JSON.stringify(next));
      return next;
    });
  };

  const baseCategories = Array.from(new Set(products.map(p => p.category)));
  const categories = suggestedSkinType 
    ? ['✨ Recommended', 'All', ...baseCategories]
    : ['All', ...baseCategories];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    
    let matchesCategory = false;
    if (category === 'All') {
      matchesCategory = true;
    } else if (category === '✨ Recommended' && suggestedSkinType) {
      matchesCategory = p.suitableSkinTypes?.includes(suggestedSkinType) || false;
    } else {
      matchesCategory = p.category === category;
    }
    
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="products" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 -z-10 bg-beige-50" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blush-500">
            The Collection
          </span>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl font-semibold text-ink">
            Products your skin will love
          </h2>
          <p className="mt-4 text-ink/70 leading-relaxed">
            Each formula is crafted with clean, proven ingredients and matched
            to your skin by our AI — so every step earns its place.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-between max-w-4xl mx-auto">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-blush-200 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blush-400 transition-all text-sm"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 hide-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${category === cat ? 'bg-ink text-white' : 'bg-white text-ink/70 hover:bg-blush-50 border border-blush-100'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProducts.map((p, i) => (
            <ProductCard 
              key={p.id} 
              product={p} 
              index={i} 
              onClick={() => setSelectedProduct(p)}
              onAdd={(e) => toggleRoutine(p.id, e)}
              isAdded={routine.includes(p.id)}
            />
          ))}

          {filteredProducts.length === 0 && (
            <div className="col-span-full text-center py-12 text-ink/50">
              No products found matching your criteria.
            </div>
          )}

          {/* CTA tile */}
          {category === 'All' && !search && (
            <div className="rounded-4xl bg-gradient-to-br from-blush-300 to-blush-500 p-8 flex flex-col justify-center items-center text-center text-cream shadow-soft">
              <h3 className="font-serif text-3xl font-semibold leading-tight">
                Not sure where to start?
              </h3>
              <p className="mt-3 text-cream/90 text-sm leading-relaxed max-w-xs">
                Let our AI build a routine tailored to your skin type in under a minute.
              </p>
              <a
                href="#quiz"
                className="mt-6 rounded-full bg-cream text-blush-600 px-6 py-3 text-sm font-semibold shadow-soft hover:bg-white transition-colors"
              >
                Take the Skin Quiz
              </a>
            </div>
          )}
        </div>
      </div>

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onAdd={() => toggleRoutine(selectedProduct.id)}
          isAdded={routine.includes(selectedProduct.id)}
          suggestedSkinType={suggestedSkinType}
          onSelectRelated={(p) => setSelectedProduct(p)}
        />
      )}
    </section>
  );
}
