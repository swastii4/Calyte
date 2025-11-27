# Calyte Mental Wellness App - Design Guidelines

## Design Approach
**Reference-Based**: Inspired by modern wellness apps like Calm and Headspace, with glassmorphic design principles and breathing animations creating a therapeutic, calming user experience.

## Core Visual System

### Animated Gradient Background
**The signature feature** - dynamic, breathing gradient backgrounds that shift and scale continuously:

**Light Mode Gradient**:
- Primary: Radial gradient from warm whites/yellows (rgba(255,255,255,0.65)) transitioning through golden tones (rgba(255,230,140,0.80)) to cool blue (rgba(130,210,255,0.85)) and soft pink (rgba(255,180,180,0.85))
- Secondary overlay: Subtle pastel tones with lower opacity for depth
- Movement: Circular pattern with 50±18% position variance, 1±0.08 scale breathing effect
- Blur: Primary at 48px, secondary at 28px

**Dark Mode Gradient**:
- Primary: Warm golden glow (rgba(255,240,200,0.85)) fading through amber tones to deep slate (rgba(35,35,40,0.95)) and near-black (rgba(10,10,12,1))
- Secondary: Subdued amber overlay with slate transitions
- Same animation parameters as light mode
- Base background: `#07070a`

**Atmospheric Effects**:
- Three layered "smoke clouds" with varying opacity and animation speeds
- 12% opacity noise texture overlay with mix-blend-overlay
- Breathing animation class synchronized with gradient scaling

### Typography
- **Headings**: Serif font family (elegant, calming)
  - Hero: text-6xl
  - Section headers: text-3xl
  - Subsections: text-xl
- **Body**: Sans-serif font
- **Colors**: 
  - Light mode: text-slate-900 (headings), text-slate-700 (body)
  - Dark mode: text-white/95 (headings), text-white/80 (body)

### Layout System
**Spacing primitives**: Tailwind units of 2, 4, 6, 8, 12, 20, 32
- Container: max-w-7xl mx-auto
- Section spacing: pt-20 pb-32 (main content)
- Card padding: p-6
- Navigation padding: p-6
- Grid gaps: gap-4 (buttons), gap-8 (cards), gap-12 (stats)

### Glassmorphic Component System

**Card Pattern** (used for features, games, community items):
```
Light: bg-slate-900/5 border-slate-900/10
Dark: bg-white/5 border-white/10
All: backdrop-blur-md rounded-2xl border
```

**Button Variants**:
- **Active Mode**: bg-white/20 (dark) or bg-slate-900/20 (light)
- **Inactive**: bg-white/5 hover:bg-white/10 (dark) or bg-slate-900/5 hover:bg-slate-900/10 (light)
- **Primary CTA**: Same as inactive with px-8 py-4 and hover:-translate-y-0.5
- **Icon buttons**: p-2 rounded-lg with same bg pattern
- All buttons: rounded-lg with smooth transitions

**Navigation Bar**:
- Semi-transparent bar with stats, controls, profile
- Stats bar below: bg-white/5 or bg-slate-900/5 with backdrop-blur-md and border-y

**Dropdown Menus**:
- bg-slate-900/95 or bg-white/95
- backdrop-blur-md with border shadow-lg
- Hover states maintain glassmorphic theme

### Iconography
**Lucide React** icon library throughout:
- Navigation/Controls: Moon, Sun, Volume2, VolumeX, User, LogIn, LogOut
- Features: Wind, Music, Heart, Clock, Bot, Users, Shield, MessageSquare
- Stats: Flame (streaks), Trophy (achievements), Calendar (community)
- Consistent sizing: w-5 h-5 (nav), w-6 h-6 (features)

### Color Accents
- **Streak/Fire**: text-orange-400
- **Achievements**: text-yellow-400  
- **Community**: text-green-400
- Applied to icons alongside glassmorphic containers

### Interactive States
- **Hover**: Subtle background opacity increase, translate-y-0.5 for CTAs
- **Active/Selected**: Higher opacity background (bg-white/20 vs bg-white/5)
- **Transitions**: duration-300 for most interactions, duration-1000 for gradients

## Page-Specific Patterns

**Login/Forms**: Center-aligned with glassmorphic containers, maintain gradient background and breathing animations

**Grid Layouts**: 
- md:grid-cols-2 lg:grid-cols-4 for feature cards
- Consistent gap-8 spacing
- All cards use glassmorphic pattern

**Chat/Messages**: Conversation bubbles with type distinction (user vs bot), glassmorphic container for chatbot overlay

**Music Player**: Spotify-inspired controls using existing audio toggle patterns

**Reddit-Style Chat**: Threaded conversations in glassmorphic cards with upvote mechanisms

**Stats/Progress**: Trophy, flame, and calendar icons with numerical displays in semi-transparent containers

## Responsive Behavior
- Mobile: Single column, reduced text sizes
- Tablet: 2-column grids  
- Desktop: Full 4-column layouts, max-w-7xl container

## Critical Implementation Notes
- Breathing animation must sync across gradient layers
- requestAnimationFrame for gradient updates (6000ms cycle)
- Dark mode toggle persists across all pages
- Navigation bar remains fixed and consistent
- All overlays maintain backdrop-blur-md for depth