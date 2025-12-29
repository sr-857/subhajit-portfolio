const CRTOverlay = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[300]">
      {/* Scanlines */}
      <div className="absolute inset-0 scanlines-overlay opacity-30" />

      {/* Subtle Vignette */}
      <div className="absolute inset-0 vignette opacity-40" />

      {/* Very Subtle Noise */}
      <div className="absolute inset-0 noise-overlay opacity-[0.02]" />

      {/* Screen Glow Edge */}
      <div 
        className="absolute inset-0"
        style={{
          boxShadow: 'inset 0 0 100px rgba(0, 255, 128, 0.03)',
        }}
      />
    </div>
  );
};

export default CRTOverlay;
