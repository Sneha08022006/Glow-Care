export type SkinType = 'dry' | 'oily' | 'combination' | 'sensitive';

export type SkinConcernItem = {
  name: string;
  severity: 'Mild' | 'Moderate' | 'Noticeable';
  location: string;
  clinicalNotes: string;
};

export type DoctorVerdict = {
  doctorName: string;
  doctorRole: string;
  summary: string;
  keyActives: string[];
  amRoutine: string[];
  pmRoutine: string[];
  precautions: string[];
  lifestyleAdvice: string;
};

export type ClinicalSkinAnalysis = {
  skinType: SkinType | string;
  skinScore: number;
  metrics: {
    hydration: number;
    oilBalance: number;
    poreClarity: number;
    barrierHealth: number;
  };
  concerns: SkinConcernItem[];
  doctorVerdict: DoctorVerdict;
  prescribedProductIds: string[];
  recommendation?: string;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  tagline: string;
  description: string;
  price: string;
  image: string;
  benefits: string[];
  rating: number;
  ingredients: string[];
  suitableSkinTypes: SkinType[];
  targetConcerns: string[];
  whyHelpful: string;
  howToUse: string;
  clinicalProof: string;
  keyActives: string[];
};

export const products: Product[] = [
  {
    id: 'exfoliator',
    name: 'Minimalist 2% Salicylic Acid Face Serum',
    brand: 'Be Minimalist',
    category: 'Acne & Pore Treatment',
    tagline: 'Deep pore decongestant for active acne & blackheads',
    description:
      'A multi-action BHA formula crafted with 2% pure Salicylic Acid and antibacterial Oligopeptide-10. It dissolves oxidized sebum, unclogs micro-comedones, and prevents bacterial acne flare-ups without peeling.',
    price: '₹549',
    image:
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=700&q=80',
    benefits: ['Clears Active Acne', 'Unclogs Pores', 'Reduces Blackheads', 'Oil Control'],
    rating: 4.9,
    ingredients: ['Salicylic Acid 2%', 'Oligopeptide-10', 'Centella Asiatica', 'Sodium Hyaluronate'],
    suitableSkinTypes: ['oily', 'combination', 'dry'],
    targetConcerns: ['Active Acne & Pimples', 'Open & Clogged Pores', 'Blackheads & Whiteheads', 'Excess Sebum'],
    whyHelpful:
      'Why it helps your skin: Salicylic Acid is oil-soluble, penetrating deep into congested sebum inside your pores to dissolve the plugs causing pimples and blackheads, while Centella prevents redness and flaking.',
    howToUse:
      'PM Step 2: Take 2-3 drops on clean, dry face. Pat gently across T-zone and breakout areas. Follow with moisturizer.',
    clinicalProof: 'Dermatologist Tested • Non-comedogenic • 91% saw significant blemish reduction in 2 weeks',
    keyActives: ['2% Pure Salicylic Acid (BHA)', 'Oligopeptide-10 Anti-Microbial', 'Centella Asiatica Extract'],
  },
  {
    id: 'toner',
    name: 'The Ordinary Niacinamide 10% + Zinc 1%',
    brand: 'The Ordinary',
    category: 'Pore Refining & Sebum Serum',
    tagline: 'High-strength vitamin & mineral blemish formula',
    description:
      'Clinically renowned 10% Vitamin B3 (Niacinamide) paired with 1% Zinc PCA. Visibly minimizes dilated pore size, regulates excess sebum production, and smooths uneven texture caused by chronic oiliness.',
    price: '₹600',
    image:
      'https://images.unsplash.com/photo-1608248597359-54848149e9cb?auto=format&fit=crop&w=700&q=80',
    benefits: ['Tightens Enlarged Pores', 'Balances Sebum', 'Strengthens Barrier', 'Smoother Texture'],
    rating: 4.8,
    ingredients: ['Niacinamide 10%', 'Zinc PCA 1%', 'Tamarindus Indica Seed Gum', 'Pentylene Glycol'],
    suitableSkinTypes: ['oily', 'combination', 'sensitive'],
    targetConcerns: ['Enlarged Pores', 'Oily T-Zone', 'Uneven Skin Texture', 'Blemish Marks'],
    whyHelpful:
      'Why it helps your skin: Niacinamide strengthens the walls of your pores so they retract and appear smaller, while Zinc PCA suppresses excessive sebaceous gland activity and soothes inflammation.',
    howToUse:
      'AM & PM: Apply a few drops to entire face before heavier creams. Ideal for morning oil control.',
    clinicalProof: 'Dermatologist Tested • Oil-free • Clinically proven to reduce sebum by up to 43%',
    keyActives: ['10% Niacinamide (Vitamin B3)', '1% Zinc PCA', 'Plant Polysaccharide Complex'],
  },
  {
    id: 'moisturizer',
    name: 'Cetaphil Moisturizing Cream with Ceramides',
    brand: 'Cetaphil',
    category: 'Barrier Repair Moisturizer',
    tagline: '48-hour deep barrier hydration for compromised skin',
    description:
      'Intense, rich hydration formulated with Sweet Almond Oil, Niacinamide, Panthenol, and essential Ceramides. Repairs broken skin barriers, stops dryness flakes, and locks moisture in without stinging.',
    price: '₹475',
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=80',
    benefits: ['48h Barrier Repair', 'Zero Stinging', 'Soothes Flaking', 'Fragrance-Free'],
    rating: 4.9,
    ingredients: ['Water', 'Glycerin', 'Sweet Almond Oil', 'Niacinamide', 'Panthenol (Pro-Vitamin B5)', 'Tocopherol'],
    suitableSkinTypes: ['dry', 'sensitive', 'combination', 'oily'],
    targetConcerns: ['Dryness & Flaking', 'Damaged Skin Barrier', 'Stinging from Actives', 'Redness & Irritation'],
    whyHelpful:
      'Why it helps your skin: When your skin barrier is depleted, moisture evaporates and irritants enter. This cream delivers biomimetic lipids and Pro-Vitamin B5 to rebuild the lipid shield within 48 hours.',
    howToUse:
      'AM & PM: Smooth a nickel-sized amount over face and neck as your moisturizing step.',
    clinicalProof: 'Tested on sensitive skin • Hypoallergenic • 100% barrier recovery shown in clinical trials',
    keyActives: ['Sweet Almond Oil', 'Niacinamide', 'Panthenol Pro-Vitamin B5', 'Vitamin E'],
  },
  {
    id: 'sunscreen',
    name: 'La Roche-Posay Anthelios Invisible Fluid SPF 50+',
    brand: 'La Roche-Posay',
    category: 'Broad Spectrum Sunscreen',
    tagline: 'Ultra-light daily shield against dark spots & photo-aging',
    description:
      'Pioneering Mexoryl 400 filter technology providing the highest UVA/UVB protection. Absorbs with an invisible matte finish, zero white cast, zero eye stinging, and prevents post-acne marks from turning into permanent dark spots.',
    price: '₹1,250',
    image:
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=700&q=80',
    benefits: ['Broad Spectrum SPF 50+', 'No White Cast', 'Prevents Dark Spots', 'Sweat & Water Resistant'],
    rating: 4.9,
    ingredients: ['Mexoryl 400 UV Filter', 'Thermal Spring Water', 'Glycerin', 'Silica Matting Spheres'],
    suitableSkinTypes: ['oily', 'combination', 'sensitive', 'dry'],
    targetConcerns: ['Sun Tanning & Pigmentation', 'Dark Spots (PIH)', 'Premature Fine Lines', 'Sunburn'],
    whyHelpful:
      'Why it helps your skin: UV radiation darkens acne scars into stubborn brown spots and triggers oil oxidation. This medical-grade SPF stops 98% of UV rays with a non-sticky, non-comedogenic invisible shield.',
    howToUse:
      'AM: Apply liberally as the final step of your morning skincare routine 15 minutes before sun exposure.',
    clinicalProof: 'Dermatologist Recommended Globally • Non-comedogenic • Safe for acne-prone skin',
    keyActives: ['Mexoryl 400 UV Technology', 'La Roche-Posay Thermal Prebiotic Water', 'Silica Sebum Blurring'],
  },
  {
    id: 'cleanser',
    name: 'CeraVe Hydrating Facial Cleanser',
    brand: 'CeraVe',
    category: 'Gentle Barrier Cleanser',
    tagline: 'Non-foaming lotion cleanser with 3 essential ceramides',
    description:
      'Developed with dermatologists, this unique lotion-like formula gently cleanses dirt and light makeup without disrupting the skin’s natural protective barrier. Leaves skin feeling clean, calm, and supple.',
    price: '₹620',
    image:
      'https://images.unsplash.com/photo-1556228722-d0b63b9f481c?auto=format&fit=crop&w=700&q=80',
    benefits: ['Protects Skin Barrier', 'Non-Drying Cleanse', 'MVE Delivery Tech', 'Fragrance-Free'],
    rating: 4.9,
    ingredients: ['Ceramides 1, 3, 6-II', 'Hyaluronic Acid', 'Glycerin', 'Cholesterol', 'Phytosphingosine'],
    suitableSkinTypes: ['dry', 'sensitive', 'combination'],
    targetConcerns: ['Tight / Dry Skin After Washing', 'Stinging & Redness', 'Damaged Skin Barrier'],
    whyHelpful:
      'Why it helps your skin: Most cleansers use harsh sulfates that strip natural ceramides, causing tightness. CeraVe replaces ceramides as you wash, maintaining biological pH 5.5.',
    howToUse:
      'AM & PM: Wet skin with lukewarm water. Massage 1 pump in gentle circular motions. Rinse thoroughly.',
    clinicalProof: 'Accepted by National Eczema Association • Non-irritating • 24-hour hydration retention',
    keyActives: ['Ceramides 1, 3, 6-II', 'Hyaluronic Acid', 'MVE Controlled-Release Technology'],
  },
  {
    id: 'face-wash',
    name: 'Bioderma Sensibio Gel Moussant',
    brand: 'Bioderma',
    category: 'Soothing Micellar Face Wash',
    tagline: 'Gentle foaming gel for oily, sensitive & reactive skin',
    description:
      'Enriched with Coco-Glucoside and the patented D.A.F. dermatological complex. Cleanses excess sebum and environmental pollution while boosting the tolerance threshold of sensitive, redness-prone skin.',
    price: '₹699',
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=80',
    benefits: ['Balances T-Zone Sebum', 'Calms Facial Redness', 'Soap-Free & pH 5.5', 'No Tightness'],
    rating: 4.8,
    ingredients: ['Coco-Glucoside', 'Glyceryl Oleate', 'Mannitol', 'Xylitol', 'Rhamnose Complex'],
    suitableSkinTypes: ['oily', 'combination', 'sensitive'],
    targetConcerns: ['Excess Morning Oil', 'Facial Redness & Warmth', 'Sensitive Acne-Prone Skin'],
    whyHelpful:
      'Why it helps your skin: Cleanses oily T-zones cleanly without the rebound oil production caused by harsh foaming face washes. Soothes active inflammation on contact.',
    howToUse:
      'AM & PM: Apply on wet skin, work into a gentle cloud-like lather, massage across forehead and cheeks, rinse.',
    clinicalProof: 'Dermatologically Tested • 100% skin tolerance • Physiological pH 5.5',
    keyActives: ['Coco-Glucoside Mild Cleansing Base', 'D.A.F. Skin Tolerance Enhancer', 'Biomimetic Lipids'],
  },
  {
    id: 'serum',
    name: 'Minimalist 10% Vitamin C Serum with Centella',
    brand: 'Be Minimalist',
    category: 'Brightening & Dark Spot Serum',
    tagline: 'Pure glow formula for stubborn acne scars & melasma',
    description:
      'Formulated with 10% pure Ethyl Ascorbic Acid (an ultra-stable Vitamin C derivative) and soothing Centella Asiatica. It inhibits tyrosinase activity to fade stubborn dark marks, brightens dull skin tone, and neutralizes free radicals.',
    price: '₹699',
    image:
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=700&q=80',
    benefits: ['Fades Dark Spots & PIH', 'Revives Skin Radiance', 'Antioxidant Defense', 'Even Skin Tone'],
    rating: 4.8,
    ingredients: ['10% Ethyl Ascorbic Acid', 'Centella Asiatica Leaf Water', 'Polyhydroxy Acid (Gluconolactone)'],
    suitableSkinTypes: ['dry', 'oily', 'combination'],
    targetConcerns: ['Post-Acne Dark Spots (PIH)', 'Dull Skin / Loss of Glow', 'Uneven Tanning & Melasma'],
    whyHelpful:
      'Why it helps your skin: When acne clears, excess melanin creates persistent brown spots. This serum blocks melanin formation and accelerates cellular brightening while defending against oxidative stress.',
    howToUse:
      'AM: Apply 3-4 drops after cleansing. Gently pat into face and neck before moisturizer and sunscreen.',
    clinicalProof: 'Clinical In-Vivo Results • 86% noticed visible spot lightening within 4 weeks',
    keyActives: ['10% Stable Ethyl Ascorbic Acid (Vitamin C)', 'Centella Asiatica (Gotu Kola)', '1% Gluconolactone'],
  },
  {
    id: 'eye-cream',
    name: 'The Ordinary Caffeine Solution 5% + EGCG',
    brand: 'The Ordinary',
    category: 'Under-Eye Depuffing Treatment',
    tagline: 'High-solubility caffeine treatment for dark circles',
    description:
      'An ultra-light liquid serum combining high 5% caffeine with purified Epigallocatechin Gallatyl Glucoside (EGCG) from green tea leaves. Targeted specifically at vascular dark under-eye circles and morning fluid retention puffiness.',
    price: '₹550',
    image:
      'https://images.unsplash.com/photo-1608248597359-54848149e9cb?auto=format&fit=crop&w=700&q=80',
    benefits: ['Reduces Dark Under-Eye Circles', 'Depuffs Morning Bags', 'Antioxidant Rich', 'Fast Absorbing'],
    rating: 4.7,
    ingredients: ['Caffeine 5%', 'Epigallocatechin Gallatyl Glucoside (EGCG)', 'Hyaluronic Acid', 'Lactic Acid'],
    suitableSkinTypes: ['dry', 'oily', 'combination', 'sensitive'],
    targetConcerns: ['Dark Under-Eye Circles', 'Morning Eye Puffiness', 'Tired-Looking Eyes'],
    whyHelpful:
      'Why it helps your skin: The skin under your eyes is 10x thinner than the rest of your face. Caffeine constricts swollen capillaries while green tea polyphenol reduces fluid stagnation.',
    howToUse:
      'AM & PM: Massage a tiny drop around eye contour both morning and night.',
    clinicalProof: 'Ophthalmologist & Dermatologist Tested • Water-free • High potency polyphenol complex',
    keyActives: ['5% Pure Caffeine', 'Purified EGCG (Green Tea Extract)', 'Low Molecular Hyaluronic Acid'],
  },
  {
    id: 'night-cream',
    name: 'COSRX Advanced Snail 96 Mucin Power Essence',
    brand: 'COSRX',
    category: 'Glass Skin Hydrating Essence',
    tagline: '96.3% snail secretion filtrate for intense cell renewal',
    description:
      'The viral K-beauty holy grail essence. Packed with 96.3% Snail Secretion Filtrate to replenish moisture loss, smooth rough bumps, fade post-breakout scars, and restore a luminous, glass-skin bounce.',
    price: '₹1,050',
    image:
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=700&q=80',
    benefits: ['Intense Glass Skin Glow', 'Heals Acne Marks', 'Deep Hydration Bounce', 'Smooths Texture'],
    rating: 4.9,
    ingredients: ['Snail Secretion Filtrate 96.3%', 'Sodium Hyaluronate', 'Allantoin', 'Panthenol', 'Arginine'],
    suitableSkinTypes: ['dry', 'oily', 'combination', 'sensitive'],
    targetConcerns: ['Dehydrated Rough Skin', 'Lingering Acne Red Marks', 'Loss of Plumpness & Elasticity'],
    whyHelpful:
      'Why it helps your skin: Snail mucin naturally contains peptides, hyaluronic acid, and collagen precursors that repair micro-wounds from acne and seal moisture in without feeling heavy or oily.',
    howToUse:
      'PM (or AM): After cleansing and toning, dispense 2 pumps and pat thoroughly onto damp face until absorbed.',
    clinicalProof: 'Cruelty-Free Mucin Extraction • Hypoallergenic • Dermatologist Approved',
    keyActives: ['96.3% Snail Secretion Filtrate', 'Sodium Hyaluronate', 'Allantoin Barrier Soother'],
  },
  {
    id: 'clay-mask',
    name: 'Innisfree Super Volcanic Pore Clay Mask 2X',
    brand: 'Innisfree',
    category: 'Detoxifying Pore Clay Mask',
    tagline: 'Triple-exfoliating volcanic cluster treatment',
    description:
      'Formulated with Jeju Volcanic Clusters and AHA/BHA. Deeply vacuums out stubborn blackheads, absorbs excess greasy sebum from the T-zone, and cools skin down by 2°C to refine dilated pore appearance.',
    price: '₹950',
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=80',
    benefits: ['Absorbs Stubborn Sebum', 'Exfoliates Dead Cells', 'Cooling Pore Tightener', 'Clears Blackheads'],
    rating: 4.7,
    ingredients: ['Jeju Volcanic Clusters', 'Kaolin & Bentonite Clay', 'Lactic Acid (AHA)', 'Walnut Shell Powder'],
    suitableSkinTypes: ['oily', 'combination'],
    targetConcerns: ['Stubborn Blackheads', 'Extremely Greasy T-Zone', 'Enlarged Follicular Pores'],
    whyHelpful:
      'Why it helps your skin: Volcanic micro-porous particles have 2x more sebum-absorbing capacity than standard clay, drawing out buried oil plugs without stripping vital epidermal moisture.',
    howToUse:
      'Weekly: Apply evenly to dry face (or only T-zone) avoiding eyes and lips. Leave on for 10-15 minutes, then rinse with lukewarm water.',
    clinicalProof: 'Pore Tightening Tested • 98% noticed immediate matte feel without rebound oiliness',
    keyActives: ['Jeju Volcanic Ash Spheres', 'Kaolin Clay', 'AHA Lactic Acid'],
  },
  {
    id: 'face-oil',
    name: 'The Ordinary 100% Plant-Derived Squalane',
    brand: 'The Ordinary',
    category: 'Biomimetic Lipid Hydrator',
    tagline: '100% pure weightless lipid seal for supple skin',
    description:
      'A multi-functional, 100% plant-derived hydrocarbon that mimics your skin’s natural sebum. Provides lightweight surface hydration, eliminates dry patches, and leaves a healthy, non-greasy glow.',
    price: '₹750',
    image:
      'https://images.unsplash.com/photo-1608248597359-54848149e9cb?auto=format&fit=crop&w=700&q=80',
    benefits: ['Weightless Lipid Seal', 'Non-Comedogenic Glow', 'Restores Suppleness', 'Universal Hydration'],
    rating: 4.8,
    ingredients: ['100% Plant-Derived Squalane'],
    suitableSkinTypes: ['dry', 'sensitive', 'combination'],
    targetConcerns: ['Flaky Dry Patches', 'Tightness in Winter', 'Compromised Moisture Seal'],
    whyHelpful:
      'Why it helps your skin: Squalane is biocompatible with human skin oils, meaning it locks water molecules into the stratum corneum without clogging pores or feeling sticky.',
    howToUse:
      'PM: Press 2-3 drops into skin as the final step of nighttime routine to lock in serums and moisturizer.',
    clinicalProof: '100% Pure & Organic • Non-Comedogenic • ECOCERT Approved',
    keyActives: ['100% Pure Plant Squalane'],
  },
];

