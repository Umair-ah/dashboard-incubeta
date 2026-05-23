import React, { useState, useEffect, useRef } from 'react';
import incubetaLogo from './assets/Incubeta-Logo-White.svg';
import { 
  BarChart3, 
  TrendingUp, 
  AlertCircle, 
  Target, 
  Zap, 
  X, 
  ChevronRight, 
  PieChart, 
  DollarSign, 
  Activity, 
  Layers,
  ArrowRight,
  Play,
  Pause,
  Info,
  MessageSquare,
  Sparkles,
  Send,
  Loader2,
  Search,
  Globe,
  Map,
  Filter,
  Radio,
  Wifi,
  Users,
  Megaphone,
  Maximize,
  Compass,
  Cpu 
} from 'lucide-react';

// --- CUSTOM HOOKS & UTILS ---

const useAnimatedCounter = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const totalFrames = Math.round(duration / 16);
    const step = end / totalFrames;
    let currentFrame = 0;
    
    const timer = setInterval(() => {
      currentFrame++;
      start += step;
      if (currentFrame >= totalFrames) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [end, duration]);
  
  return count;
};

// --- COMPONENTS (Defined before use) ---

const QuoteIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.01697 21L5.01697 18C5.01697 16.8954 5.9124 16 7.01697 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.01697C5.46468 8 5.01697 8.44772 5.01697 9V11C5.01697 11.5523 4.56925 12 4.01697 12H3.01697V5H13.017V15C13.017 18.3137 10.3307 21 7.01697 21H5.01697Z" />
    </svg>
);

const KPI = ({ label, value, prefix = "", suffix = "", delay = 0 }) => {
  const numValue = typeof value === 'number' ? value : parseFloat(String(value).replace(/[^0-9.]/g, ''));
  const isNumber = !isNaN(numValue);
  const displayValue = isNumber ? useAnimatedCounter(numValue, 2000) : 0;
  const finalDisplay = isNumber ? (Number.isInteger(numValue) ? displayValue : displayValue.toFixed(1)) : value;

  return (
    <div 
      className="glass-card p-6 rounded-lg flex flex-col justify-between stagger-enter group relative overflow-hidden border-l-4 border-l-purple-600"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2 z-10">{label}</div>
      <div className="text-4xl font-bold text-white z-10">
        {prefix}{finalDisplay}{suffix}
      </div>
    </div>
  );
};

