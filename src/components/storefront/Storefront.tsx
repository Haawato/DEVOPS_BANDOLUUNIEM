import { useMemo, useState, type FormEvent } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Check,
  Gift,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Trash2,
  Truck,
} from "lucide-react";
import { useStore } from "../../store/useStore";
import { createOrderReference, currentDate } from "../../lib/orderId";
import { money } from "../../lib/format";
import { useToast } from "../common/toastContext";
import type { Order, Product } from "../../types";

function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const addToCart = useStore((state) => state.addToCart);
  const toast = useToast();
  return (
    <article
      className="product-card"
      style={{ animationDelay: `${index * 55}ms` }}
    >
      <Link to={`/product/${product.id}`} className="product-image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
        {product.originalPrice && (
          <span className="sale-pill">Đang ưu đãi</span>
        )}
        <button
          className="quick-add"
          aria-label={`Thêm ${product.name} vào giỏ`}
          onClick={(event) => {
            event.preventDefault();
            addToCart(product.id);
            toast("Đã thêm vào giỏ hàng");
          }}
        >
          <Plus size={18} />
        </button>
      </Link>
      <div className="product-info">
        <div className="product-meta">
          <span>{product.category}</span>
          <span className="rating">
            <Star size={13} fill="currentColor" /> {product.rating}
          </span>
        </div>
        <Link to={`/product/${product.id}`} className="product-name">
          {product.name}
        </Link>
        <div className="product-price">
          <strong>{money(product.price)}</strong>
          {product.originalPrice && <del>{money(product.originalPrice)}</del>}
        </div>
      </div>
    </article>
  );
}

function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}