export type RoutineStep = {
  step: string;
  product: string;
  brand: string;
  detail: string;
  reason: string;
};

export type Recommendation = {
  type: SkinType;
  label: string;
  emoji: string;
  intro: string;
  routine: RoutineStep[];
  tips: string[];
};

export const recommendations: Record<SkinType, Recommendation> = {
  dry: {
    type: 'dry',
    label: 'Dry & Dehydrated Skin',
    emoji: '💧',
    intro:
      'Your skin barrier lacks natural lipids and struggles to retain water, causing flaking, tightness, and fine lines. This clinically proven routine restores ceramides, infuses hyaluronic acid, and seals moisture in for 48 hours.',
    routine: [
      {
        step: 'Step 1: Cleanse',
        product: 'CeraVe Hydrating Facial Cleanser',
        brand: 'CeraVe',
        detail: 'Gentle, non-foaming lotion wash with 3 essential ceramides that cleanses without stripping moisture.',
        reason: 'Prevents the tight, stinging sensation common in dry skin after washing.',
      },
      {
        step: 'Step 2: Treat',
        product: 'COSRX Advanced Snail 96 Mucin Power Essence',
        brand: 'COSRX',
        detail: '96.3% snail secretion filtrate that floods deep skin layers with cellular hydration.',
        reason: 'Restores skin elasticity, eliminates rough dry texture, and promotes a dewy bounce.',
      },
      {
        step: 'Step 3: Moisturize',
        product: 'Cetaphil Moisturizing Cream with Ceramides',
        brand: 'Cetaphil',
        detail: 'Clinically proven 48-hour lipid barrier recovery cream enriched with sweet almond oil and provitamin B5.',
        reason: 'Rebuilds the damaged stratum corneum to stop water from evaporating throughout the day.',
      },
      {
        step: 'Step 4: Protect',
        product: 'La Roche-Posay Anthelios Invisible Fluid SPF 50+',
        brand: 'La Roche-Posay',
        detail: 'Ultra-light daily sunscreen with Mexoryl 400 that guards against moisture-depleting UV rays.',
        reason: 'Prevents UV-induced barrier breakdown and stops premature dehydration fine lines.',
      },
    ],
    tips: [
      'Apply essence and moisturizer onto slightly damp skin within 60 seconds of washing.',
      'Use lukewarm water only — hot water melts away your natural protective lipid barrier.',
      'Add 2 drops of Plant Squalane on dry cheek patches at night for an extra moisture seal.',
    ],
  },
  oily: {
    type: 'oily',
    label: 'Oily & Acne-Prone Skin',
    emoji: '🌿',
    intro:
      'Your sebaceous glands overproduce oil, leading to midday shine, dilated follicular pores, blackheads, and bacterial acne breakouts. This routine cleanses deeply, dissolves pore plugs with BHA, and balances sebum with Niacinamide.',
    routine: [
      {
        step: 'Step 1: Cleanse',
        product: 'Bioderma Sensibio Gel Moussant',
        brand: 'Bioderma',
        detail: 'Physiological pH 5.5 micellar foaming gel that clears surface sebum without rebound oiliness.',
        reason: 'Removes excess grease and bacteria without triggering protective oil overproduction.',
      },
      {
        step: 'Step 2: Unclog Pores',
        product: 'Minimalist 2% Salicylic Acid Face Serum',
        brand: 'Be Minimalist',
        detail: 'Oil-soluble 2% BHA with Oligopeptide-10 that penetrates into oily pores to clear blackheads and active pimples.',
        reason: 'Directly targets and prevents bacterial acne, whiteheads, and congested follicular pores.',
      },
      {
        step: 'Step 3: Balance & Refine',
        product: 'The Ordinary Niacinamide 10% + Zinc 1%',
        brand: 'The Ordinary',
        detail: 'High-strength vitamin B3 that tightens dilated pores and regulates sebaceous gland secretion.',
        reason: 'Keeps face comfortably matte throughout the day and speeds up blemish mark healing.',
      },
      {
        step: 'Step 4: Protect',
        product: 'La Roche-Posay Anthelios Invisible Fluid SPF 50+',
        brand: 'La Roche-Posay',
        detail: 'Non-comedogenic, dry-touch SPF 50+ that protects against UV-induced sebum oxidation and post-acne dark marks.',
        reason: 'Stops UV rays from oxidizing sebum into blackheads and prevents red acne marks from turning brown.',
      },
    ],
    tips: [
      'Do not skip moisturizer — dehydrated oily skin produces even MORE oil to compensate.',
      'Use the 2% Salicylic Acid serum at night 3-4 times a week for clear pores.',
      'Use a clay mask once a week on the T-zone to vacuum out stubborn sebum deposits.',
    ],
  },
  combination: {
    type: 'combination',
    label: 'Combination Skin (T-Zone Oil + Normal/Dry Cheeks)',
    emoji: '⚖️',
    intro:
      'The most common skin profile: an overactive oily T-zone (forehead, nose, chin) with enlarged pores and blackheads, paired with normal or dry cheeks. This routine targets and balances both zones harmoniously.',
    routine: [
      {
        step: 'Step 1: Cleanse',
        product: 'Bioderma Sensibio Gel Moussant',
        brand: 'Bioderma',
        detail: 'Gentle micellar foaming wash that purifies the oily T-zone while keeping cheeks comfortable.',
        reason: 'Cleanses oil cleanly without overdrying the drier cheek areas.',
      },
      {
        step: 'Step 2: Balance Sebum',
        product: 'The Ordinary Niacinamide 10% + Zinc 1%',
        brand: 'The Ordinary',
        detail: 'Regulates T-zone shine, minimizes open pores around nose, and evens overall skin tone.',
        reason: 'Addresses the fundamental difference between your two skin zones.',
      },
      {
        step: 'Step 3: Hydrate',
        product: 'Cetaphil Moisturizing Cream with Ceramides',
        brand: 'Cetaphil',
        detail: 'Lightweight barrier nourishment with provitamin B5 and ceramides.',
        reason: 'Apply evenly over cheeks and a lighter layer over the T-zone for perfect balance.',
      },
      {
        step: 'Step 4: Protect',
        product: 'La Roche-Posay Anthelios Invisible Fluid SPF 50+',
        brand: 'La Roche-Posay',
        detail: 'Invisible fluid that absorbs without grease on the T-zone and protects cheeks from UV damage.',
        reason: 'Universal non-sticky protection that adapts seamlessly to both facial zones.',
      },
    ],
    tips: [
      'Apply more moisturizer to your cheeks and a lighter layer to your nose and forehead.',
      'Target Salicylic Acid specifically to the T-zone where blackheads and pimples appear.',
      'Blot excess midday oil with clean blotting paper instead of washing multiple times.',
    ],
  },
  sensitive: {
    type: 'sensitive',
    label: 'Sensitive & Redness-Prone Skin',
    emoji: '🌸',
    intro:
      'Your epidermal barrier is hyper-reactive, prone to stinging, redness, burning sensations, and allergic responses to harsh ingredients. This 100% fragrance-free, clinically gentle routine calms inflammation and rebuilds your barrier.',
    routine: [
      {
        step: 'Step 1: Cleanse',
        product: 'CeraVe Hydrating Facial Cleanser',
        brand: 'CeraVe',
        detail: 'Ultra-gentle non-foaming cleanser that preserves natural protective ceramides.',
        reason: 'Guaranteed zero stinging, burning, or tightness for compromised reactive skin.',
      },
      {
        step: 'Step 2: Soothe & Repair',
        product: 'COSRX Advanced Snail 96 Mucin Power Essence',
        brand: 'COSRX',
        detail: 'Pure hypoallergenic snail mucin with allantoin that calms flare-ups and heals irritated skin.',
        reason: 'Strengthens micro-capillary resilience and provides deep anti-inflammatory relief.',
      },
      {
        step: 'Step 3: Barrier Fortify',
        product: 'Cetaphil Moisturizing Cream with Ceramides',
        brand: 'Cetaphil',
        detail: 'Dermatologist-recommended hypoallergenic cream formulated with sweet almond oil and ceramides.',
        reason: 'Rebuilds the physical barrier so irritants and allergens cannot penetrate.',
      },
      {
        step: 'Step 4: Protect',
        product: 'La Roche-Posay Anthelios Invisible Fluid SPF 50+',
        brand: 'La Roche-Posay',
        detail: 'High tolerance thermal water sunscreen formulated specifically for allergy-prone, reactive skin.',
        reason: 'Defends fragile skin against UV-induced erythema, redness, and rosacea flare-ups.',
      },
    ],
    tips: [
      'Always patch test any new active product behind your ear for 24-48 hours before facial use.',
      'Avoid physical walnut or apricot scrubs — they cause micro-tears on sensitive skin.',
      'Stick to fragrance-free and alcohol-free formulas to prevent allergic dermatitis.',
    ],
  },
};

