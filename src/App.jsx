import "./App.css";
import ProductCard from "./Components/ProductCard.jsx";
import { useState, useEffect } from "react";
import { products } from "./data.js";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("myCart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("myCart", JSON.stringify(cartItems));
  }, [cartItems]);

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("myList");

    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(wishlist));
  }, [wishlist]);

  const [sortBy, setSortBy] = useState("");

  // New States for Sidebar & Theme
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  // Apply Theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // ──── Add to Cart ────
  function addToCart(product) {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  }

  // ──── Remove from Cart ────
  function removeFromCart(productId) {
    const existingItem = cartItems.find((item) => item.id === productId);
    if (!existingItem) return;

    if (existingItem.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.id !== productId));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      );
    }
  }

  // Calculate total cart items
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Calculate total price
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // ──── Toggle Wishlist ────
  function toggleWishlist(productID) {
    if (wishlist.includes(productID)) {
      setWishlist(wishlist.filter((id) => id !== productID));
    } else {
      setWishlist([...wishlist, productID]);
    }
  }

  // ──── Get unique brands for filter ────
  const brands = [...new Set(products.map((p) => p.brand))];

  // ──── Filter by search + brand ────
  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesBrand =
      selectedBrand === "" || product.brand === selectedBrand;

    return matchesSearch && matchesBrand;
  });

  // ──── Sort ────
  if (sortBy === "low-to-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "high-to-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.rating - a.rating,
    );
  }

  return (
    <div className="app">
      {/* ─── NAVBAR ─── */}
      <nav className="navbar">
        <div className="nav-container">
          <a href="/" className="logo">
            <span className="logo-icon">💥</span>
            TechStore
          </a>

          <ul className="nav-links">
            <li>
              <a href="#products" className="nav-link">
                Products
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                Deals
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                Support
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                About
              </a>
            </li>
          </ul>

          <div className="nav-actions">
            {/* Wishlist button */}
            <button className="nav-btn nav-icon-btn" title="Wishlist">
              ❤️{" "}
              {wishlist.length > 0 && (
                <span className="nav-badge wishlist-badge">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              className="nav-btn nav-icon-btn"
              onClick={toggleTheme}
              title={
                theme === "dark"
                  ? "Switch to Light Mode"
                  : "Switch to Dark Mode"
              }
            >
              {theme === "dark" ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2"></path>
                  <path d="M12 20v2"></path>
                  <path d="m4.93 4.93 1.41 1.41"></path>
                  <path d="m17.66 17.66 1.41 1.41"></path>
                  <path d="M2 12h2"></path>
                  <path d="M20 12h2"></path>
                  <path d="m6.34 17.66-1.41 1.41"></path>
                  <path d="m19.07 4.93-1.41 1.41"></path>
                </svg>
              )}
            </button>

            {/* Cart button */}
            <button
              className="nav-btn nav-icon-btn"
              title="Cart"
              onClick={() => setIsCartOpen(true)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
              </svg>
              {cartCount > 0 && (
                <span className="nav-badge cart-badge">{cartCount}</span>
              )}
            </button>

            <button
              className="nav-btn primary"
              onClick={() => setIsCartOpen(true)}
            >
              ₹{cartTotal.toLocaleString("en-IN")}
            </button>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-tag">New Arrivals 2026</p>
          <h1 className="hero-title">
            The Future of Tech
            <br />
            <span className="hero-highlight">Is Here</span>
          </h1>
          <p className="hero-description">
            Discover the latest in premium technology. From powerful computers
            to cutting-edge technologies, find everything you need in one place.
          </p>
          <div className="hero-cta">
            <button className="btn-primary">Explore Products</button>
            <button className="btn-secondary">Learn More</button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">50k+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat">
              <span className="stat-number">200+</span>
              <span className="stat-label">Premium Products</span>
            </div>
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Customer Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRODUCTS SECTION ─── */}
      <section className="products-section" id="products">
        <div className="section-header">
          <h2 className="section-title">Best Sellers</h2>
          <p className="section-subtitle">
            Our most popular products loved by customers
          </p>
        </div>

        {/* ─── FILTER BAR ─── */}
        <div className="filter-bar">
          {/* Search */}
          <div className="filter-group">
            <span className="filter-icon">🔍</span>
            <input
              type="text"
              className="filter-input"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Brand Filter */}
          <div className="filter-group">
            <select
              className="filter-select"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="">All Brands</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="filter-group">
            <select
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="low-to-high">Price: Low → High</option>
              <option value="high-to-low">Price: High → Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {/* Results count */}
          <span className="filter-results">
            {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* ─── PRODUCT GRID ─── */}
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((data) => (
              <ProductCard
                key={data.id}
                id={data.id}
                image={data.image}
                name={data.name}
                price={data.price}
                originalPrice={data.originalPrice}
                discount={data.discount}
                rating={data.rating}
                isBestSeller={data.isBestSeller}
                brand={data.brand}
                isWishlisted={wishlist.includes(data.id)}
                cartQuantity={
                  (cartItems.find((item) => item.id === data.id) || {})
                    .quantity || 0
                }
                onAddToCart={() => addToCart(data)}
                onRemoveFromCart={() => removeFromCart(data.id)}
                onToggleWishlist={() => toggleWishlist(data.id)}
              />
            ))
          ) : (
            <div className="no-results">
              <span className="no-results-icon">🔍</span>
              <p>No products found matching your filters.</p>
              <button
                className="btn-secondary"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedBrand("");
                  setSortBy("");
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ─── SIDEBAR CART ─── */}
      <div
        className={`cart-overlay ${isCartOpen ? "open" : ""}`}
        onClick={() => setIsCartOpen(false)}
      >
        <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
          <div className="cart-header">
            <h2 className="cart-title">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
              </svg>
              Your Cart
            </h2>
            <button
              className="close-cart-btn"
              onClick={() => setIsCartOpen(false)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>

          <div className="cart-body">
            {cartItems.length === 0 ? (
              <div className="cart-empty">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                  <path d="M3 6h18"></path>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                <p>Your cart is empty.</p>
                <button
                  className="btn-secondary"
                  onClick={() => setIsCartOpen(false)}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <p className="cart-item-price">
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>
                    <div className="cart-item-controls">
                      <button
                        className="cart-item-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        −
                      </button>
                      <span className="cart-item-qty">{item.quantity}</span>
                      <button
                        className="cart-item-btn"
                        onClick={() => addToCart(item)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="remove-item-btn"
                    onClick={() =>
                      setCartItems(cartItems.filter((i) => i.id !== item.id))
                    }
                    title="Remove completely"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="cart-footer">
              <div className="cart-summary">
                <span>Total</span>
                <strong>₹{cartTotal.toLocaleString("en-IN")}</strong>
              </div>
              <button className="checkout-btn">
                Proceed to Checkout ({cartCount})
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ─── FOOTER ─── */}
      <footer className="footer">
        <p>&copy; 2026 TechStore. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
