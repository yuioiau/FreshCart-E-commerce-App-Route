const ProductReviews = () => {
  return (
    <div className="social-features">
      <div className="user-photos-grid">
        {userPhotos.map(photo => (
          <div className="user-photo">
            <img src={photo.url} />
            <div className="photo-overlay">
              <UserInfo user={photo.user} />
              <ProductTag product={photo.product} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 