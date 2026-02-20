# 🎨 Custom Asset Creation Plan

## Top 5 Features (No Task System)

1. ✅ **Pet Touch System**
2. ✅ **Photo System**
3. ✅ **Room Customization Full**
4. ✅ **Seasonal Decor**
5. ✅ **Garden System**

---

## ASSET CREATION - NO EMOJI

### A. CLOTHING (Custom SVG)

#### 1. Pajamas Set
```jsx
// Blue Pajamas
const PajamasBlue = () => (
  <svg viewBox="0 0 100 120" className="pajamas-blue">
    {/* Main body */}
    <path d="M25,20 L75,20 L85,110 L15,110 Z" fill="#60A5FA" />
    {/* Collar */}
    <path d="M40,20 L50,30 L60,20" fill="#3B82F6" />
    {/* Buttons */}
    <circle cx="50" cy="40" r="3" fill="#FFFFFF" />
    <circle cx="50" cy="55" r="3" fill="#FFFFFF" />
    <circle cx="50" cy="70" r="3" fill="#FFFFFF" />
    {/* Pocket */}
    <rect x="35" y="75" width="30" height="25" rx="3" fill="#3B82F6" opacity="0.5" />
  </svg>
)

// Pink Pajamas
const PajamasPink = () => (
  <svg viewBox="0 0 100 120" className="pajamas-pink">
    <path d="M25,20 L75,20 L85,110 L15,110 Z" fill="#F472B6" />
    <path d="M40,20 L50,30 L60,20" fill="#EC4899" />
    <circle cx="50" cy="40" r="3" fill="#FFFFFF" />
    <circle cx="50" cy="55" r="3" fill="#FFFFFF" />
    {/* Heart on pocket */}
    <path d="M50,85 Q45,80 40,85 Q35,90 40,95 L50,105 L60,95 Q65,90 60,85 Q55,80 50,85" 
          fill="#FFFFFF" opacity="0.6" />
  </svg>
)
```

#### 2. Sweaters
```jsx
const SweaterRed = () => (
  <svg viewBox="0 0 100 120" className="sweater-red">
    {/* Body */}
    <path d="M20,25 L80,25 L90,110 L10,110 Z" fill="#DC2626" />
    {/* Neck */}
    <rect x="35" y="15" width="30" height="15" rx="5" fill="#DC2626" />
    {/* Stripe pattern */}
    <rect x="20" y="50" width="60" height="8" fill="#FCA5A5" opacity="0.5" />
    <rect x="20" y="70" width="60" height="8" fill="#FCA5A5" opacity="0.5" />
    {/* Cuffs */}
    <rect x="10" y="100" width="15" height="10" rx="3" fill="#FCA5A5" />
    <rect x="75" y="100" width="15" height="10" rx="3" fill="#FCA5A5" />
  </svg>
)
```

#### 3. Wizard Outfit
```jsx
const WizardHat = () => (
  <svg viewBox="0 0 100 100" className="wizard-hat">
    {/* Cone */}
    <polygon points="50,5 20,85 80,85" fill="#7C3AED" />
    {/* Brim */}
    <ellipse cx="50" cy="85" rx="40" ry="8" fill="#5B21B6" />
    {/* Stars */}
    <polygon points="50,20 52,26 58,26 54,30 55,36 50,33 45,36 46,30 42,26 48,26" 
             fill="#FBBF24" />
    <circle cx="35" cy="50" r="4" fill="#FBBF24" />
    <circle cx="65" cy="55" r="3" fill="#FBBF24" />
  </svg>
)

const WizardRobe = () => (
  <svg viewBox="0 0 100 130" className="wizard-robe">
    {/* Main robe */}
    <path d="M15,15 L85,15 L95,125 L5,125 Z" fill="#7C3AED" />
    {/* Vertical stripe */}
    <path d="M50,15 L50,125" stroke="#FBBF24" strokeWidth="4" />
    {/* Belt */}
    <rect x="20" y="65" width="60" height="10" rx="3" fill="#FBBF24" />
    {/* Belt buckle */}
    <rect x="42" y="67" width="16" height="6" fill="#5B21B6" />
    {/* Moon symbol */}
    <path d="M70,40 Q75,35 70,30 Q65,35 70,40" fill="#FBBF24" opacity="0.6" />
  </svg>
)
```

