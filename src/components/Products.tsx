import { useState, useEffect } from 'react';
import { Star, Plus, X, Search, Check, ShieldCheck, Sparkles, Stethoscope } from 'lucide-react';
import { products, type Product, type SkinType } from '@/data';
import { useReveal } from '@/hooks/useReveal';

function ProductModal({
  product,
  onClose,
  onAdd,
  isAdded,
  suggestedSkinType,
  onSelectRelated,
}: {
  product: Product;
  onClose: () => void;
  onAdd: () => void;
  isAdded: boolean;
  suggestedSkinType?: SkinType | null;
  onSelectRelated: (p: Product) => void;
}) {
  if (!product) return null;

  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .filter((p) => {
      if (suggestedSkinType) return p.suitableSkinTypes.includes(suggestedSkinType);
      return p.suitableSkinTypes.some((t) => product.suitableSkinTypes.includes(t));
    })
    .slice(0, 3);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-ink/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease]"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl sm:rounded-5xl shadow-2xl border border-blush-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 sm:p-2.5 rounded-full bg-cream/90 hover:bg-cream text-ink transition-colors z-20 border border-blush-200"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image & Brand */}
          <div className="relative min-h-[260px] sm:min-h-[320px] md:min-h-full bg-slate-50 flex items-center justify-center p-4 sm:p-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full max-h-[320px] sm:max-h-[380px] object-cover rounded-2xl sm:rounded-3xl shadow-soft"
            />
            <span className="absolute top-4 left-4 sm:top-6 sm:left-6 rounded-full bg-white/95 backdrop-blur px-3 py-1 text-xs font-bold text-blush-600 border border-blush-100 shadow-sm">
              {product.brand}
            </span>
          </div>

          {/* Product Details & Why It Helps */}
          <div className="p-4 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-ink/50">
                {product.category}
              </span>
              <h3 className="mt-1 font-serif text-2xl sm:text-3xl font-bold text-ink leading-tight">
                {product.name}
              </h3>
              <p className="text-sm text-blush-600 font-semibold mt-1">
                {product.tagline}
              </p>

              <div className="flex items-center justify-between mt-3 pb-3 border-b border-blush-100">
                <span className="font-bold text-ink text-2xl">{product.price}</span>
                <div className="flex items-center gap-1 text-blush-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(product.rating) ? 'fill-current' : 'opacity-25'
                      }`}
                    />
                  ))}
                  <span className="text-xs font-bold text-ink ml-1">{product.rating.toFixed(1)}</span>
                </div>
              </div>

              {/* WHY THIS HELPS YOUR SKIN (KEY USER REQUIREMENT) */}
              <div className="mt-4 p-4 rounded-2xl bg-blush-50/80 border border-blush-200">
                <div className="flex items-center gap-1.5 text-xs font-bold text-blush-800 mb-1">
                  <Stethoscope className="w-4 h-4 text-blush-600" />
                  Why this product is useful for your skin:
                </div>
                <p className="text-xs text-ink/80 leading-relaxed font-medium">
                  {product.whyHelpful.replace('Why it helps your skin: ', '')}
                </p>
              </div>

              {/* Target Concerns Solved */}
              {product.targetConcerns && product.targetConcerns.length > 0 && (
                <div className="mt-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-ink/50 block mb-1.5">
                    Real-Life Concerns Treated:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.targetConcerns.map((tc) => (
                      <span
                        key={tc}
                        className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200"
                      >
                        ✓ {tc}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* How to Use in Routine */}
              <div className="mt-4 p-3 rounded-2xl bg-cream border border-blush-100 text-xs">
                <span className="font-bold text-ink block mb-0.5">📋 How to Use in Daily Routine:</span>
                <p className="text-ink/75 leading-relaxed">{product.howToUse}</p>
              </div>

              {/* Clinical Proof */}
              <div className="mt-3 flex items-center gap-1.5 text-[11px] text-ink/65 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{product.clinicalProof}</span>
              </div>
            </div>

            <button
              onClick={onAdd}
              className={`mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition-all duration-300 shadow-soft ${
                isAdded
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-ink text-white hover:bg-blush-600'
              }`}
            >
              {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {isAdded ? 'Added to Your Daily Routine' : 'Add to My Routine'}
            </button>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="p-4 sm:p-8 bg-cream/50 border-t border-blush-100">
            <h4 className="font-serif text-lg font-bold text-ink mb-4">
              {suggestedSkinType ? 'Other Formulations for Your Skin Profile' : 'Pairs Well With In Routine'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {relatedProducts.map((rp) => (
                <div
                  key={rp.id}
                  onClick={() => onSelectRelated(rp)}
                  className="group cursor-pointer rounded-2xl bg-white p-3.5 ring-1 ring-blush-100 shadow-sm hover:shadow-soft transition-all duration-300 flex items-center gap-3"
                >
                  <img
                    src={rp.image}
                    alt={rp.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-blush-600 block truncate">{rp.brand}</span>
                    <p className="text-xs font-semibold text-ink leading-tight group-hover:text-blush-600 transition-colors truncate">
                      {rp.name}
                    </p>
                    <p className="text-xs font-bold text-ink/80 mt-1">{rp.price}</p>
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

function ProductCard({
  product,
  index,
  onClick,
  onAdd,
  isAdded,
  suggestedSkinType,
}: {
  product: Product;
  index: number;
  onClick: () => void;
  onAdd: (e: React.MouseEvent) => void;
  isAdded: boolean;
  suggestedSkinType?: SkinType | null;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const isMatch = suggestedSkinType && product.suitableSkinTypes.includes(suggestedSkinType);

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`reveal ${
        visible ? 'is-visible' : ''
      } cursor-pointer group relative rounded-3xl sm:rounded-4xl bg-white ring-1 ring-blush-100 overflow-hidden shadow-soft hover:shadow-soft-xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <div>
        {/* Product Visual Container */}
        <div className="relative h-60 sm:h-64 md:h-72 overflow-hidden shrink-0 bg-slate-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Real Brand Badge */}
          <span className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 rounded-full bg-white/95 backdrop-blur px-3 py-1 text-xs font-bold text-blush-600 border border-blush-100 shadow-sm">
            {product.brand}
          </span>

          {/* Price Tag */}
          <span className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 rounded-full bg-ink/85 backdrop-blur px-3 py-1 text-xs font-bold text-white shadow-sm">
            {product.price}
          </span>

          {/* Skin Match Tag */}
          {isMatch && (
            <span className="absolute bottom-3 left-3.5 sm:left-4 rounded-full bg-emerald-600/95 backdrop-blur text-white px-2.5 py-0.5 text-[10px] font-bold flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3" />
              Prescribed for your {suggestedSkinType} skin
            </span>
          )}
        </div>

        {/* Card Content */}
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-ink/50">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-blush-500">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-bold text-ink">{product.rating.toFixed(1)}</span>
            </div>
          </div>

          <h3 className="font-serif text-lg sm:text-xl font-bold text-ink leading-tight group-hover:text-blush-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-blush-600 font-semibold mt-0.5">{product.tagline}</p>

          {/* WHY IT HELPS YOU BOX */}
          <div className="mt-3 p-3 rounded-2xl bg-blush-50/70 border border-blush-100 text-[11px] sm:text-xs text-ink/75 leading-relaxed">
            <span className="font-bold text-blush-700 block mb-0.5">
              🎯 Why it helps your skin:
            </span>
            {product.whyHelpful.replace('Why it helps your skin: ', '')}
          </div>

          {/* Target Concerns Chips */}
          {product.targetConcerns && product.targetConcerns.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {product.targetConcerns.slice(0, 3).map((tc) => (
                <span
                  key={tc}
                  className="rounded-full bg-cream px-2.5 py-0.5 text-[10px] font-semibold text-ink/75 border border-blush-100"
                >
                  {tc}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="px-4 pb-4 pt-1 sm:px-6 sm:pb-6 sm:pt-2">
        <button
          onClick={onAdd}
          className={`w-full inline-flex items-center justify-center gap-2 rounded-full py-3 text-xs sm:text-sm font-semibold transition-all duration-300 shadow-sm ${
            isAdded
              ? 'bg-emerald-600 text-white shadow-soft'
              : 'bg-ink text-white hover:bg-blush-600'
          }`}
        >
          {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {isAdded ? 'Added to Routine ✓' : 'Add to Routine'}
        </button>
      </div>
    </div>
  );
}

export default function Products({ suggestedSkinType }: { suggestedSkinType?: SkinType | null }) {
  const [search, setSearch] = useState('');
  const [concernFilter, setConcernFilter] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [routine, setRoutine] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('glowcare_routine');
    if (saved) setRoutine(JSON.parse(saved));
  }, []);

  const toggleRoutine = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setRoutine((prev) => {
      const next = prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id];
      localStorage.setItem('glowcare_routine', JSON.stringify(next));
      return next;
    });
  };

  const concernFilters = [
    'All',
    '✨ Prescribed For Me',
    'Acne & Pimples',
    'Open Pores & Oil',
    'Dark Spots & Glow',
    'Dryness & Barrier',
    'Sun Protection',
  ];

  const filteredProducts = products.filter((p) => {
    const query = search.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(query) ||
      p.brand.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.targetConcerns.some((tc) => tc.toLowerCase().includes(query)) ||
      p.ingredients.some((ing) => ing.toLowerCase().includes(query));

    let matchesConcern = true;
    if (concernFilter === '✨ Prescribed For Me' && suggestedSkinType) {
      matchesConcern = p.suitableSkinTypes.includes(suggestedSkinType);
    } else if (concernFilter === 'Acne & Pimples') {
      matchesConcern = p.targetConcerns.some((tc) => tc.includes('Acne') || tc.includes('Blemish'));
    } else if (concernFilter === 'Open Pores & Oil') {
      matchesConcern = p.targetConcerns.some((tc) => tc.includes('Pore') || tc.includes('Sebum'));
    } else if (concernFilter === 'Dark Spots & Glow') {
      matchesConcern = p.targetConcerns.some((tc) => tc.includes('Dark Spot') || tc.includes('Pigment') || tc.includes('Glow'));
    } else if (concernFilter === 'Dryness & Barrier') {
      matchesConcern = p.targetConcerns.some((tc) => tc.includes('Dry') || tc.includes('Barrier'));
    } else if (concernFilter === 'Sun Protection') {
      matchesConcern = p.category.includes('Sunscreen') || p.category.includes('Shield');
    }

    return matchesSearch && matchesConcern;
  });

  return (
    <section id="products" className="relative py-20 sm:py-24 lg:py-32 bg-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blush-500">
            Clinical Product Dispensary
          </span>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink">
            Real Products for Real Skin Problems
          </h2>
          <p className="mt-4 text-ink/75 leading-relaxed text-sm sm:text-base">
            Every product below is an authentic, globally renowned dermatological formulation — from Minimalist 2% Salicylic Acid to CeraVe and The Ordinary. We clearly explain what each formula does and why it is useful for your skin.
          </p>
        </div>

        {/* Search & Concern Filter Bar */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 items-center justify-between max-w-5xl mx-auto">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
            <input
              type="text"
              placeholder="Search by brand, active ingredient..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-blush-200 bg-white focus:outline-none focus:ring-2 focus:ring-blush-400 transition-all text-xs sm:text-sm"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {concernFilters.map((flt) => (
              <button
                key={flt}
                onClick={() => setConcernFilter(flt)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 ${
                  concernFilter === flt
                    ? 'bg-ink text-white shadow-soft'
                    : 'bg-white text-ink/75 hover:bg-blush-50 border border-blush-100'
                }`}
              >
                {flt}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid: 1 column on mobile (up to 480px / 640px), 2 on tablets, 3 on desktop */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {filteredProducts.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              index={i}
              onClick={() => setSelectedProduct(p)}
              onAdd={(e) => toggleRoutine(p.id, e)}
              isAdded={routine.includes(p.id)}
              suggestedSkinType={suggestedSkinType}
            />
          ))}

          {filteredProducts.length === 0 && (
            <div className="col-span-full text-center py-16 bg-white rounded-4xl border border-blush-100">
              <p className="text-ink/60 text-base font-medium">
                No formulations matched your specific filter.
              </p>
              <button
                onClick={() => {
                  setSearch('');
                  setConcernFilter('All');
                }}
                className="mt-4 px-6 py-2.5 rounded-full bg-ink text-white text-xs font-semibold hover:bg-blush-600 transition-colors"
              >
                Reset All Filters
              </button>
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
