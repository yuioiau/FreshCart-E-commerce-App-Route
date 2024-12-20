// Add 3D product preview on hover
const ProductCard = () => {
  return (
    <div className="product-card">
      <div className="product-view">
        <img 
          className="product-image"
          data-tilt 
          data-tilt-max="15"
          data-tilt-speed="400"
          data-tilt-perspective="1000"
          src={product.image}
        />
      </div>
      // ... rest of product card
    </div>
  );
};

export default ProductCard; 