#### 4. Wings
```jsx
const AngelWings = () => (
  <svg viewBox="0 0 120 80" className="angel-wings">
    {/* Left wing */}
    <path d="M60,40 Q30,10 10,20 Q5,35 20,45 Q10,60 30,70 Q50,65 60,40" 
          fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2" />
    {/* Right wing */}
    <path d="M60,40 Q90,10 110,20 Q115,35 100,45 Q110,60 90,70 Q70,65 60,40" 
          fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2" />
    {/* Feather details */}
    <path d="M30,30 Q40,35 35,45" stroke="#E5E7EB" strokeWidth="1.5" fill="none" />
    <path d="M90,30 Q80,35 85,45" stroke="#E5E7EB" strokeWidth="1.5" fill="none" />
  </svg>
)
```

---

### B. ACCESSORIES (Custom SVG)

#### 1. Bows
```jsx
const BowPink = () => (
  <svg viewBox="0 0 80 50" className="bow-pink">
    {/* Left loop */}
    <ellipse cx="30" cy="25" rx="20" ry="15" fill="#EC4899" />
    {/* Right loop */}
    <ellipse cx="50" cy="25" rx="20" ry="15" fill="#EC4899" />
    {/* Center knot */}
    <circle cx="40" cy="25" r="8" fill="#DB2777" />
    {/* Shine */}
    <ellipse cx="25" cy="20" rx="8" ry="5" fill="#F9A8D4" opacity="0.5" />
    <ellipse cx="55" cy="20" rx="8" ry="5" fill="#F9A8D4" opacity="0.5" />
  </svg>
)
```

#### 2. Glasses
```jsx
const RoundGlasses = () => (
  <svg viewBox="0 0 80 30" className="round-glasses">
    {/* Left lens */}
    <circle cx="25" cy="15" r="12" fill="#DBEAFE" opacity="0.3" 
            stroke="#1E293B" strokeWidth="2" />
    {/* Right lens */}
    <circle cx="55" cy="15" r="12" fill="#DBEAFE" opacity="0.3" 
            stroke="#1E293B" strokeWidth="2" />
    {/* Bridge */}
    <path d="M37,15 Q40,12 43,15" stroke="#1E293B" strokeWidth="2" fill="none" />
    {/* Arms */}
    <path d="M13,15 L5,12" stroke="#1E293B" strokeWidth="2" />
    <path d="M67,15 L75,12" stroke="#1E293B" strokeWidth="2" />
  </svg>
)
```

#### 3. Scarf
```jsx
const ScarfRed = () => (
  <svg viewBox="0 0 100 40" className="scarf-red">
    {/* Main scarf */}
    <path d="M10,20 Q50,30 90,20 L90,30 Q50,40 10,30 Z" fill="#DC2626" />
    {/* Fringe */}
    <line x1="15" y1="30" x2="15" y2="38" stroke="#DC2626" strokeWidth="2" />
    <line x1="25" y1="30" x2="25" y2="38" stroke="#DC2626" strokeWidth="2" />
    <line x1="35" y1="30" x2="35" y2="38" stroke="#DC2626" strokeWidth="2" />
    <line x1="75" y1="30" x2="75" y2="38" stroke="#DC2626" strokeWidth="2" />
    <line x1="85" y1="30" x2="85" y2="38" stroke="#DC2626" strokeWidth="2" />
    {/* Pattern */}
    <circle cx="50" cy="25" r="5" fill="#FCA5A5" opacity="0.5" />
  </svg>
)
```

---

### C. FURNITURE (Custom SVG)

