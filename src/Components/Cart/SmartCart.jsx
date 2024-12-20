const SmartCart = () => {
  return (
    <div className="smart-cart">
      <SaveForLater items={savedItems} />
      <FrequentlyBoughtTogether product={currentProduct} />
      <PriceTracker product={currentProduct} />
      <QuantityDiscounts product={currentProduct} />
    </div>
  );
};

export default SmartCart; 