export type Review = {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
};

export const reviews: Review[] = [
  {
    name: 'Ananya Sharma',
    role: 'Verified Customer (Delhi)',
    avatar: 'https://images.pexels.com/photos/29755259/pexels-photo-29755259.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    rating: 5,
    text: 'The AI diagnostic quiz recommended the Minimalist 2% Salicylic Acid and CeraVe Cleanser for my acne. Within 3 weeks, my painful cystic breakouts have completely cleared up!',
  },
  {
    name: 'Rohan Mehra',
    role: 'Verified Customer (Mumbai)',
    avatar: 'https://images.pexels.com/photos/9774655/pexels-photo-9774655.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    rating: 5,
    text: 'I struggled with huge open pores and oily shine on my nose. The Ordinary Niacinamide paired with La Roche-Posay SPF 50 transformed my skin. My face stays matte all day!',
  },
  {
    name: 'Pooja Verma',
    role: 'Verified Customer (Bangalore)',
    avatar: 'https://images.pexels.com/photos/8140902/pexels-photo-8140902.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    rating: 5,
    text: 'The face scanner actually caught my under-eye dark circles and dry barrier flaking. The Cetaphil Ceramide cream and Caffeine solution worked wonders. Finally a skincare site that recommends real products!',
  },
  {
    name: 'Kavita Patel',
    role: 'Verified Customer (Ahmedabad)',
    avatar: 'https://images.pexels.com/photos/13140394/pexels-photo-13140394.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    rating: 5,
    text: 'Minimalist 10% Vitamin C serum faded my stubborn dark acne marks that had been there for 6 months. Having clear explanations of WHY each product works for your skin makes all the difference.',
  },
];