#### 1. Bed Collection
```jsx
const BasicBed = () => (
  <svg viewBox="0 0 240 120" className="basic-bed">
    {/* Frame */}
    <rect x="10" y="60" width="220" height="50" rx="8" fill="#8B7355" />
    {/* Legs */}
    <rect x="20" y="100" width="15" height="15" fill="#6B5345" />
    <rect x="205" y="100" width="15" height="15" fill="#6B5345" />
    {/* Mattress */}
    <rect x="20" y="50" width="200" height="35" rx="5" fill="#F5F5F5" />
    {/* Pillow */}
    <ellipse cx="60" cy="55" rx="30" ry="18" fill="#FFFFFF" />
    {/* Blanket */}
    <rect x="90" y="50" width="120" height="30" rx="5" fill="#6B9F7F" />
    {/* Blanket fold */}
    <path d="M90,55 L210,55" stroke="#5A8F6F" strokeWidth="2" />
  </svg>
)

const CozyBed = () => (
  <svg viewBox="0 0 260 140" className="cozy-bed">
    {/* Frame */}
    <rect x="10" y="70" width="240" height="60" rx="10" fill="#A08060" />
    {/* Headboard */}
    <rect x="20" y="20" width="220" height="60" rx="5" fill="#8B7355" />
    {/* Headboard detail */}
    <rect x="40" y="35" width="180" height="30" rx="3" fill="#6B5345" opacity="0.5" />
    {/* Legs */}
    <rect x="25" y="120" width="20" height="15" fill="#6B5345" />
    <rect x="215" y="120" width="20" height="15" fill="#6B5345" />
    {/* Mattress */}
    <rect x="25" y="60" width="210" height="40" rx="5" fill="#FEF3C7" />
    {/* Pillows (2) */}
    <ellipse cx="70" cy="65" rx="35" ry="20" fill="#FFFFFF" />
    <ellipse cx="110" cy="65" rx="35" ry="20" fill="#FFFFFF" />
    {/* Blanket */}
    <rect x="120" y="60" width="105" height="35" rx="5" fill="#F472B6" />
    {/* Decorative pattern */}
    <circle cx="170" cy="75" r="10" fill="#EC4899" opacity="0.3" />
  </svg>
)
```

#### 2. Lamp
```jsx
const Lamp = () => (
  <svg viewBox="0 0 100 350" className="lamp">
    {/* Base */}
    <ellipse cx="50" cy="330" rx="35" ry="12" fill="#D4C4B0" />
    <rect x="35" y="310" width="30" height="20" fill="#C4B4A0" />
    {/* Stand */}
    <rect x="45" y="120" width="10" height="190" fill="#A08060" />
    {/* Decorative ball */}
    <circle cx="50" cy="150" r="12" fill="#B09070" />
    {/* Shade */}
    <path d="M25,120 L75,120 L85,20 L15,20 Z" fill="#F5F5F5" />
    {/* Shade trim */}
    <path d="M25,120 L75,120" stroke="#D4C4B0" strokeWidth="3" />
    {/* Glow effect */}
    <ellipse cx="50" cy="70" r="20" fill="#FFD700" opacity="0.4">
      <animate attributeName="opacity" values="0.3;0.5;0.3" dur="2s" repeatCount="indefinite" />
    </ellipse>
  </svg>
)
```

#### 3. Bathtub
```jsx
const Bathtub = () => (
  <svg viewBox="0 0 280 160" className="bathtub">
    {/* Tub exterior */}
    <rect x="15" y="60" width="250" height="90" rx="25" fill="#FFFFFF" 
          stroke="#E5E7EB" strokeWidth="2" />
    {/* Tub interior */}
    <ellipse cx="140" cy="105" rx="100" ry="35" fill="#F9FAFB" />
    {/* Water */}
    <ellipse cx="140" cy="105" rx="95" ry="30" fill="#BAE6FD" opacity="0.6" />
    {/* Water surface lines */}
    <path d="M60,100 Q80,95 100,100" stroke="#7DD3FC" strokeWidth="2" fill="none" opacity="0.5" />
    <path d="M140,95 Q160,90 180,95" stroke="#7DD3FC" strokeWidth="2" fill="none" opacity="0.5" />
    {/* Faucet */}
    <path d="M245,60 L245,90" stroke="#9CA3AF" strokeWidth="10" strokeLinecap="round" />
    <circle cx="245" cy="55" r="8" fill="#6B7280" />
    {/* Bubbles */}
    <circle cx="80" cy="100" r="6" fill="#FFFFFF" opacity="0.8">
      <animate attributeName="cy" values="100;95;100" dur="1s" repeatCount="indefinite" />
    </circle>
    <circle cx="120" cy="105" r="5" fill="#FFFFFF" opacity="0.6">
      <animate attributeName="cy" values="105;100;105" dur="1.2s" repeatCount="indefinite" />
    </circle>
    <circle cx="180" cy="100" r="7" fill="#FFFFFF" opacity="0.7">
      <animate attributeName="cy" values="100;95;100" dur="0.8s" repeatCount="indefinite" />
    </circle>
  </svg>
)
```

