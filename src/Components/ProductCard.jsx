import "./ProductCard.css";

export default function ProductCard({
  id,
  image,
  name,
  price,
  originalPrice,
  discount,
  rating,
  isBestSeller,
  brand,
  isWishlisted,
  cartQuantity,
  onAddToCart,
  onRemoveFromCart,
  onToggleWishlist,
}) {
  const isInCart = cartQuantity > 0;

  return (
    <div className="product-card">
      {/* discount-badge */}
      {discount && <span className="discount-badge">{discount}</span>}

      <button
        className={`wishlisted ${isWishlisted ? "active" : ""}`}
        onClick={onToggleWishlist}
      >
        {isWishlisted ? "❤️" : "🤍"}
      </button>

      {/* product-image */}
      <div className="image-container">
        <img src={image} alt={name} className="product-image" />
      </div>

      {/* content */}
      <div className="card-content">
        <h3 className="product-name">{name}</h3>

        {/* rating */}
        <div className="rating">
          <span className="stars">
            {"★".repeat(Math.floor(rating))}
            {"✩".repeat(5 - Math.floor(rating))}
          </span>
          <span className="rating-value">{rating}</span>
          {isBestSeller && <span className="bestseller-tag">Best Seller</span>}
        </div>

        {/* price */}
        <div className="price-row">
          <span className="price">₹{price.toLocaleString("en-IN")}</span>
          {originalPrice && (
            <span className="original-price">
              ₹{originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* cart controls */}
        {isInCart ? (
          <div className="cart-controls">
            <button className="cart-ctrl-btn minus" onClick={onRemoveFromCart}>
              −
            </button>
            <span className="cart-qty">{cartQuantity}</span>
            <button className="cart-ctrl-btn plus" onClick={onAddToCart}>
              +
            </button>
          </div>
        ) : (
          <button className="add-btn" onClick={onAddToCart}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