export type Faq = {
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    question: 'How does GlowCare know which product is useful for MY skin?',
    answer:
      'GlowCare uses clinically validated dermatological logic. When you take the Skin Quiz or scan your face, our AI assesses your skin barrier integrity, sebum secretion rate, and primary concerns (such as active acne, hyperpigmentation, or open pores). It then matches you with real, dermatologist-tested clinical formulations containing the exact active ingredients proven to solve those issues.',
  },
  {
    question: 'Are these real products like Minimalist, CeraVe, and The Ordinary?',
    answer:
      'Yes! We recommend authentic, globally renowned dermatological brands (Be Minimalist, CeraVe, The Ordinary, La Roche-Posay, Cetaphil, COSRX) with full ingredient breakdowns, scientific mechanisms, and daily routine steps.',
  },
  {
    question: 'How quickly will I see results for acne and dark spots?',
    answer:
      'For active acne and clogged pores, Salicylic Acid (BHA) begins clearing congestion within 7–14 days. For post-acne dark marks and hyperpigmentation, Vitamin C and Niacinamide typically show visible fading and even tone in 3–4 weeks of consistent daily SPF usage.',
  },
  {
    question: 'Can I use multiple active products together in my routine?',
    answer:
      'Yes, but in the correct order! Our diagnostic results provide an exact step-by-step Morning (AM) and Night (PM) schedule so you never mix conflicting actives (like applying BHA and Vitamin C at the wrong time), ensuring zero irritation.',
  },
  {
    question: 'What if my skin is very sensitive or stings easily?',
    answer:
      'If our quiz or scanner detects a compromised, sensitive barrier, we immediately prioritize gentle, fragrance-free barrier rebuilders (such as CeraVe Ceramides, Centella Asiatica, and Cetaphil) before introducing any strong exfoliating acids.',
  },
];