#### 4. Chair
```jsx
const Chair = () => (
  <svg viewBox="0 0 120 150" className="chair">
    {/* Legs */}
    <rect x="15" y="100" width="12" height="45" fill="#8B7355" />
    <rect x="93" y="100" width="12" height="45" fill="#8B7355" />
    <rect x="25" y="110" width="12" height="35" fill="#7B6345" />
    <rect x="83" y="110" width="12" height="35" fill="#7B6345" />
    {/* Seat */}
    <rect x="10" y="85" width="100" height="25" rx="5" fill="#A08060" />
    {/* Cushion */}
    <rect x="15" y="80" width="90" height="15" rx="5" fill="#D4C4B0" />
    {/* Backrest */}
    <rect x="20" y="20" width="80" height="75" rx="5" fill="#A08060" />
    {/* Backrest cushion */}
    <rect x="28" y="28" width="64" height="59" rx="3" fill="#D4C4B0" />
    {/* Decorative pattern */}
    <circle cx="60" cy="58" r="12" fill="#B09070" opacity="0.5" />
  </svg>
)
```

#### 5. Table
```jsx
const Table = () => (
  <svg viewBox="0 0 180 140" className="table">
    {/* Legs */}
    <rect x="20" y="80" width="15" height="55" fill="#8B7355" />
    <rect x="145" y="80" width="15" height="55" fill="#8B7355" />
    <rect x="35" y="90" width="12" height="45" fill="#7B6345" />
    <rect x="133" y="90" width="12" height="45" fill="#7B6345" />
    {/* Support beam */}
    <rect x="35" y="120" width="110" height="10" fill="#6B5345" />
    {/* Tabletop */}
    <rect x="10" y="60" width="160" height="25" rx="5" fill="#A08060" />
    {/* Tabletop surface */}
    <rect x="15" y="55" width="150" height="15" rx="3" fill="#B09070" />
    {/* Wood grain */}
    <path d="M30,62 L150,62" stroke="#907050" strokeWidth="1" opacity="0.5" />
    <path d="M40,67 L140,67" stroke="#907050" strokeWidth="1" opacity="0.5" />
  </svg>
)
```

---

### D. GARDEN ITEMS (Custom SVG)

#### 1. Flowers
```jsx
const Flower1 = () => (
  <svg viewBox="0 0 60 100" className="flower-1">
    {/* Stem */}
    <path d="M30,100 Q35,70 30,40" stroke="#22C55E" strokeWidth="4" fill="none" />
    {/* Leaves */}
    <ellipse cx="20" cy="70" rx="12" ry="6" fill="#16A34A" transform="rotate(-30,20,70)" />
    <ellipse cx="40" cy="60" rx="12" ry="6" fill="#16A34A" transform="rotate(30,40,60)" />
    {/* Petals */}
    <ellipse cx="30" cy="25" rx="8" ry="15" fill="#F472B6" />
    <ellipse cx="30" cy="25" rx="8" ry="15" fill="#EC4899" transform="rotate(60,30,25)" />
    <ellipse cx="30" cy="25" rx="8" ry="15" fill="#F472B6" transform="rotate(120,30,25)" />
    <ellipse cx="30" cy="25" rx="8" ry="15" fill="#EC4899" transform="rotate(180,30,25)" />
    <ellipse cx="30" cy="25" rx="8" ry="15" fill="#F472B6" transform="rotate(240,30,25)" />
    <ellipse cx="30" cy="25" rx="8" ry="15" fill="#EC4899" transform="rotate(300,30,25)" />
    {/* Center */}
    <circle cx="30" cy="25" r="10" fill="#FBBF24" />
  </svg>
)
```

#### 2. Tree
```jsx
const Tree = () => (
  <svg viewBox="0 0 120 200" className="tree">
    {/* Trunk */}
    <rect x="50" y="140" width="20" height="55" fill="#8B7355" />
    {/* Foliage layers */}
    <ellipse cx="60" cy="120" rx="50" ry="35" fill="#22C55E" />
    <ellipse cx="60" cy="95" rx="45" ry="30" fill="#16A34A" />
    <ellipse cx="60" cy="70" rx="40" ry="25" fill="#15803D" />
    {/* Highlights */}
    <ellipse cx="50" cy="100" rx="15" ry="10" fill="#4ADE80" opacity="0.4" />
    <ellipse cx="70" cy="85" rx="12" ry="8" fill="#4ADE80" opacity="0.4" />
  </svg>
)
```