const BrandCard = ({ brand, onClick, index }) => (
  <button 
    onClick={() => onClick(brand)}
    className={`glass-card p-6 rounded-lg text-left flex flex-col h-full stagger-enter group relative overflow-hidden ${brand.accent ? 'hover:border-opacity-50' : ''}`}
    style={{ animationDelay: `${index * 100}ms` }}
  >
    {/* Pulse for Riyadh Air */}
    {brand.isPulse && (
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
        </span>
        <span className="text-[10px] uppercase font-bold text-purple-300 tracking-wider">Live</span>
      </div>
    )}

    <div className="flex justify-between items-start mb-6 w-full z-10 relative">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-lg bg-[#2a2a2a] border border-white/10 flex items-center justify-center font-bold text-lg shadow-lg text-white`}>
          {brand.logo}
        </div>
        <div>
          <h3 className="font-bold text-white text-lg group-hover:text-purple-400 transition-colors">{brand.name}</h3>
          <span className="text-xs font-medium uppercase tracking-wide text-gray-400">{brand.role}</span>
        </div>
      </div>
    </div>

    <div className="space-y-5 mb-6 flex-1 z-10 relative">
      <div>
        <div className="text-xs text-gray-500 uppercase font-bold mb-1">Monthly Burn</div>
        <div className="font-bold text-white text-xl">{brand.spend}</div>
        <div className="w-full bg-[#2a2a2a] h-1 rounded-full overflow-hidden mt-2">
            <div 
              className={`h-full ${brand.name === 'Almosafer' ? 'bg-purple-500' : 'bg-orange-500'} rounded-full transition-all duration-1000 ease-out`} 
              style={{ width: `${(brand.spendVal / 4.2) * 100}%` }}
            ></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-2">
         <div className="group/tooltip relative">
            <div className="text-[10px] text-gray-500 uppercase font-bold">Key Weakness</div>
            <div className="text-xs font-semibold text-gray-300 truncate w-fit">{brand.weakness}</div>
         </div>
      </div>
    </div>

    <div className="pt-4 border-t border-white/5 mt-auto w-full flex items-center justify-between text-gray-500 group-hover:text-white transition-colors z-10 relative">
      <span className="text-xs font-bold uppercase tracking-wider">Access Intel</span>
      <div className="p-1 rounded-full border border-white/10 group-hover:border-purple-500 transition-colors">
        <ArrowRight size={14} className="transform group-hover:translate-x-0.5 transition-transform text-purple-500" />
      </div>
    </div>
  </button>
);

// --- DATA ---

const brands = [
  {
    id: 'almosafer',
    name: 'Almosafer',
    role: 'The Market Leader',
    accent: 'border-purple-500', 
    glow: 'shadow-purple-900/20',
    logo: 'AL',
    maturity: 'Advanced',
    spend: '$4.2M',
    spendVal: 4.2,
    adType: 'Video (Lifestyle)',
    weakness: 'Market Saturation',
    weaknessTooltip: 'Impact: Declining returns due to high penetration. Fix: Shift focus to Hotels.',
    share: '61% Air GBV',
    positioning: "Owns 61% of air traffic. Dominates via sophisticated full-funnel targeting and omni-channel presence, but faces fatigue risk from market saturation.",
    creatives: [
      { type: 'Video', content: 'Lifestyle travel content (family vacations, relaxation).', angle: 'Emotional Storytelling' },
      { type: 'Carousel', content: 'Flight + Hotel + Activities bundle breakdown.', angle: 'Multi-Product Convenience' },
      { type: 'Static', content: 'Earn Qitaf points on every booking.', angle: 'Loyalty Integration' }
    ],
    funnel: { awareness: 30, consideration: 30, conversion: 40 },
    formula: "35% Lifestyle + 30% Multi-Product + 20% Convenience + 15% CTA",
    seasonal: "Massive spikes for Hajj (+$1M/mo) & Summer (+$700K/mo).",
    weaknesses: [
      { title: 'Market Saturation Risk', impact: 'Declining returns', fix: 'Shift 20% budget to Hotels (larger TAM)' },
      { title: 'Creative Fatigue (Lifestyle)', impact: 'Lower ROAS', fix: 'Monthly creative overhauls & new angles' },
      { title: 'Omni-Channel Complexity', impact: 'Inconsistent CX', fix: 'Unify messaging across web/app/retail/WhatsApp' }
    ],
    opportunities: [
      { title: 'Experiential Keywords', why: 'Underserved niche', attack: 'Bid on "Things to do in Jeddah" & packages' },
      { title: 'Seasonal Intent', why: 'High intent, low competition early', attack: 'Bid 6-8 weeks out for Ramadan/Eid' }
    ],
    scores: { creative: 8, offer: 7, scaling: 9, funnel: 9 },
    targeting: {
      primary: ["Travel", "Hotels", "Booking", "Lifestyle"],
      stack: "Tiered by value (High-value leisure, Business, Budget)",
      warmStrategy: "Heavy use of custom audiences (200K visitors, 150K app users)",
      logic: "Conversion on warm; Awareness on broad/lookalike",
      size: "2.5M+ Addressable"
    },
    campaigns: [
        { name: "Lifestyle Package Awareness", alloc: 30, focus: "Awareness" },
        { name: "Flight + Hotel Bundle", alloc: 35, focus: "Conversion" },
        { name: "Loyalty Integration", alloc: 20, focus: "Retention" },
        { name: "Warm Retargeting", alloc: 15, focus: "Conversion" }
    ]
  },
  {
    id: 'saudia',
    name: 'Saudia',
    role: 'The National Carrier',
    accent: 'border-orange-500', // Orange for growth/incumbent challenge
    glow: 'shadow-orange-900/20',
    logo: 'SA',
    maturity: 'Advanced',
    spend: '$3.5M',
    spendVal: 3.5,
    adType: 'Video/Carousel',
    weakness: 'Budget Abandonment',
    weaknessTooltip: 'Impact: Losing $200k/mo to Flynas on "cheap" keywords. Fix: Sub-brand strategy.',
    share: 'Dominant Brand',
    positioning: "Premium authority. They own 'trust' and brand heritage, but are ceding the budget fight to Flynas. 500+ active ad variants suggest heavy testing.",
    creatives: [
      { type: 'Video', content: 'Cinematic shots of destinations (London/Bangkok).', angle: 'Destination Aspiration' },
      { type: 'Carousel', content: 'Installment plans: Pay in 3 easy steps.', angle: 'Affordability (Premium)' },
      { type: 'Static', content: 'National Carrier since 1945.', angle: 'Trust/Heritage' }
    ],
    funnel: { awareness: 25, consideration: 35, conversion: 40 },
    formula: "40% Emotional Hook + 30% Product + 20% CTA + 10% Proof",
    seasonal: "Hajj is their Super Bowl (+300% volume); Eid (+150%).",
    weaknesses: [
      { title: 'Budget Keyword Abandonment', impact: '-$200K/mo potential', fix: 'Launch "Budget Flight" sub-brand strategy' },
      { title: 'Retargeting Under-Investment', impact: 'High CAC', fix: 'Reduce creative count (500->250), focus on warm' },
      { title: 'Offer Flexibility', impact: 'Lower off-peak ROAS', fix: 'Push "Smart Booking" installments heavily' }
    ],
    opportunities: [
      { title: 'Budget Segment Entry', why: 'Flynas owns this uncontested', attack: 'Target "cheap flights" with economy offers' },
      { title: 'Cross-Border Traffic', why: 'Expat travel surging', attack: 'Target diaspora communities (Pakistan, India)' }
    ],
    scores: { creative: 7, offer: 6, scaling: 6, funnel: 7 },
    targeting: {
      primary: ["Travel", "Airlines", "Middle East", "Business Travel"],
      stack: "Business travelers + Luxury convenience seekers",
      warmStrategy: "Balanced (50% Brand/Interest + 50% Lookalike/Warm)",
      logic: "Segment by traveler type (Business/Leisure/Hajj) then broad expansion",
      size: "2M+ Addressable"
    },
    campaigns: [
        { name: "Brand Awareness (Video)", alloc: 25, focus: "Reach" },
        { name: "Consideration (Routes)", alloc: 35, focus: "Traffic" },
        { name: "Conversion (Premium)", alloc: 25, focus: "Sales" },
        { name: "Retargeting", alloc: 15, focus: "Sales" }
    ]
  },
  {
    id: 'flynas',
    name: 'Flynas',
    role: 'The Aggressor',
    accent: 'border-orange-500',
    glow: 'shadow-orange-900/20',
    logo: 'FN',
    maturity: 'Advanced',
    spend: '$2.8M',
    spendVal: 2.8,
    adType: 'Static (Price)',
    weakness: 'Creative Fatigue',
    weaknessTooltip: 'Impact: Rising CPMs due to price-only ads. Fix: Narrative angles.',
    share: 'LCC Leader',
    positioning: "Volume challenger. Price fatigue is real—audiences are trained to wait for discounts. Aggressive broad targeting with 400+ keywords.",
    creatives: [
      { type: 'Video', content: 'Rapid cuts of destinations. 5-10 seconds.', angle: 'Volume/Traffic' },
      { type: 'Static', content: 'Huge "SAR 199" text with flashing colors.', angle: 'Deep Discount' },
      { type: 'Static', content: '48 Hour Flash Sale Countdown.', angle: 'Urgency' }
    ],
    funnel: { awareness: 20, consideration: 40, conversion: 40 },
    formula: "50% Price + 30% Urgency + 15% Destination + 5% CTA",
    seasonal: "Consistent spend driven by utilization, not just seasons.",
    weaknesses: [
      { title: 'Creative Fatigue Crisis', impact: 'Rising CPMs', fix: 'Introduce narrative/family angles (30% of mix)' },
      { title: 'Conversion Neglect', impact: 'Leaky bucket', fix: 'A/B Test Landing Pages & Checkout Flow' },
      { title: 'Premium Perception', impact: 'Low margins', fix: 'Soft launch business tier marketing' }
    ],
    opportunities: [
      { title: 'Narrative Creative', why: 'Audience is numb to price', attack: 'Tell a story to reduce fatigue' },
      { title: 'Loyalty Path', why: 'No retention hook', attack: 'Launch "Budget + Rewards" program' }
    ],
    scores: { creative: 6, offer: 9, scaling: 7, funnel: 5 },
    targeting: {
      primary: ["Budget travel", "Cheap flights", "Deals", "Adventure"],
      stack: "Price-conscious demographics (Students, Young Families)",
      warmStrategy: "Aggressive Broad (80%) + Warm (20%)",
      logic: "Volume strategy; let algorithm find winners via CBO",
      size: "3M+ Addressable (Max Volume)"
    },
    campaigns: [
        { name: "Flash Sale (Traffic)", alloc: 40, focus: "Volume" },
        { name: "Route Expansion", alloc: 25, focus: "Awareness" },
        { name: "Competitor Comparison", alloc: 20, focus: "Conversion" },
        { name: "Retargeting", alloc: 15, focus: "Conversion" }
    ]
  },
  {
    id: 'flyadeal',
    name: 'Flyadeal',
    role: 'The Budget Wing',
    accent: 'border-purple-500',
    glow: 'shadow-purple-900/20',
    logo: 'FA',
    maturity: 'Intermediate',
    spend: '$1.0M',
    spendVal: 1.0,
    adType: 'Static',
    weakness: 'Identity Crisis',
    weaknessTooltip: 'Impact: Overshadowed by Saudia. Fix: Distinct "Budget Reimagined" brand.',
    share: 'Growing LCC',
    positioning: "Stuck in Saudia's shadow. Needs to stop being the 'little sister' and own the budget niche with unique benefits (Ladies Seats).",
    creatives: [
      { type: 'Static', content: 'Riyadh to Jeddah. Low Price.', angle: 'Domestic Commuter' },
      { type: 'Static', content: 'Ladies Only Seating highlight.', angle: 'Unique Benefit' },
      { type: 'Video', content: 'New route announcement: Pakistan.', angle: 'Expansion' }
    ],
    funnel: { awareness: 10, consideration: 30, conversion: 60 },
    formula: "50% Price + 30% Urgency + 15% Route + 5% CTA",
    seasonal: "Domestic driven. Less seasonal spikes than int'l carriers.",
    weaknesses: [
      { title: 'Overshadowed by Saudia', impact: 'Cannibalization', fix: 'Explicit "Reimagined Budget" positioning' },
      { title: 'Scale Limitations', impact: 'Capped reach', fix: 'Focus on high-ROI route density' },
      { title: 'Brand Awareness Gap', impact: 'High CAC', fix: 'Heavy retargeting & WhatsApp booking' }
    ],
    opportunities: [
      { title: 'Domestic Dominance', why: 'Secondary cities underserved', attack: 'Own Jizan/Tabuk/Abha keywords' },
      { title: 'WhatsApp Booking', why: 'Low data usage users', attack: 'Frictionless booking channel' }
    ],
    scores: { creative: 4, offer: 7, scaling: 4, funnel: 6 },
    targeting: {
      primary: ["Budget airlines", "Domestic travel", "Family trips"],
      stack: "Geographic (Domestic) + Life Stage (Family)",
      warmStrategy: "60% Interest Target + 40% Lookalike",
      logic: "Narrower targeting due to limited fleet/routes",
      size: "1.5M Addressable"
    },
    campaigns: [
        { name: "Domestic Deals", alloc: 50, focus: "Traffic" },
        { name: "New Route Launch", alloc: 20, focus: "Awareness" },
        { name: "Loyalty/Repeat", alloc: 20, focus: "Retention" },
        { name: "Retargeting", alloc: 10, focus: "Conversion" }
    ]
  },
  {
    id: 'almatar',
    name: 'Almatar',
    role: 'The Challenger',
    accent: 'border-orange-500',
    glow: 'shadow-orange-900/20',
    logo: 'AM',
    maturity: 'Intermediate',
    spend: '$1.3M',
    spendVal: 1.3,
    adType: 'Video/Static',
    weakness: 'Late Entry',
    weaknessTooltip: 'Impact: High CAC chasing Almosafer. Fix: Find whitespace.',
    share: '16.8% Air GBV',
    positioning: "Fighting a war of attrition against Almosafer. Needs to flank, not attack head-on. Aggressive scaling phase.",
    creatives: [
      { type: 'Video', content: 'Implicit Price Comparison.', angle: 'Direct Attack' },
      { type: 'Static', content: 'Book in minutes. Speed focus.', angle: 'Convenience' },
      { type: 'Video', content: 'Flash deals on app.', angle: 'Acquisition' }
    ],
    funnel: { awareness: 35, consideration: 30, conversion: 35 },
    formula: "50% Lookalike + 50% Broad Testing",
    seasonal: "Aggressive growth phase. Front-loaded.",
    weaknesses: [
      { title: 'Head-to-Head War', impact: 'High CAC', fix: 'Find white space (Business/Regional)' },
      { title: 'Trust Gap', impact: 'Lower conversion', fix: 'Launch massive testimonial campaign' },
      { title: 'Lookalike Dependency', impact: 'Audience overlap', fix: 'Expand to broad audiences' }
    ],
    opportunities: [
      { title: 'Testimonial Offensive', why: 'Trust is their barrier', attack: 'Social proof is the new currency' },
      { title: 'Regional Partnerships', why: 'Differentiation', attack: 'Integrated travel platform positioning' }
    ],
    scores: { creative: 4, offer: 5, scaling: 5, funnel: 4 },
    targeting: {
      primary: ["Travel", "Budget airlines", "Booking"],
      stack: "Heavy Lookalike reliance (1-5% of Almosafer base)",
      warmStrategy: "Developing warm pools; heavy acquisition focus",
      logic: "Narrow Lookalike + Broad Testing (Growth Mode)",
      size: "50K Warm + 1.5M Lookalike"
    },
    campaigns: [
        { name: "Awareness Blitz", alloc: 35, focus: "Reach" },
        { name: "Competitive Displacing", alloc: 30, focus: "Conversion" },
        { name: "Flash Deals", alloc: 20, focus: "Traffic" },
        { name: "Retargeting", alloc: 15, focus: "Conversion" }
    ]
  },
  {
    id: 'riyadhair',
    name: 'Riyadh Air',
    role: 'The Future',
    accent: 'border-purple-500',
    glow: 'shadow-purple-900/20',
    logo: 'RA',
    maturity: 'Pre-Launch',
    spend: 'High Velocity',
    spendVal: 2.0,
    adType: 'Premium Video',
    weakness: 'Inefficient Spend',
    weaknessTooltip: 'Impact: Zero conversion (Pre-launch). Fix: Build waitlist.',
    share: '0% (Launch 2025)',
    positioning: "Burning cash on awareness before they have a product. Needs to build a list, not just a brand. Premium-only positioning is risky.",
    creatives: [
      { type: 'Video', content: 'Ultra-luxury visual of cabin concepts.', angle: 'Future Tease' },
      { type: 'Video', content: 'Global connectivity map.', angle: 'Network Power' },
      { type: 'Static', content: 'Hiring/Crew announcements.', angle: 'Brand Building' }
    ],
    funnel: { awareness: 90, consideration: 10, conversion: 0 },
    formula: "100% Brand Awareness (Pre-launch)",
    seasonal: "Ramping up to 2025 launch.",
    weaknesses: [
      { title: 'Pre-Launch Waste', impact: 'Zero conversion', fix: 'Shift to Waitlist/Email Capture' },
      { title: 'Pure Luxury Trap', impact: 'Small TAM', fix: 'Soft-launch "Affordable Luxury" tier' },
      { title: 'No Network Effect', impact: 'Cold start', fix: 'Partner with OTAs immediately' }
    ],
    opportunities: [
      { title: 'Waitlist Army', why: 'Demand capture', attack: 'Build a 100K qualified email list now' },
      { title: 'OTA Alliances', why: 'Instant visibility', attack: 'Exclusive launch deals with Almosafer' }
    ],
    scores: { creative: 8, offer: 4, scaling: 3, funnel: 3 },
    isPulse: true, // Special visual for Riyadh Air
    targeting: {
        primary: ["Luxury Travel", "Business", "Aviation"],
        stack: "Premium Affinity (High Net Worth, Frequent Flyers)",
        warmStrategy: "Building lists from scratch (Waitlist focus)",
        logic: "Pure Awareness + Interest Building",
        size: "Small but High Value"
    },
    campaigns: [
        { name: "Brand Building", alloc: 70, focus: "Awareness" },
        { name: "Waitlist Capture", alloc: 30, focus: "Lead Gen" }
    ]
  },
  {
    id: 'flyin',
    name: 'Flyin',
    role: 'The Niche',
    accent: 'border-white/20', // Neutral
    glow: 'shadow-white/5',
    logo: 'FL',
    maturity: 'Beginner',
    spend: '$350K',
    spendVal: 0.35,
    adType: 'Static/Generic',
    weakness: 'Invisible',
    weaknessTooltip: 'Impact: 12x spend disadvantage vs Almosafer. Fix: Niche down.',
    share: '6.8% Air GBV',
    positioning: "Drowning in the noise. 12x spend disadvantage vs Almosafer. Must out-niche them to survive.",
    creatives: [
      { type: 'Static', content: 'Generic travel inspiration.', angle: 'Discovery' },
      { type: 'Static', content: 'App download prompt.', angle: 'Utility' },
      { type: 'Static', content: 'Cleartrip partnership branding.', angle: 'Validation' }
    ],
    funnel: { awareness: 40, consideration: 40, conversion: 20 },
    formula: "80% Interest Target + 20% Broad",
    seasonal: "Minimal spikes. Budget constrained.",
    weaknesses: [
      { title: 'Visibility Crisis', impact: '12x spend disadvantage', fix: 'Pivot to Regional/GCC niche' },
      { title: 'Brand Recall Gap', impact: 'Fallback option', fix: 'Aggressive content marketing (SEO)' },
      { title: 'Geographic Confusion', impact: 'Diluted message', fix: 'Saudi-first or GCC-first, pick one' }
    ],
    opportunities: [
      { title: 'Niche Down', why: 'Cannot win broad', attack: 'Own "Regional GCC Travel" or "Budget"' },
      { title: 'Content Blitz', why: 'Paid is too expensive', attack: 'Win on organic "Travel Tips"' }
    ],
    scores: { creative: 2, offer: 3, scaling: 2, funnel: 2 },
    targeting: {
      primary: ["Travel", "Flight booking"],
      stack: "Generic Interest + Geographic (GCC)",
      warmStrategy: "Minimal warm pools; heavily reliant on partnership traffic",
      logic: "Geographic focus to compensate for low budget",
      size: "500K Addressable"
    },
    campaigns: [
        { name: "App Install", alloc: 40, focus: "Acquisition" },
        { name: "Regional Awareness", alloc: 30, focus: "Reach" },
        { name: "Conversion Push", alloc: 20, focus: "Sales" },
        { name: "Retargeting", alloc: 10, focus: "Conversion" }
    ]
  }
];

const seoStrategies = [
  { 
    id: 'saudia', 
    name: 'Saudia', 
    topKeywords: ["Saudia flights", "Saudi Airlines", "national carrier"], 
    strategy: "Brand Defense + Premium Routes", 
    spend: "High", 
    weakness: "Cedes 'cheap flights' keywords to Flynas" 
  },
  { 
    id: 'flynas', 
    name: 'Flynas', 
    topKeywords: ["Cheapest flights Saudi", "budget airline", "low cost KSA"], 
    strategy: "Volume & Price Intent Capture", 
    spend: "High", 
    weakness: "Weak on premium/full-service terms" 
  },
  { 
    id: 'almosafer', 
    name: 'Almosafer', 
    topKeywords: ["Book flights", "flight hotel deals", "travel booking app"], 
    strategy: "Intercept Cross-Search & Convenience", 
    spend: "Very High", 
    weakness: "High CPC due to broad bidding" 
  },
  { 
    id: 'flyadeal', 
    name: 'Flyadeal', 
    topKeywords: ["Flyadeal flights", "domestic flights Saudi"], 
    strategy: "Domestic & Niche Route Focus", 
    spend: "Medium", 
    weakness: "Overshadowed by Flynas on budget terms" 
  },
  { 
    id: 'almatar', 
    name: 'Almatar', 
    topKeywords: ["Almatar flights", "compare flight prices"], 
    strategy: "Challenger Interception", 
    spend: "Med-High", 
    weakness: "Expensive acquisition costs" 
  },
  { 
    id: 'flyin', 
    name: 'Flyin', 
    topKeywords: ["Flyin flights", "travel deals"], 
    strategy: "Regional Positioning", 
    spend: "Low-Med", 
    weakness: "Low brand intent volume" 
  }
];

const seoGaps = [
  { title: "Experiential", desc: "Things to do in Jeddah, Adventure packages", owner: "None (Organic)" },
  { title: "Seasonal Intent", desc: "Ramadan travel deals, Eid flight offers", owner: "Blogs (Organic)" },
  { title: "Cross-Border", desc: "Saudi to Pakistan, India, Bangladesh", owner: "Foreign Carriers" },
  { title: "Long-Tail Routes", desc: "Jizan to Dubai, Abha to Egypt", owner: "Mixed" },
  { title: "Voice Search", desc: "Conversational queries ('Show me flights...')", owner: "Google Snippets" }
];

const playbook = [
  // SAUDIA
  { action: "Attack 'Cheap Flights' with a fighter brand.", brand: "Saudia", impact: "+$150K/mo", time: "90 Days", type: "start", full: "Launch budget-focused keyword bidding via sub-brand to capture Flynas leakage." },
  { action: "Slash creative count. Retarget warm leads.", brand: "Saudia", impact: "+30% ROAS", time: "60 Days", type: "start", full: "Reduce 500+ variants to 250 high-performers. Double down on warm audiences." },
  { action: "Stop running 500+ ad variants simultaneously.", brand: "Saudia", impact: "Efficiency", time: "Now", type: "stop", full: "Creative exhaustion signals. Focus budget on top 20% winners." },
  { action: "Stop Competing on Cheapest Flights.", brand: "Saudia", impact: "Margin", time: "Now", type: "stop", full: "You will always lose to Flynas. Reposition as 'Best Value' (Quality+Price)." },
  
  // FLYNAS
  { action: "Introduce 'Family Story' angles.", brand: "Flynas", impact: "Reduce Fatigue", time: "60 Days", type: "start", full: "Reduce price-only ads from 70% to 50%. Introduce 30% narrative creative." },
  { action: "A/B Test Landing Pages.", brand: "Flynas", impact: "+20% Conv.", time: "90 Days", type: "start", full: "Fix the leaky bucket. High traffic needs better conversion optimization." },
  { action: "Stop price-only creative strategy.", brand: "Flynas", impact: "Save Brand", time: "Now", type: "stop", full: "Audience is desensitized. Price-only ads wearing out in 1-2 weeks." },
  { action: "Stop Ignoring Retargeting.", brand: "Flynas", impact: "+25% ROAS", time: "Now", type: "stop", full: "Build warm audience pools. Retarget traffic that didn't convert." },
  
  // FLYADEAL
  { action: "Explicit 'Budget Reimagined' Positioning.", brand: "Flyadeal", impact: "-20% CAC", time: "90 Days", type: "start", full: "Stop relying on Saudia halo. Promote unique benefits like Ladies Seats/USB." },
  { action: "Route-Specific Paid Media.", brand: "Flyadeal", impact: "High ROI", time: "60 Days", type: "start", full: "Highlight new routes (e.g., Riyadh-Lahore) specifically." },
  { action: "Stop Positioning as Generic Budget.", brand: "Flyadeal", impact: "Margin", time: "Now", type: "stop", full: "Generic budget is a race to the bottom. Differentiate on amenities." },
  
  // ALMOSAFER
  { action: "Shift 20% budget to Hotels.", brand: "Almosafer", impact: "+10% Growth", time: "90 Days", type: "start", full: "Air market is saturated. Hotels market is $11B vs OTA $2.3B." },
  { action: "Loyalty Deepening (Qitaf).", brand: "Almosafer", impact: "+25% Repeat", time: "6 Mos", type: "start", full: "Make 'Earn While You Book' the hero message." },
  { action: "Stop aggressive discounting in awareness.", brand: "Almosafer", impact: "Margin", time: "Now", type: "stop", full: "Training audience to wait for deals. Reduce discount intensity by 50%." },
  
  // ALMATAR
  { action: "Differentiation from Almosafer.", brand: "Almatar", impact: "-30% CAC", time: "90 Days", type: "start", full: "Find white space: Business, Regional, or Speed. Stop head-to-head." },
  { action: "Launch Testimonial Campaign.", brand: "Almatar", impact: "+15% Conv.", time: "60 Days", type: "start", full: "Build trust gap vs Almosafer's 10-year equity." },
  { action: "Stop Generic Competitor Comparisons.", brand: "Almatar", impact: "Brand", time: "Now", type: "stop", full: "Negative positioning doesn't work. Focus on positive differentiation." },

  // RIYADH AIR
  { action: "Build the Waitlist Army.", brand: "Riyadh Air", impact: "100K Leads", time: "3 Months", type: "start", full: "Shift budget from pure awareness to email capture pre-launch." },
  { action: "OTA Partnership Deals.", brand: "Riyadh Air", impact: "Scale", time: "6 Mos", type: "start", full: "Negotiate exclusive launch promotions with Almosafer/Almatar." },
  { action: "Stop Pure Luxury Positioning.", brand: "Riyadh Air", impact: "TAM x3", time: "Post-Launch", type: "stop", full: "Market is budget-conscious. Introduce 'Premium Economy' tier." },
  
  // FLYIN
  { action: "Niche Positioning Pivot.", brand: "Flyin", impact: "-40% CAC", time: "90 Days", type: "start", full: "Stop competing head-to-head with Almosafer. Own Regional/GCC niche." },
  { action: "Content Marketing Blitz.", brand: "Flyin", impact: "-20% Cost", time: "6 Mos", type: "start", full: "Build SEO presence on 'travel tips' to reduce paid reliance." },
  { action: "Stop Generic 'Travel Booking' Ads.", brand: "Flyin", impact: "Conversion", time: "Now", type: "stop", full: "Too broad. Niche down to specific traveler segments." },

  // MONEY
  { action: "Hajj travelers are planning NOW.", brand: "Opportunity", impact: "High Intent", time: "Seasonal", type: "money", full: "Hajj travelers are planning NOW (May peak)." },
  { action: "Ramadan deals (6-8 weeks out).", brand: "Opportunity", impact: "4x ROAS", time: "Seasonal", type: "money", full: "Ramadan travel deals (6-8 weeks out)." },
  { action: "Cross-Border/Expat Traffic.", brand: "Opportunity", impact: "+30% Vol", time: "Emerging", type: "money", full: "Surge in Pakistan/India/Egypt flight searches." },
  { action: "Long-Tail Route Keywords.", brand: "Opportunity", impact: "Low Comp", time: "Niche", type: "money", full: "Jizan/Tabuk/Abha routes have low competition." }
];

const searchData = [
  // TIER 1: Brand
  { term: "book flights Saudi Arabia", vol: "12K", rank: ["Saudia", "Flynas", "Flyadeal"] },
  { term: "cheapest flights KSA", vol: "8K", rank: ["Flynas", "Flyadeal", "Almatar"] },
  { term: "flight booking Saudi", vol: "6K", rank: ["Saudia", "Flynas", "Almosafer"] },
  // TIER 2: Product
  { term: "Riyadh to Cairo flights", vol: "High", rank: ["Flynas", "Saudia", "Almosafer"] },
  { term: "Hajj flights Saudi", vol: "Seasonal", rank: ["Saudia", "Almosafer", "-"] },
  { term: "family travel deals KSA", vol: "Med", rank: ["Almosafer", "Saudia", "-"] },
  // TIER 3: Category
  { term: "flights", vol: "150K", rank: ["Google", "Skyscanner", "Wego"] },
  { term: "visit Saudi Arabia", vol: "40K", rank: ["Tourism Auth", "Saudia", "-"] },
];

const ComparativeChart = ({ activeMetric, setActiveMetric }) => {
  const metrics = [
    { key: 'creative', label: 'Creative Juice' },
    { key: 'offer', label: 'Deal Appeal' },
    { key: 'scaling', label: 'Scale Power' },
    { key: 'funnel', label: 'Funnel Depth' }
  ];

  const sortedBrands = [...brands].sort((a, b) => b.scores[activeMetric] - a.scores[activeMetric]);

  return (
    <div className="glass-panel p-8 rounded-lg stagger-enter">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Stack Rank Them</h2>
          <p className="text-gray-400 text-sm">Who's winning the battle for attention?</p>
        </div>
        <div className="flex bg-[#2a2a2a] p-1 rounded-md border border-white/5">
          {metrics.map(m => (
            <button 
              key={m.key}
              onClick={() => setActiveMetric(m.key)}
              className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all ${activeMetric === m.key ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {sortedBrands.map((b, idx) => (
          <div key={b.id} className="group flex items-center gap-4 stagger-enter" style={{ animationDelay: `${idx * 50}ms` }}>
            <div className="w-6 font-bold text-gray-600 text-sm">#{idx + 1}</div>
            <div className="w-24 md:w-32 font-bold text-gray-300 text-sm">{b.name}</div>
            <div className="flex-1 h-10 bg-[#2a2a2a] rounded overflow-hidden flex items-center relative border border-white/5">
              <div 
                className={`h-full ${b.name === 'Almosafer' ? 'bg-purple-600' : 'bg-orange-500'} transition-all duration-1000 ease-out flex items-center justify-end px-3 opacity-90 group-hover:opacity-100 relative overflow-hidden`} 
                style={{ width: `${b.scores[activeMetric] * 10}%` }}
              >
                 <span className="text-white text-xs font-bold">{b.scores[activeMetric]}/10</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- STYLES & ANIMATIONS ---

const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap');
    
    :root {
      --bg-dark: #1a1a1a;
      --incubeta-purple: #7c3aed;
      --incubeta-orange: #ff9500;
      --glass-border: rgba(255, 255, 255, 0.08);
      --glass-bg: rgba(30, 30, 30, 0.6);
    }

    body {
      background-color: var(--bg-dark);
      color: #ffffff;
      font-family: 'Montserrat', sans-serif;
      overflow-x: hidden;
    }

    /* Custom Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #1a1a1a; }
    ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #444; }

    /* Glassmorphism Utilities */
    .glass-panel {
      background: var(--glass-bg);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid var(--glass-border);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    }
    
    .glass-card {
      background: linear-gradient(145deg, rgba(40,40,40,0.4) 0%, rgba(20,20,20,0.6) 100%);
      backdrop-filter: blur(8px);
      border: 1px solid var(--glass-border);
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .glass-card:hover {
      transform: translateY(-4px);
      border-color: rgba(124, 58, 237, 0.3); /* Purple hint on hover */
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }

    /* Incubeta Glows */
    .hero-glow {
      background: radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.15), transparent 60%);
      animation: pulse-slow 8s ease-in-out infinite;
    }

    /* Animations */
    @keyframes pulse-slow {
      0%, 100% { opacity: 0.6; transform: scale(1); }
      50% { opacity: 0.9; transform: scale(1.1); }
    }

    @keyframes scan {
      0% { transform: translateX(-100%); opacity: 0; }
      50% { opacity: 1; }
      100% { transform: translateX(100%); opacity: 0; }
    }
    .animate-scan {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.2), transparent);
      animation: scan 3s infinite linear;
      pointer-events: none;
    }

    @keyframes slide-up-fade {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .stagger-enter {
      opacity: 0;
      animation: slide-up-fade 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
    }

    /* Typing Dots */
    .typing-dot {
      animation: typing 1.4s infinite ease-in-out both;
    }
    .typing-dot:nth-child(1) { animation-delay: -0.32s; }
    .typing-dot:nth-child(2) { animation-delay: -0.16s; }
    @keyframes typing {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }
  `}</style>
);

// --- MAIN DASHBOARD ---

const Dashboard = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [playbookFilter, setPlaybookFilter] = useState('start');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
     { role: 'system', text: "I've analyzed the entire market. Ready for your command." }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeCompareMetric, setActiveCompareMetric] = useState('creative');
  const [generatingConcepts, setGeneratingConcepts] = useState(false);
  const [generatedConcepts, setGeneratedConcepts] = useState(null);
  
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  const handleChatSubmit = async (e) => {
    e?.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatInput("");
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    setTimeout(() => {
        setIsTyping(false);
        let reply = "Processing market data... Recommendation: Check the 'Deep Dive' view.";
        if (userMsg.toLowerCase().includes("flynas")) reply = "Flynas is over-indexed on price. Pivot to narrative storytelling to capture their fatigued audience.";
        if (userMsg.toLowerCase().includes("saudia")) reply = "Saudia is ignoring high-volume budget keywords. Launch a fighter brand campaign immediately.";
        setChatMessages(prev => [...prev, { role: 'ai', text: reply }]);
    }, 1500);
  };

  const handleGenerateConcepts = () => {
    setGeneratingConcepts(true);
    setTimeout(() => {
        setGeneratedConcepts([
            "Headline: 'Memories > Miles' \nVisual: Slow-motion reunion at Jeddah airport. No planes, just raw emotion.",
            "Headline: 'The Weekend You Earned' \nVisual: POV shot from a luxury hotel balcony in Abha. Sound of wind, no music."
        ]);
        setGeneratingConcepts(false);
    }, 2000);
  };

  // Button Ripple Effect Helper
  const ripple = (e) => {
    const btn = e.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - btn.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - btn.getBoundingClientRect().top - radius}px`;
    circle.classList.add("ripple");
    const ripple = btn.getElementsByClassName("ripple")[0];
    if (ripple) { ripple.remove(); }
    btn.appendChild(circle);
  };

  return (
    <div className="min-h-screen relative font-sans text-gray-200 selection:bg-purple-500/30 selection:text-white overflow-x-hidden">
      <Styles />
      
      {/* Background */}
      <div className="fixed inset-0 z-[-1] bg-[#1a1a1a]">
        <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-purple-900/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-orange-900/10 rounded-full blur-[120px] animate-pulse-slow" style={{animationDelay: '4s'}}></div>
      </div>

      {/* --- HERO SECTION --- */}
      <div className="relative w-full pt-16 pb-12 px-6 md:px-12 overflow-hidden border-b border-white/5">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-8">
             {/* Incubeta Logo Proxy */}
             <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter text-white">
                <div className=" "><img src={incubetaLogo} alt="Incubeta Logo" className="w-full h-full object-contain" /></div>
             </div>
          </div>
          
          <div className="stagger-enter" style={{animationDelay: '0ms'}}>
            <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-purple-500"></div>
                <span className="text-purple-400 uppercase tracking-[0.2em] text-xs font-bold">Marketing Intelligence</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
              AI-powered marketing <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400">built for profitable growth.</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl leading-relaxed mb-8">
              See exactly where Flynas is winning, where Saudia is slipping, and where <span className="text-white font-semibold">you can take the lead.</span>
            </p>
          </div>

          {/* <div className="flex flex-wrap gap-6 items-center stagger-enter" style={{animationDelay: '200ms'}}>
             <button 
     
                className="bg-purple-600 text-white px-8 py-4 rounded font-bold hover:bg-purple-500 transition-all flex items-center gap-2 shadow-lg shadow-purple-900/20"
             >
                Initialize Strategic Plan <ArrowRight size={18} />
             </button>
          </div> */}
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <main id="dashboard-content" className="max-w-7xl mx-auto px-4 md:px-12 py-12 space-y-24">
        
        {/* VIEW TOGGLE & KPIS */}
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-white/5 pb-6 stagger-enter">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Market Pulse</h2>
                    <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wider font-semibold">
                        <Activity size={14} className="text-orange-500" /> Live Data • Jan 2026
                    </div>
                </div>
                
                {/* Toggles */}
                <div className="glass-panel p-1 rounded flex gap-1">
                    {[
                        { id: 'grid', icon: Layers, label: 'Grid' },
                        { id: 'compare', icon: BarChart3, label: 'Rankings' },
                        { id: 'search', icon: Search, label: 'Search Intel' }
                    ].map(view => (
                        <button
                            key={view.id}
                            onClick={() => setViewMode(view.id)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wide transition-all ${viewMode === view.id ? 'bg-purple-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            <view.icon size={14} />
                            <span className="hidden md:inline">{view.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* View Render Logic */}
            <div className="min-h-[600px] transition-all duration-500">
                {viewMode === 'grid' && (
                    <div className="space-y-12">
                        {/* High Level Metrics */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <KPI label="Total Market Spend" value={13.1} prefix="$" suffix="M" delay={0} />
                            <KPI label="Brands Tracked" value={7} delay={100} />
                            <KPI label="Active Ad Variants" value={1240} delay={200} />
                            <KPI label="Passenger Growth" value={15} suffix="%" delay={300} />
                        </div>

                        {/* Brand Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {brands.map((brand, idx) => (
                                <BrandCard key={brand.id} brand={brand} index={idx} onClick={setSelectedBrand} />
                            ))}
                        </div>
                    </div>
                )}

                {viewMode === 'compare' && (
                    <ComparativeChart activeMetric={activeCompareMetric} setActiveMetric={setActiveCompareMetric} />
                )}

                {viewMode === 'search' && (
                    <div className="space-y-8 stagger-enter">
                        {/* Scanning Hero */}
                        <div className="glass-panel p-10 rounded-lg relative overflow-hidden group border-l-4 border-l-purple-500">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-transparent opacity-50"></div>
                            <div className="animate-scan"></div>
                            
                            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                        <Globe className="text-purple-400" size={28}/> 
                                        Search Intelligence
                                    </h3>
                                    <p className="text-gray-300 max-w-2xl text-base leading-relaxed">
                                        While Meta builds awareness, Google captures intent. Flynas dominates "Cheap", Saudia owns "Brand", and Almosafer buys "Convenience".
                                    </p>
                                </div>
                                <div className="text-right glass-panel p-6 rounded-lg border-white/5 bg-[#1a1a1a]">
                                    <div className="text-4xl font-bold text-orange-500 mb-1">15%</div>
                                    <div className="text-xs text-gray-500 uppercase font-bold tracking-widest">Voice Search Share</div>
                                </div>
                            </div>
                        </div>

                        {/* SEO Gaps Radar */}
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            {seoGaps.map((gap, i) => (
                                <div key={i} className="glass-panel p-4 rounded-lg border-white/5 hover:bg-white/5 transition-colors group cursor-default">
                                    <div className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-2">Gap #{i+1}</div>
                                    <div className="font-bold text-white text-sm mb-1 group-hover:text-purple-300">{gap.title}</div>
                                    <div className="text-xs text-gray-500">{gap.desc}</div>
                                </div>
                            ))}
                        </div>

                        {/* Competitor Search Matrix */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2"><Compass size={20} className="text-purple-400"/> Competitor Search Strategy</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {seoStrategies.map((s, i) => (
                                    <div key={i} className="glass-card p-6 rounded-lg border-white/5">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="font-bold text-lg text-white">{s.name}</div>
                                            <div className="text-[10px] bg-white/10 px-2 py-1 rounded text-gray-300">Spend: {s.spend}</div>
                                        </div>
                                        <div className="text-xs text-gray-400 mb-2 uppercase font-bold">Primary Strategy</div>
                                        <div className="text-sm text-gray-200 mb-4 font-medium">{s.strategy}</div>
                                        
                                        <div className="text-xs text-gray-400 mb-2 uppercase font-bold">Top Keywords</div>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {s.topKeywords.map((k, j) => (
                                                <span key={j} className="text-[10px] bg-black/40 border border-white/10 px-2 py-1 rounded text-gray-400">{k}</span>
                                            ))}
                                        </div>

                                        <div className="p-3 bg-red-900/10 border border-red-500/20 rounded-lg">
                                            <div className="text-[10px] text-red-400 font-bold uppercase mb-1">Critical Weakness</div>
                                            <div className="text-xs text-red-200/80">{s.weakness}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass-panel rounded-lg overflow-hidden">
                            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                                <h3 className="font-bold text-lg text-white flex items-center gap-2"><Target size={18} className="text-orange-500"/> Keyword Battles</h3>
                                <div className="text-[10px] font-bold uppercase text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-full">High Intent Only</div>
                            </div>
                            <table className="w-full text-left">
                                <thead className="bg-[#2a2a2a] text-gray-500 text-xs uppercase font-bold tracking-wider">
                                    <tr>
                                        <th className="px-8 py-5">Target Keyword</th>
                                        <th className="px-8 py-5">Traffic Potential</th>
                                        <th className="px-8 py-5">Rank 1 (Winner)</th>
                                        <th className="px-8 py-5 text-gray-600">Rank 2</th>
                                        <th className="px-8 py-5 text-gray-600">Rank 3</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {searchData.map((row, i) => (
                                        <tr key={i} className="hover:bg-white/5 transition-colors group">
                                            <td className="px-8 py-5 font-bold text-gray-200 group-hover:text-purple-400 transition-colors">{row.term}</td>
                                            <td className="px-8 py-5 text-gray-500 font-mono text-xs">{row.vol}</td>
                                            <td className="px-8 py-5"><span className="bg-purple-900/30 text-purple-300 border border-purple-500/30 px-3 py-1 rounded font-bold text-xs">{row.rank[0]}</span></td>
                                            <td className="px-8 py-5 text-gray-500 text-sm">{row.rank[1]}</td>
                                            <td className="px-8 py-5 text-gray-600 text-sm">{row.rank[2]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* --- PLAYBOOK SECTION --- */}
        <section className="stagger-enter">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">The Playbook</h2>
                    <p className="text-gray-400 text-sm">High-impact strategic moves to shift market share in Q1.</p>
                </div>
                <div className="glass-panel p-1 rounded-lg flex gap-1">
                    {[
                        { id: 'start', icon: Play, label: 'Start', color: 'text-green-400' },
                        { id: 'stop', icon: Pause, label: 'Stop', color: 'text-red-400' },
                        { id: 'money', icon: DollarSign, label: 'Money', color: 'text-orange-400' }
                    ].map(filter => (
                        <button
                            key={filter.id}
                            onClick={() => setPlaybookFilter(filter.id)}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded text-xs font-bold uppercase tracking-wide transition-all duration-300 ${playbookFilter === filter.id ? 'bg-purple-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            <filter.icon size={14} className={playbookFilter === filter.id ? 'text-white' : filter.color} />
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {playbook.filter(p => p.type === playbookFilter).map((play, idx) => (
                    <div key={idx} className="glass-card p-8 rounded-lg hover:border-purple-500/30 group animate-slide-up-fade" style={{ animationDelay: `${idx * 50}ms` }}>
                        <div className="flex justify-between items-start mb-6">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 border border-gray-800 px-2 py-1 rounded bg-[#2a2a2a]">{play.brand}</span>
                            <span className="text-[10px] font-semibold text-gray-400 bg-white/5 px-2 py-1 rounded">{play.time}</span>
                        </div>
                        <h4 className="font-bold text-white text-lg mb-4 leading-snug group-hover:text-purple-400 transition-colors">{play.action}</h4>
                        <p className="text-sm text-gray-400 mb-6 leading-relaxed pl-4 border-l-2 border-purple-500/50">{play.full}</p>
                        <div className="flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-wider">
                            <TrendingUp size={14} /> {play.impact}
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* --- FOOTER CTA --- */}
        <section className="relative overflow-hidden rounded-lg stagger-enter bg-purple-900/10 border border-purple-500/20">
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full"></div>
             
             <div className="relative z-10 px-8 py-20 text-center">
                <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-8 text-white">
                    You know where they're vulnerable. <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-orange-200">Now build something they can't copy.</span>
                </h2>
                <button className="bg-orange-500 text-black font-bold px-12 py-5 rounded hover:bg-orange-400 transition-all hover:scale-105 shadow-lg shadow-orange-900/40 text-sm uppercase tracking-widest">
                    Launch Campaign Strategy
                </button>
            </div>
        </section>

      </main>

      {/* --- MODAL (DEEP DIVE) --- */}
      {selectedBrand && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl transition-opacity" onClick={() => setSelectedBrand(null)}></div>
            <div className="relative glass-panel bg-[#1a1a1a] w-full max-w-5xl h-full md:h-[90vh] rounded-lg shadow-2xl overflow-hidden flex flex-col animate-modal-enter border-white/10">
                
                {/* Modal Header */}
                <div className={`p-10 border-b border-white/5 flex justify-between items-start relative overflow-hidden`}>
                    <div className={`absolute inset-0 opacity-10 bg-purple-900`}></div>
                    <div className="relative flex items-center gap-8 z-10">
                        <div className={`w-20 h-20 rounded bg-[#2a2a2a] border border-white/10 flex items-center justify-center text-white text-3xl font-bold shadow-2xl`}>
                            {selectedBrand.logo}
                        </div>
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">{selectedBrand.name}</h2>
                            <p className="text-gray-400 font-medium text-lg border-l-2 border-purple-500 pl-4">{selectedBrand.role}</p>
                        </div>
                    </div>
                    <button onClick={() => setSelectedBrand(null)} className="p-3 bg-white/5 hover:bg-white/10 rounded transition text-gray-400 hover:text-white z-10">
                        <X size={24} />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto p-10 md:p-14 space-y-16 custom-scrollbar">
                    {/* Incubeta's View */}
                    <div className="max-w-4xl relative">
                        <QuoteIcon className="absolute -top-6 -left-8 text-white/5 w-24 h-24" />
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-purple-500 mb-4 flex items-center gap-2"><div className="w-8 h-px bg-purple-500"></div> Incubeta Intelligence</h3>
                        <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-light">
                            "{selectedBrand.positioning}"
                        </p>
                    </div>

                    {/* Audience Intelligence */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 stagger-enter" style={{animationDelay: '100ms'}}>
                        <div className="glass-panel p-8 rounded-lg border-white/5">
                            <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3"><Users className="text-purple-400" size={20}/> Audience Strategy</h4>
                            <div className="space-y-6">
                                <div>
                                    <div className="text-xs uppercase font-bold text-gray-500 mb-2">Primary Interests</div>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedBrand.targeting?.primary.map((tag, i) => (
                                            <span key={i} className="text-xs font-semibold text-gray-300 bg-white/5 border border-white/10 px-3 py-1 rounded">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-4 bg-white/5 rounded border border-white/5">
                                    <div className="text-xs uppercase font-bold text-gray-500 mb-1">Targeting Logic</div>
                                    <p className="text-sm text-gray-300 leading-relaxed">{selectedBrand.targeting?.logic}</p>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Addressable Size</span>
                                    <span className="text-white font-mono font-bold">{selectedBrand.targeting?.size}</span>
                                </div>
                            </div>
                        </div>

                        {/* Campaign Mix */}
                        <div className="glass-panel p-8 rounded-lg border-white/5">
                            <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3"><Megaphone className="text-orange-400" size={20}/> Ad Spend Allocation</h4>
                            <div className="space-y-5">
                                {selectedBrand.campaigns?.map((c, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between text-xs mb-1.5">
                                            <span className="font-bold text-gray-300">{c.name}</span>
                                            <span className="text-gray-500">{c.alloc}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-[#2a2a2a] rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-purple-500 to-orange-500" style={{width: `${c.alloc}%`}}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                         {/* Left Col */}
                         <div className="md:col-span-7 space-y-12">
                            {/* Creatives */}
                            <section>
                                <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-4">
                                    <h4 className="text-xl font-bold text-white flex items-center gap-3"><Sparkles className="text-purple-500" size={20}/> Top Performing Creative</h4>
                                    
                                    <button 
                                        onClick={handleGenerateConcepts}
                                        disabled={generatingConcepts}
                                        className="text-[10px] uppercase font-bold tracking-wider bg-white text-black px-5 py-2.5 rounded hover:bg-gray-200 transition-all flex items-center gap-2 disabled:opacity-50"
                                    >
                                        {generatingConcepts ? <Loader2 size={12} className="animate-spin"/> : <Zap size={12} />}
                                        {generatingConcepts ? 'Processing...' : 'Generate AI Concepts'}
                                    </button>
                                </div>
                                
                                {generatedConcepts && (
                                    <div className="mb-8 glass-panel p-6 rounded animate-fade-in-up border-l-4 border-purple-500 bg-purple-900/10">
                                        <div className="text-xs font-bold uppercase text-purple-400 mb-4 flex items-center gap-2"><Cpu size={14}/> AI Recommendation</div>
                                        <div className="space-y-6">
                                            {generatedConcepts.map((c, i) => (
                                                <div key={i} className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed font-mono">{c}</div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    {selectedBrand.creatives.map((ad, i) => (
                                        <div key={i} className="glass-card p-5 rounded flex items-start gap-5 hover:border-white/20 transition-colors group">
                                            <div className="mt-1 w-10 h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all">
                                                {ad.type.includes('Video') ? <Play size={14} className="ml-0.5"/> : <Layers size={14}/>}
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-200 text-base mb-1">{ad.angle}</div>
                                                <div className="text-sm text-gray-500 leading-relaxed">{ad.content}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                            
                            {/* Formula */}
                            <section>
                                <h4 className="text-xl font-bold text-white mb-8 flex items-center gap-3"><Target className="text-orange-500" size={20}/> The Winning Formula</h4>
                                <div className="glass-panel p-8 rounded border-white/10 bg-[#2a2a2a]/50">
                                    <div className="font-mono text-xs text-orange-400 mb-8 bg-orange-900/10 p-4 rounded border border-orange-500/20 shadow-inner inline-block">{selectedBrand.formula}</div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between text-xs font-bold uppercase text-gray-500 tracking-wider">
                                            <span>Awareness</span>
                                            <span>Conversion</span>
                                        </div>
                                        <div className="h-3 w-full bg-[#1a1a1a] rounded overflow-hidden flex shadow-inner">
                                            <div className="h-full bg-gray-700" style={{width: `${selectedBrand.funnel.awareness}%`}}></div>
                                            <div className="h-full bg-gray-500" style={{width: `${selectedBrand.funnel.consideration}%`}}></div>
                                            <div className="h-full bg-white" style={{width: `${selectedBrand.funnel.conversion}%`}}></div>
                                        </div>
                                        <div className="flex justify-between text-[10px] text-gray-600 font-mono pt-1">
                                            <div>{selectedBrand.funnel.awareness}%</div>
                                            <div>{selectedBrand.funnel.conversion}%</div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                         </div>

                         {/* Right Col */}
                         <div className="md:col-span-5 space-y-12">
                             <section>
                                <h4 className="text-xl font-bold text-white mb-8 flex items-center gap-3"><AlertCircle className="text-red-500" size={20}/> Critical Weaknesses</h4>
                                <div className="space-y-4">
                                    {selectedBrand.weaknesses.map((w, i) => (
                                        <div key={i} className="bg-red-900/10 border border-red-500/20 p-5 rounded hover:bg-red-900/20 transition-colors">
                                            <div className="font-bold text-red-200 text-sm mb-2">{w.title}</div>
                                            <div className="text-xs text-red-300/70 mb-4 leading-relaxed">Impact: {w.impact}</div>
                                            <div className="text-[10px] font-bold text-white bg-red-500/20 px-3 py-1.5 w-fit rounded border border-red-500/30">FIX: {w.fix}</div>
                                        </div>
                                    ))}
                                </div>
                             </section>

                             <section>
                                <h4 className="text-xl font-bold text-white mb-8 flex items-center gap-3"><TrendingUp className="text-green-500" size={20}/> Growth Vectors</h4>
                                <div className="space-y-4">
                                    {selectedBrand.opportunities.map((o, i) => (
                                        <div key={i} className="glass-panel p-5 rounded border-green-500/20 bg-green-900/5">
                                            <div className="font-bold text-green-200 text-sm mb-2">{o.title}</div>
                                            <div className="text-xs text-gray-400 mb-4 leading-relaxed">{o.why}</div>
                                            <button className="text-xs bg-green-600 text-white px-4 py-2 rounded font-bold hover:bg-green-500 transition-colors w-full text-center shadow-lg shadow-green-900/50">
                                                Activate: {o.attack}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                             </section>
                         </div>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* --- AI CHAT WIDGET --- */}
      <div className="fixed bottom-8 right-8 z-40 font-sans">
        {isChatOpen ? (
            <div className="glass-panel w-80 md:w-96 h-[600px] rounded-lg shadow-2xl flex flex-col overflow-hidden animate-slide-up-fade border-white/10 bg-[#1a1a1a] backdrop-blur-2xl">
                <div className="bg-white/5 p-5 border-b border-white/5 flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <span className="absolute flex h-3 w-3 top-0 right-0 -mt-1 -mr-1">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                            </span>
                            <div className="w-10 h-10 bg-[#2a2a2a] rounded flex items-center justify-center font-bold text-white border border-white/10">i</div>
                        </div>
                        <div>
                            <div className="font-bold text-sm text-white">Incubeta AI</div>
                            <div className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Online • Strategist</div>
                        </div>
                    </div>
                    <button onClick={() => setIsChatOpen(false)} className="hover:text-white text-gray-500 transition-colors"><X size={20}/></button>
                </div>
                
                <div className="flex-1 p-5 overflow-y-auto space-y-6 custom-scrollbar">
                    {chatMessages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} stagger-enter`} style={{animationDelay: `${i*100}ms`}}>
                            <div className={`max-w-[85%] p-4 rounded text-sm leading-relaxed shadow-lg ${msg.role === 'user' ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-200 border border-white/5'}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-white/5 p-4 rounded border border-white/5 shadow-sm flex gap-1.5 items-center">
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full typing-dot"></div>
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full typing-dot"></div>
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full typing-dot"></div>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef}></div>
                </div>

                <form onSubmit={handleChatSubmit} className="p-4 border-t border-white/5 flex gap-2 shrink-0 bg-[#1a1a1a]">
                    <input 
                        className="flex-1 bg-white/5 rounded px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all text-white placeholder-gray-600 border border-white/5 hover:bg-white/10"
                        placeholder="Ask for a winning move..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                    />
                    <button type="submit" className="bg-white text-black p-3 rounded hover:bg-gray-200 transition-colors shadow-lg shadow-white/10">
                        <Send size={18} />
                    </button>
                </form>
            </div>
        ) : (
            <button 
                onClick={() => setIsChatOpen(true)}
                className="bg-white text-black px-6 py-4 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-110 transition-all hover:bg-gray-100 flex items-center gap-3 font-bold group animate-slide-up-fade"
            >
                <div className="relative">
                    <MessageSquare size={22} className="group-hover:rotate-12 transition-transform text-purple-600"/>
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
                    </span>
                </div>
                <span className="pr-1 text-sm tracking-wide">Ask Incubeta</span>
            </button>
        )}
      </div>

    </div>
  );
};

export default Dashboard;