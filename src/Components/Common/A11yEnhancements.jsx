const A11yWrapper = ({ children }) => {
  return (
    <div 
      role="main"
      aria-live="polite"
      className="a11y-wrapper"
    >
      <SkipToMainContent />
      <ColorBlindnessToggle />
      <FontSizeAdjuster />
      {children}
    </div>
  );
}; 