#### 3. Watering Can
```jsx
const WateringCan = () => (
  <svg viewBox="0 0 100 80" className="watering-can">
    {/* Body */}
    <ellipse cx="50" cy="50" rx="35" ry="25" fill="#3B82F6" />
    {/* Spout */}
    <path d="M80,45 Q95,40 95,30 L95,25" stroke="#3B82F6" strokeWidth="8" fill="none" 
          strokeLinecap="round" />
    {/* Handle */}
    <path d="M30,30 Q20,15 35,15 Q50,15 55,30" stroke="#2563EB" strokeWidth="6" fill="none" />
    {/* Cap */}
    <circle cx="50" cy="30" r="8" fill="#2563EB" />
    {/* Water drops */}
    <circle cx="95" cy="20" r="3" fill="#BAE6FD">
      <animate attributeName="cy" values="20;25;20" dur="0.5s" repeatCount="indefinite" />
    </circle>
  </svg>
)
```

---

### E. DECORATIVE ITEMS

#### 1. Rugs
```jsx
const RugRound = () => (
  <svg viewBox="0 0 120 120" className="rug-round">
    <ellipse cx="60" cy="60" rx="55" ry="55" fill="#FCA5A5" />
    <ellipse cx="60" cy="60" rx="40" ry="40" fill="#F9A8D4" />
    <ellipse cx="60" cy="60" rx="25" ry="25" fill="#F472B6" />
    <circle cx="60" cy="60" r="10" fill="#EC4899" />
  </svg>
)
```

#### 2. Wall Clock
```jsx
const Clock = () => (
  <svg viewBox="0 0 80 80" className="wall-clock">
    {/* Frame */}
    <circle cx="40" cy="40" r="38" fill="#8B7355" />
    {/* Face */}
    <circle cx="40" cy="40" r="32" fill="#FEF3C7" />
    {/* Numbers */}
    <circle cx="40" cy="15" r="2" fill="#1F2937" />
    <circle cx="65" cy="40" r="2" fill="#1F2937" />
    <circle cx="40" cy="65" r="2" fill="#1F2937" />
    <circle cx="15" cy="40" r="2" fill="#1F2937" />
    {/* Hands */}
    <line x1="40" y1="40" x2="40" y2="25" stroke="#1F2937" strokeWidth="2" />
    <line x1="40" y1="40" x2="52" y2="40" stroke="#1F2937" strokeWidth="2" />
    <circle cx="40" cy="40" r="3" fill="#1F2937" />
  </svg>
)
```

---

## IMPLEMENTATION STRUCTURE

```javascript
// Asset registry
const ASSETS = {
  clothing: {
    pajamas_blue: PajamasBlue,
    pajamas_pink: PajamasPink,
    sweater_red: SweaterRed,
    wizard_hat: WizardHat,
    wizard_robe: WizardRobe,
    angel_wings: AngelWings,
  },
  accessories: {
    bow_pink: BowPink,
    round_glasses: RoundGlasses,
    scarf_red: ScarfRed,
  },
  furniture: {
    basic_bed: BasicBed,
    cozy_bed: CozyBed,
    lamp: Lamp,
    bathtub: Bathtub,
    chair: Chair,
    table: Table,
  },
  garden: {
    flower_1: Flower1,
    tree: Tree,
    watering_can: WateringCan,
  },
  decor: {
    rug_round: RugRound,
    clock: Clock,
  }
}

// Render component
const renderAsset = (type, id, props) => {
  const Component = ASSETS[type][id]
  return Component ? <Component {...props} /> : null
}
```

---

## NEXT STEPS

1. ✅ Create all SVG components above
2. ✅ Replace emoji in CLOTHING_CATALOG
3. ✅ Replace emoji in ACCESSORIES_CATALOG
4. ✅ Replace emoji in FURNITURE
5. ✅ Add new Garden & Decor items
6. ✅ Test rendering with proper anchoring
7. ✅ Add animations to clothing

**Mau saya mulai implementasikan semua asset ini ke code?** 🎨
