# Kali Linux-Inspired 3D Hacker Wallpaper Style Specifications

## Asset Files
- **Desktop**: `kali-hacker-wallpaper-hd.jpg` (1920x1080)
- **Tablet**: `kali-hacker-wallpaper-tablet.jpg` (1024x768)
- **Mobile**: `kali-hacker-wallpaper-mobile.jpg` (640x1136)

## Visual Style

### Base Background
- **Color**: Pure black matte (#000000)
- **Surface**: Non-reflective, deep black for maximum contrast

### 3D Composition
- **Style**: Chrome/glass dragon silhouette inspired by Kali Linux security branding
- **Materials**: 
  - Polished chrome with realistic reflections
  - Semi-transparent glass with purple/cyan edge lighting
  - Holographic terminal code overlays at low opacity
- **Depth**: Centered focal point with ambient glow

### Lighting
- **Primary Glow**: Kali Purple (#8A2BE2) at 50-70% intensity
- **Secondary Glow**: Neon Cyan (#00FFFF) at 40-60% intensity  
- **Accent**: Electric Blue (#00C8FF) at 30-40% intensity
- **Shadow Softness**: 20-30px blur radius
- **Edge Glow Radius**: 15-25px for neon edges

### Effects (Low Opacity)
- **Terminal Code Overlay**: 5-8% opacity
- **Floating Particles**: 3-5% opacity, subtle animation
- **Data Grid**: 2-3% opacity
- **Ambient Glow**: 15-20% spread around focal point

## Color Palette (CSS Variables)
```css
--neon-purple: 280 100% 60%;
--kali-purple: 270 80% 55%;
--kali-blue: 200 100% 50%;
--neon-cyan: 186 100% 43%;
```

## UI Overlay Guidelines

### Contrast Requirements
- Minimum 4.5:1 contrast ratio for text
- UI elements should use semi-transparent dark panels
- Glass panels: `rgba(0,0,0,0.7)` with backdrop blur

### Safe Zones
- **Desktop**: Full canvas usable, dragon centered-left
- **Tablet**: Center 80% safe for main content
- **Mobile**: Vertical composition, top/bottom 15% for UI

### Recommended Overlays
```css
/* For text readability over Kali wallpaper */
background: linear-gradient(
  135deg,
  rgba(0,0,0,0.3) 0%,
  transparent 40%,
  transparent 60%,
  rgba(0,0,0,0.3) 100%
);

/* Vignette for depth */
background: radial-gradient(
  ellipse at center,
  transparent 30%,
  rgba(0,0,0,0.5) 100%
);
```

## Icon Glow Classes
```css
.icon-glow-purple { color: hsl(280, 100%, 75%); }
.icon-glow-kali { color: hsl(270, 80%, 70%); }
.icon-glow-cyan { color: hsl(186, 100%, 70%); }
```

## Performance

### Optimization
- Images compressed with quality 85-90
- Lazy loading disabled for hero background (eager load)
- Responsive srcset for automatic device selection

### Loading Strategy
```jsx
<picture>
  <source media="(max-width: 640px)" srcSet={mobileWallpaper} />
  <source media="(max-width: 1024px)" srcSet={tabletWallpaper} />
  <img src={desktopWallpaper} loading="eager" />
</picture>
```