export function HomePage() {
  const products = useStore((state) => state.products);
  const categories = useStore((state) => state.categories);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const featured = products.filter((product) => product.featured).slice(0, 4);
  const occasions = [
    {
      name: "Sinh nhật",
      hint: "Thêm một tuổi, thêm một điều đáng nhớ",
      photo:
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=900&q=85",
    },
    {
      name: "Tốt nghiệp",
      hint: "Chúc mừng chương mới bắt đầu",
      photo:
        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=900&q=85",
    },
    {
      name: "Tân gia",
      hint: "Gửi lời chúc đến tổ ấm mới",
      photo:
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85",
    },
  ];
  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">
            <Sparkles size={14} /> MỘT MÓN QUÀ, NGÀN LỜI THƯƠNG
          </span>
          <h1>
            Gửi một chút
            <br />
            <em>dịu dàng</em> đến nhau.
          </h1>
          <p>
            Những món quà thủ công được chọn lựa bằng cả sự tinh tế, để điều bạn
            muốn nói luôn được lắng nghe.
          </p>
          <div className="hero-actions">
            <Link to="/shop" className="button button-dark">
              Tìm món quà của bạn <ArrowRight size={17} />
            </Link>
            <Link to="/shop?occasion=Tốt nghiệp" className="text-link">
              Khám phá quà theo dịp <ArrowDown size={15} />
            </Link>
          </div>
          <div className="hero-proof">
            <div className="avatar-stack">
              <span>H</span>
              <span>M</span>
              <span>L</span>
              <span>+</span>
            </div>
            <span>
              <strong>2.400+</strong> món quà đã trao tay
            </span>
          </div>
        </div>
        <div className="hero-visual">
          <img
            src="https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1200&q=90"
            alt="Nến thơm thủ công trong không gian ấm áp"
          />
          <div className="hero-sticker">
            <span>handpicked</span>
            <strong>with love</strong>
            <Heart size={18} fill="currentColor" />
          </div>
          <div className="hero-caption">
            <span>01 / 04</span>
            <span>Những điều nhỏ bé, đầy ý nghĩa</span>
          </div>
        </div>
        <div className="hero-index">NHÀ MÂY · 2026</div>
      </section>
      <section className="trust-strip">
        <div>
          <span className="trust-icon">
            <Gift size={19} />
          </span>
          <span>
            <strong>Gói quà chỉn chu</strong>
            <small>Mỗi đơn hàng đều được nâng niu</small>
          </span>
        </div>
        <div>
          <span className="trust-icon">
            <Truck size={20} />
          </span>
          <span>
            <strong>Giao hàng toàn quốc</strong>
            <small>Miễn phí đơn từ 800.000đ</small>
          </span>
        </div>
        <div>
          <span className="trust-icon">
            <ShieldCheck size={20} />
          </span>
          <span>
            <strong>Thủ công tuyển chọn</strong>
            <small>Chất lượng từ nghệ nhân Việt</small>
          </span>
        </div>
      </section>
      <section className="section-wrap category-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">TÌM THEO CẢM HỨNG</span>
            <h2>Món quà có câu chuyện</h2>
          </div>
          <Link to="/shop" className="text-link">
            Xem tất cả <ArrowRight size={16} />
          </Link>
        </div>
        <div className="category-grid">
          {categories
            .filter((category) => category.active)
            .slice(0, 4)
            .map((category, index) => (
              <Link
                to={`/shop?category=${encodeURIComponent(category.name)}`}
                className={`category-tile category-tile-${index + 1}`}
                key={category.id}
              >
                <img src={category.image} alt={category.name} loading="lazy" />
                <span className="category-overlay">
                  <strong>{category.name}</strong>
                  <small>{category.description}</small>
                </span>
                <span className="category-arrow">
                  <ArrowRight size={17} />
                </span>
              </Link>
            ))}
        </div>
      </section>
      <section className="occasion-section">
        <div className="section-wrap">
          <div className="section-heading">
            <div>
              <span className="eyebrow">CHỌN MỘT DỊP ĐÁNG NHỚ</span>
              <h2>Trao quà đúng lúc</h2>
            </div>
            <p>
              Đôi khi, một món quà nhỏ là cách đẹp nhất để nói lời chúc mừng.
            </p>
          </div>
          <div className="occasion-grid">
            {occasions.map((occasion) => (
              <Link
                key={occasion.name}
                to={`/shop?occasion=${encodeURIComponent(occasion.name)}`}
                className="occasion-tile"
              >
                <img src={occasion.photo} alt={occasion.name} loading="lazy" />
                <div>
                  <span>{occasion.hint}</span>
                  <strong>
                    {occasion.name}
                    <ArrowRight size={17} />
                  </strong>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section-wrap bestsellers">
        <div className="section-heading">
          <div>
            <span className="eyebrow">ĐƯỢC YÊU THÍCH NHẤT</span>
            <h2>Những món quà bán chạy</h2>
          </div>
          <Link to="/shop" className="text-link">
            Tất cả sản phẩm <ArrowRight size={16} />
          </Link>
        </div>
        <ProductGrid products={featured} />
      </section>
      <section className="note-banner">
        <div className="note-art">
          <span className="note-scribble">
            for you,
            <br />
            always.
          </span>
          <img
            src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=900&q=85"
            alt="Hộp quà được gói thủ công"
            loading="lazy"
          />
        </div>
        <div className="note-content">
          <span className="eyebrow">KHÔNG BIẾT CHỌN GÌ?</span>
          <h2>
            Để chúng mình
            <br />
            chọn cùng bạn.
          </h2>
          <p>
            Từ người bạn thương, dịp bạn muốn chúc mừng đến ngân sách của bạn.
            Nhà Mây sẽ tìm một món quà thật vừa vặn.
          </p>
          <form
            className="gift-search"
            onSubmit={(event) => {
              event.preventDefault();
              navigate(`/shop?q=${encodeURIComponent(search)}`);
            }}
          >
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Bạn đang tìm quà cho ai?"
              aria-label="Bạn đang tìm quà cho ai?"
            />
            <button aria-label="Tìm quà">
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export function ShopPage() {
  const products = useStore((state) => state.products);
  const categories = useStore((state) => state.categories);
  const [params, setParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const query = params.get("q") ?? "";
  const category = params.get("category") ?? "";
  const occasion = params.get("occasion") ?? "";
  const material = params.get("material") ?? "";
  const priceRange = params.get("price") ?? "";
  const sort = params.get("sort") ?? "featured";
  const filtered = useMemo(() => {
    const result = products.filter(
      (product) =>
        (!query || product.name.toLowerCase().includes(query.toLowerCase())) &&
        (!category || product.category === category) &&
        (!occasion ||
          product.occasions.includes(
            occasion as Product["occasions"][number],
          )) &&
        (!material ||
          product.material.toLowerCase().includes(material.toLowerCase())) &&
        (!priceRange ||
          (priceRange === "under300"
            ? product.price < 300000
            : priceRange === "300to500"
              ? product.price >= 300000 && product.price <= 500000
              : priceRange === "over500"
                ? product.price > 500000
                : false)),
    );
    return result.sort((a, b) =>
      sort === "low"
        ? a.price - b.price
        : sort === "high"
          ? b.price - a.price
          : sort === "rating"
            ? b.rating - a.rating
            : Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
    );
  }, [products, query, category, occasion, material, priceRange, sort]);
  const pages = Math.max(1, Math.ceil(filtered.length / 6));
  const visible = filtered.slice((page - 1) * 6, page * 6);
  function updateParam(key: string, value: string) {
    setPage(1);
    setParams((current) => {
      const next = new URLSearchParams(current);
      if (value) next.set(key, value);
      else next.delete(key);
      return next;
    });
  }
  return (
    <section className="shop-page section-wrap">
      <div className="breadcrumbs">
        <Link to="/">Trang chủ</Link>
        <span>/</span>
        <span>Cửa hàng</span>
      </div>
      <div className="shop-title-row">
        <div>
          <span className="eyebrow">ĐỒ THỦ CÔNG VIỆT NAM</span>
          <h1>
            Món quà nhỏ, <em>tình ý lớn.</em>
          </h1>
          <p>Những vật phẩm được làm bằng đôi tay và chọn bằng cả tấm lòng.</p>
        </div>
        <span className="shop-count">{filtered.length} món quà</span>
      </div>
      <div className="shop-toolbar">
        <label className="shop-search">
          <ShoppingBag size={17} />
          <input
            value={query}
            onChange={(event) => updateParam("q", event.target.value)}
            placeholder="Tìm món quà..."
          />
        </label>
        <div className="filter-set">
          <select
            aria-label="Lọc danh mục"
            value={category}
            onChange={(event) => updateParam("category", event.target.value)}
          >
            <option value="">Tất cả danh mục</option>
            {categories.map((item) => (
              <option key={item.id}>{item.name}</option>
            ))}
          </select>
          <select
            aria-label="Lọc dịp tặng"
            value={occasion}
            onChange={(event) => updateParam("occasion", event.target.value)}
          >
            <option value="">Mọi dịp</option>
            {[
              "Sinh nhật",
              "Kỷ niệm",
              "Giáng sinh",
              "Tốt nghiệp",
              "Tân gia",
            ].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <select
            aria-label="Lọc chất liệu"
            value={material}
            onChange={(event) => updateParam("material", event.target.value)}
          >
            <option value="">Mọi chất liệu</option>
            {["Gốm", "Gỗ", "Giấy", "Sáp", "Đá"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <select
            aria-label="Lọc theo giá"
            value={priceRange}
            onChange={(event) => updateParam("price", event.target.value)}
          >
            <option value="">Mọi mức giá</option>
            <option value="under300">Dưới 300.000đ</option>
            <option value="300to500">300.000–500.000đ</option>
            <option value="over500">Trên 500.000đ</option>
          </select>
          <select
            aria-label="Sắp xếp"
            value={sort}
            onChange={(event) => updateParam("sort", event.target.value)}
          >
            <option value="featured">Nổi bật</option>
            <option value="low">Giá thấp đến cao</option>
            <option value="high">Giá cao đến thấp</option>
            <option value="rating">Đánh giá cao</option>
          </select>
        </div>
      </div>
      {visible.length ? (
        <ProductGrid products={visible} />
      ) : (
        <div className="empty-state">
          <span className="empty-icon">
            <ShoppingBag />
          </span>
          <h3>Chưa tìm thấy món quà phù hợp</h3>
          <p>Thử đổi bộ lọc hoặc tìm kiếm với từ khóa khác nhé.</p>
          <button
            className="button button-outline"
            onClick={() => {
              setParams({});
              setPage(1);
            }}
          >
            Xóa bộ lọc
          </button>
        </div>
      )}
      <div className="pagination">
        <span>
          Hiển thị {visible.length ? (page - 1) * 6 + 1 : 0}–
          {Math.min(page * 6, filtered.length)} trong {filtered.length} sản phẩm
        </span>
        <div>
          {Array.from({ length: pages }, (_, index) => (
            <button
              key={index}
              className={
                page === index + 1 ? "page-number active" : "page-number"
              }
              onClick={() => {
                setPage(index + 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="page-number"
            aria-label="Trang tiếp"
            disabled={page >= pages}
            onClick={() => setPage((current) => current + 1)}
          >
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}

export function ProductPage() {
  const { id } = useParams();
  const product = useStore((state) =>
    state.products.find((item) => item.id === id),
  );
  const products = useStore((state) => state.products);
  const addToCart = useStore((state) => state.addToCart);
  const toast = useToast();
  const [quantity, setQuantity] = useState(1);
  if (!product)
    return (
      <div className="empty-state page-empty">
        <h2>Không tìm thấy món quà này</h2>
        <Link className="button button-dark" to="/shop">
          Trở về cửa hàng <ArrowRight size={16} />
        </Link>
      </div>
    );
  return (
    <section className="section-wrap detail-page">
      <div className="breadcrumbs">
        <Link to="/">Trang chủ</Link>
        <span>/</span>
        <Link to="/shop">Cửa hàng</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>
      <div className="detail-layout">
        <div className="detail-photo">
          <img src={product.image} alt={product.name} />
          <span className="detail-photo-label">
            <Sparkles size={14} /> Làm thủ công tại Việt Nam
          </span>
        </div>
        <div className="detail-copy">
          <span className="eyebrow">
            {product.category.toUpperCase()} · {product.material.toUpperCase()}
          </span>
          <h1>{product.name}</h1>
          <div className="detail-rating">
            <span>
              <Star size={15} fill="currentColor" /> {product.rating}
            </span>
            <span>{product.reviews} đánh giá</span>
            <span className="stock-tag">Còn {product.stock} sản phẩm</span>
          </div>
          <div className="detail-price">
            {money(product.price)}{" "}
            {product.originalPrice && <del>{money(product.originalPrice)}</del>}
          </div>
          <p className="detail-description">{product.description}</p>
          <div className="detail-occasions">
            <strong>Thích hợp cho</strong>
            {product.occasions.map((occasion) => (
              <span key={occasion}>{occasion}</span>
            ))}
          </div>
          <div className="detail-quantity">
            <strong>Số lượng</strong>
            <div className="quantity-control">
              <button
                aria-label="Giảm số lượng"
                onClick={() => setQuantity((amount) => Math.max(1, amount - 1))}
              >
                <Minus size={14} />
              </button>
              <span>{quantity}</span>
              <button
                aria-label="Tăng số lượng"
                onClick={() =>
                  setQuantity((amount) => Math.min(product.stock, amount + 1))
                }
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
          <button
            className="button button-dark add-detail"
            onClick={() => {
              for (let i = 0; i < quantity; i += 1) addToCart(product.id);
              toast("Món quà đã nằm trong giỏ của bạn");
            }}
          >
            Thêm vào giỏ · {money(product.price * quantity)}{" "}
            <ShoppingBag size={18} />
          </button>
          <div className="detail-benefits">
            <span>
              <Gift size={16} /> Có thể gói quà
            </span>
            <span>
              <Truck size={16} /> Giao hàng 2–4 ngày
            </span>
            <span>
              <ShieldCheck size={16} /> Đổi trả trong 7 ngày
            </span>
          </div>
          <div className="meaning-note">
            <span className="meaning-mark">“</span>
            <p>
              Món quà này mang theo lời nhắn rằng những điều đẹp đẽ nhất thường
              được tạo nên từ sự kiên nhẫn và yêu thương.
            </p>
            <small>CÂU CHUYỆN NHÀ MÂY</small>
          </div>
        </div>
      </div>
      <div className="related-products">
        <div className="section-heading">
          <div>
            <span className="eyebrow">CÓ THỂ BẠN CŨNG THÍCH</span>
            <h2>Món quà đồng điệu</h2>
          </div>
          <Link to="/shop" className="text-link">
            Xem cửa hàng <ArrowRight size={16} />
          </Link>
        </div>
        <ProductGrid
          products={products
            .filter((item) => item.id !== product.id)
            .slice(0, 4)}
        />
      </div>
    </section>
  );
}

export function CartPage() {
  const cart = useStore((state) => state.cart);
  const products = useStore((state) => state.products);
  const changeQuantity = useStore((state) => state.changeQuantity);
  const remove = useStore((state) => state.removeFromCart);
  const toggleOption = useStore((state) => state.toggleCartOption);
  const voucherCode = useStore((state) => state.voucherCode);
  const setVoucherCode = useStore((state) => state.setVoucherCode);
  const giftWrapFee = useStore((state) => state.giftWrapFee);
  const shippingFee = useStore((state) => state.shippingFee);
  const [voucher, setVoucher] = useState("");
  const toast = useToast();
  const lines = cart
    .map((line) => ({
      ...line,
      product: products.find((item) => item.id === line.productId),
    }))
    .filter((line) => line.product);
  const subtotal = lines.reduce(
    (total, line) => total + (line.product?.price ?? 0) * line.quantity,
    0,
  );
  const extras = lines.reduce(
    (total, line) =>
      total +
      (line.giftWrap ? giftWrapFee * line.quantity : 0) +
      (line.card ? 10000 * line.quantity : 0),
    0,
  );
  const delivery = subtotal >= 800000 || subtotal === 0 ? 0 : shippingFee;
  const discount = voucherCode === "NHAMAY10" ? Math.round(subtotal * 0.1) : 0;
  if (!lines.length)
    return (
      <div className="empty-state page-empty cart-empty">
        <span className="empty-icon">
          <ShoppingBag />
        </span>
        <span className="eyebrow">GIỎ HÀNG ĐANG TRỐNG</span>
        <h2>Món quà tiếp theo đang chờ bạn.</h2>
        <p>Khám phá những món đồ thủ công và tìm món quà vừa vặn nhất.</p>
        <Link to="/shop" className="button button-dark">
          Khám phá cửa hàng <ArrowRight size={17} />
        </Link>
      </div>
    );
  return (
    <section className="section-wrap cart-page">
      <div className="breadcrumbs">
        <Link to="/">Trang chủ</Link>
        <span>/</span>
        <span>Giỏ hàng</span>
      </div>
      <div className="cart-title">
        <div>
          <span className="eyebrow">MỘT MÓN QUÀ ĐANG ĐƯỢC CHỜ ĐỢI</span>
          <h1>
            Giỏ hàng{" "}
            <span>
              ({cart.reduce((total, line) => total + line.quantity, 0)})
            </span>
          </h1>
        </div>
        <Link to="/shop" className="text-link">
          <ArrowLeft size={15} /> Tiếp tục mua sắm
        </Link>
      </div>
      <div className="cart-layout">
        <div className="cart-items">
          <div className="cart-table-head">
            <span>SẢN PHẨM</span>
            <span>ĐƠN GIÁ</span>
            <span>SỐ LƯỢNG</span>
            <span>TẠM TÍNH</span>
          </div>
          {lines.map(
            (line) =>
              line.product && (
                <article className="cart-line" key={line.productId}>
                  <img src={line.product.image} alt={line.product.name} />
                  <div className="cart-line-info">
                    <Link to={`/product/${line.product.id}`}>
                      {line.product.name}
                    </Link>
                    <small>{line.product.material}</small>
                    <label className="option-check">
                      <input
                        type="checkbox"
                        checked={line.giftWrap}
                        onChange={() =>
                          toggleOption(line.productId, "giftWrap")
                        }
                      />{" "}
                      <Gift size={14} /> Gói quà (+{money(giftWrapFee)})
                    </label>
                    <label className="option-check">
                      <input
                        type="checkbox"
                        checked={line.card}
                        onChange={() => toggleOption(line.productId, "card")}
                      />{" "}
                      <Heart size={14} /> Thiệp viết tay (+10.000đ)
                    </label>
                  </div>
                  <span className="cart-unit-price">
                    {money(line.product.price)}
                  </span>
                  <div className="quantity-control">
                    <button
                      aria-label="Giảm"
                      onClick={() =>
                        changeQuantity(line.productId, line.quantity - 1)
                      }
                    >
                      <Minus size={13} />
                    </button>
                    <span>{line.quantity}</span>
                    <button
                      aria-label="Tăng"
                      onClick={() =>
                        changeQuantity(line.productId, line.quantity + 1)
                      }
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                  <strong className="cart-line-total">
                    {money(
                      line.product.price * line.quantity +
                        (line.giftWrap ? giftWrapFee * line.quantity : 0) +
                        (line.card ? 10000 * line.quantity : 0),
                    )}
                  </strong>
                  <button
                    className="icon-button remove-line"
                    aria-label={`Xóa ${line.product.name}`}
                    onClick={() => remove(line.productId)}
                  >
                    <Trash2 size={16} />
                  </button>
                </article>
              ),
          )}
          <div className="voucher-row">
            <div>
              <span className="eyebrow">MÃ ƯU ĐÃI</span>
              <small>
                {voucherCode ? `Đã áp dụng: ${voucherCode}` : "Gợi ý: NHAMAY10"}
              </small>
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (voucher.trim().toUpperCase() === "NHAMAY10") {
                  setVoucherCode("NHAMAY10");
                  toast("Đã áp dụng ưu đãi 10%");
                } else {
                  setVoucherCode("");
                  toast("Mã ưu đãi chưa hợp lệ");
                }
              }}
            >
              <input
                value={voucher}
                onChange={(event) => setVoucher(event.target.value)}
                placeholder="Nhập mã ưu đãi"
              />
              <button className="button button-outline">Áp dụng</button>
            </form>
          </div>
        </div>
        <aside className="cart-summary">
          <h2>Tóm tắt đơn hàng</h2>
          <div className="summary-line">
            <span>Tạm tính</span>
            <span>{money(subtotal)}</span>
          </div>
          <div className="summary-line">
            <span>Gói quà & thiệp</span>
            <span>{money(extras)}</span>
          </div>
          <div className="summary-line">
            <span>Vận chuyển</span>
            <span>{delivery ? money(delivery) : "Miễn phí"}</span>
          </div>
          {discount > 0 && (
            <div className="summary-line discount-line">
              <span>Ưu đãi NHAMAY10</span>
              <span>−{money(discount)}</span>
            </div>
          )}
          <div className="summary-total">
            <span>Tổng cộng</span>
            <strong>{money(subtotal + extras + delivery - discount)}</strong>
          </div>
          <small className="vat-note">Đã bao gồm thuế VAT (nếu có)</small>
          <Link to="/checkout" className="button button-dark full-button">
            Tiến hành thanh toán <ArrowRight size={17} />
          </Link>
          <div className="summary-assurance">
            <ShieldCheck size={16} /> Thanh toán bảo mật · Đổi trả trong 7 ngày
          </div>
        </aside>
      </div>
    </section>
  );
}

export function CheckoutPage() {
  const cart = useStore((state) => state.cart);
  const products = useStore((state) => state.products);
  const addOrder = useStore((state) => state.addOrder);
  const clearCart = useStore((state) => state.clearCart);
  const giftWrapFee = useStore((state) => state.giftWrapFee);
  const shippingFee = useStore((state) => state.shippingFee);
  const voucherCode = useStore((state) => state.voucherCode);
  const [payment, setPayment] = useState<"COD" | "Chuyển khoản QR">("COD");
  const [submitted, setSubmitted] = useState(false);
  const toast = useToast();
  const lines = cart
    .map((line) => ({
      ...line,
      product: products.find((item) => item.id === line.productId),
    }))
    .filter((line) => line.product);
  const subtotal = lines.reduce(
    (amount, line) =>
      amount +
      (line.product?.price ?? 0) * line.quantity +
      (line.giftWrap ? giftWrapFee * line.quantity : 0) +
      (line.card ? 10000 * line.quantity : 0),
    0,
  );
  const merchandiseSubtotal = lines.reduce(
    (amount, line) => amount + (line.product?.price ?? 0) * line.quantity,
    0,
  );
  const discount =
    voucherCode === "NHAMAY10" ? Math.round(merchandiseSubtotal * 0.1) : 0;
  const total = subtotal - discount;
  const shippingDue = merchandiseSubtotal >= 800000 ? 0 : shippingFee;
  if (!lines.length && !submitted)
    return (
      <div className="empty-state page-empty">
        <h2>Giỏ hàng của bạn đang trống.</h2>
        <Link className="button button-dark" to="/shop">
          Quay lại cửa hàng
        </Link>
      </div>
    );
  function placeOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const order: Order = {
      id: createOrderReference(),
      customer: String(form.get("name")),
      email: String(form.get("email")),
      phone: String(form.get("phone")),
      date: currentDate(),
      total: total + shippingDue,
      status: "Chờ xác nhận",
      items: lines.reduce((amount, line) => amount + line.quantity, 0),
      giftNote: String(form.get("giftNote") || ""),
      payment,
    };
    addOrder(order);
    clearCart();
    setSubmitted(true);
    toast("Đặt quà thành công, cảm ơn bạn!");
  }
  if (submitted)
    return (
      <div className="success-state">
        <span>
          <Check size={30} />
        </span>
        <span className="eyebrow">NHÀ MÂY ĐÃ NHẬN ĐƯỢC LỜI NHẮN</span>
        <h1>
          Món quà đang được
          <br />
          <em>chuẩn bị thật đẹp.</em>
        </h1>
        <p>
          Mã đơn hàng của bạn đã được ghi nhận. Chúng mình sẽ liên hệ sớm để xác
          nhận thông tin.
        </p>
        {payment === "Chuyển khoản QR" && (
          <div className="mock-qr-payment">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(`NHA-MAY-${money(total + shippingDue)}`)}`}
              alt="Mã QR chuyển khoản mẫu"
            />
            <span>
              <strong>Quét mã để chuyển khoản</strong>
              <small>Ngân hàng Nhà Mây · STK 0123 456 789</small>
              <small>Nội dung: MAY2026</small>
            </span>
          </div>
        )}
        <Link to="/shop" className="button button-dark">
          Tiếp tục khám phá <ArrowRight size={17} />
        </Link>
      </div>
    );
  return (
    <section className="section-wrap checkout-page">
      <div className="breadcrumbs">
        <Link to="/">Trang chủ</Link>
        <span>/</span>
        <Link to="/cart">Giỏ hàng</Link>
        <span>/</span>
        <span>Thanh toán</span>
      </div>
      <div className="checkout-heading">
        <span className="eyebrow">CHỈ CÒN MỘT BƯỚC NHỎ</span>
        <h1>Gửi món quà đi.</h1>
      </div>
      <form className="checkout-layout" onSubmit={placeOrder}>
        <div className="checkout-form">
          <section className="checkout-section">
            <div className="checkout-section-heading">
              <span>01</span>
              <div>
                <h2>Thông tin người nhận</h2>
                <p>Để món quà tìm đúng người thương.</p>
              </div>
            </div>
            <div className="form-grid">
              <label className="form-field">
                Họ và tên
                <input name="name" required placeholder="Tên người nhận" />
              </label>
              <label className="form-field">
                Số điện thoại
                <input
                  name="phone"
                  type="tel"
                  required
                  pattern="\+?[0-9][0-9\s.\x2d]{7,13}[0-9]"
                  placeholder="090 000 0000"
                />
              </label>
              <label className="form-field full-field">
                Email
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="email@example.com"
                />
              </label>
              <label className="form-field full-field">
                Địa chỉ nhận hàng
                <input
                  name="address"
                  required
                  placeholder="Số nhà, đường, phường/xã..."
                />
              </label>
              <label className="form-field">
                Tỉnh / Thành phố
                <input
                  name="city"
                  required
                  placeholder="Chọn tỉnh / thành phố"
                />
              </label>
              <label className="form-field">
                Mã bưu chính
                <input name="postcode" placeholder="Ví dụ: 700000" />
              </label>
            </div>
          </section>
          <section className="checkout-section">
            <div className="checkout-section-heading">
              <span>02</span>
              <div>
                <h2>Lời nhắn gửi kèm</h2>
                <p>Một vài dòng viết tay làm món quà thêm đặc biệt.</p>
              </div>
            </div>
            <label className="form-field">
              Lời chúc
              <textarea
                name="giftNote"
                maxLength={220}
                placeholder="Gửi một lời chúc thật lòng..."
                rows={4}
              />
            </label>
          </section>
          <section className="checkout-section">
            <div className="checkout-section-heading">
              <span>03</span>
              <div>
                <h2>Phương thức thanh toán</h2>
                <p>Chọn cách thanh toán bạn thấy thuận tiện.</p>
              </div>
            </div>
            <div className="payment-options">
              <label
                className={
                  payment === "COD"
                    ? "payment-option selected"
                    : "payment-option"
                }
              >
                <input
                  type="radio"
                  name="payment"
                  checked={payment === "COD"}
                  onChange={() => setPayment("COD")}
                />
                <span className="payment-symbol">₫</span>
                <span>
                  <strong>Thanh toán khi nhận hàng</strong>
                  <small>COD · Trả tiền mặt cho shipper</small>
                </span>
                <span className="radio-visual" />
              </label>
              <label
                className={
                  payment === "Chuyển khoản QR"
                    ? "payment-option selected"
                    : "payment-option"
                }
              >
                <input
                  type="radio"
                  name="payment"
                  checked={payment === "Chuyển khoản QR"}
                  onChange={() => setPayment("Chuyển khoản QR")}
                />
                <span className="payment-symbol qr-symbol">▦</span>
                <span>
                  <strong>Chuyển khoản ngân hàng</strong>
                  <small>Quét mã QR sau khi đặt hàng</small>
                </span>
                <span className="radio-visual" />
              </label>
            </div>
          </section>
        </div>
        <aside className="checkout-order-summary">
          <h2>
            Đơn quà của bạn <span>({lines.length})</span>
          </h2>
          <div className="checkout-items">
            {lines.map(
              (line) =>
                line.product && (
                  <div className="checkout-item" key={line.productId}>
                    <div className="checkout-item-image">
                      <img src={line.product.image} alt={line.product.name} />
                      <span>{line.quantity}</span>
                    </div>
                    <div>
                      <strong>{line.product.name}</strong>
                      <small>
                        {line.giftWrap ? "Có gói quà" : "Không gói quà"}
                        {line.card ? " · Có thiệp" : ""}
                      </small>
                    </div>
                    <span>{money(line.product.price * line.quantity)}</span>
                  </div>
                ),
            )}
          </div>
          <div className="summary-line">
            <span>Tạm tính & tùy chọn quà</span>
            <span>{money(subtotal)}</span>
          </div>
          {discount > 0 && (
            <div className="summary-line discount-line">
              <span>Ưu đãi {voucherCode}</span>
              <span>−{money(discount)}</span>
            </div>
          )}
          <div className="summary-line">
            <span>Giao hàng</span>
            <span>{shippingDue ? money(shippingDue) : "Miễn phí"}</span>
          </div>
          <div className="summary-total">
            <span>Tổng thanh toán</span>
            <strong>{money(total + shippingDue)}</strong>
          </div>
          <button className="button button-dark full-button" type="submit">
            Đặt món quà này <ArrowRight size={17} />
          </button>
          <p className="checkout-terms">
            <ShieldCheck size={15} /> Bằng việc đặt hàng, bạn đồng ý với chính
            sách mua hàng của Nhà Mây.
          </p>
        </aside>
      </form>
    </section>
  );
}
