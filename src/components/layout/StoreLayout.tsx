import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { ArrowRight, Camera, LogOut, Menu, ShoppingBag, X } from "lucide-react";
import { useStore } from "../../store/useStore";

export function StoreLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const count = useStore((state) =>
    state.cart.reduce((total, line) => total + line.quantity, 0),
  );
  const currentUser = useStore((state) => state.currentUser);
  const logout = useStore((state) => state.logout);
  const navigate = useNavigate();
  const links = [
    ["/", "Trang chủ"],
    ["/shop", "Cửa hàng"],
    ["/shop?occasion=Tốt nghiệp", "Quà theo dịp"],
  ];
  function signOut() {
    logout();
    setMenuOpen(false);
    navigate("/");
  }
  return (
    <div className="store-app">
      <div className="announcement">
        Món quà thủ công, gửi trọn tâm tình <span>·</span> Miễn phí giao hàng
        cho đơn từ 800.000đ
      </div>
      <header className="store-header">
        <div className="store-header-inner">
          <button
            className="icon-button store-menu-button"
            aria-label="Mở menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={22} />
          </button>
          <Link to="/" className="brand">
            <span className="brand-mark">m.</span>
            <span>
              tiệm nhà mây<small>NHỮNG MÓN QUÀ CÓ Ý NGHĨA</small>
            </span>
          </Link>
          <nav className="store-nav">
            {links.slice(0, 3).map(([to, label]) => (
              <NavLink end={to === "/"} key={label} to={to}>
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="store-header-actions">
            {currentUser ? (
              <div className="account-actions">
                {currentUser.role === "admin" && (
                  <Link to="/admin/dashboard" className="admin-shortcut">
                    Quản trị <ArrowRight size={14} />
                  </Link>
                )}
                <span className="store-user-name">{currentUser.name}</span>
                <button className="icon-button" aria-label="Đăng xuất" title="Đăng xuất" onClick={signOut}><LogOut size={17} /></button>
              </div>
            ) : (
              <div className="account-actions">
                <Link to="/login" className="auth-entry">Đăng nhập</Link>
                <Link to="/register" className="auth-entry auth-entry-primary">Đăng ký</Link>
              </div>
            )}
            <Link
              to="/cart"
              className="bag-link"
              aria-label={`Giỏ hàng, ${count} món`}
            >
              <ShoppingBag size={20} />
              <span>Giỏ hàng</span>
              <b>{count}</b>
            </Link>
          </div>
        </div>
      </header>
      {menuOpen && (
        <div
          className="mobile-menu-backdrop"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="mobile-menu"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mobile-menu-heading">
              <span className="brand-mark">m.</span>
              <button
                className="icon-button"
                onClick={() => setMenuOpen(false)}
                aria-label="Đóng menu"
              >
                <X />
              </button>
            </div>
            {links.map(([to, label]) => (
              <Link key={label} to={to} onClick={() => setMenuOpen(false)}>
                {label}
                <ArrowRight size={16} />
              </Link>
            ))}
            {currentUser?.role === "admin" && (
              <Link to="/admin/dashboard" onClick={() => setMenuOpen(false)}>
                Quản trị <ArrowRight size={16} />
              </Link>
            )}
            {currentUser ? (
              <button className="mobile-signout" onClick={signOut}>Đăng xuất <LogOut size={16} /></button>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}>Đăng nhập <ArrowRight size={16} /></Link>
                <Link to="/register" onClick={() => setMenuOpen(false)}>Tạo tài khoản <ArrowRight size={16} /></Link>
              </>
            )}
          </div>
        </div>
      )}
      <main>
        <Outlet />
      </main>
      <footer className="store-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" className="brand">
              <span className="brand-mark">m.</span>
              <span>
                tiệm nhà mây<small>NHỮNG MÓN QUÀ CÓ Ý NGHĨA</small>
              </span>
            </Link>
            <p>Mỗi món quà là một cách để nói rằng: mình luôn nhớ đến nhau.</p>
            <span className="footer-social">
              <Camera size={17} /> @tiemnhamay
            </span>
          </div>
          <div>
            <h4>Khám phá</h4>
            <Link to="/shop">Tất cả sản phẩm</Link>
            <Link to="/shop?occasion=Sinh nhật">Quà sinh nhật</Link>
            <Link to="/shop?occasion=Tân gia">Quà tân gia</Link>
          </div>
          <div>
            <h4>Chăm sóc khách hàng</h4>
            <a href="mailto:xinchao@tiemnhamay.vn">Liên hệ với chúng mình</a>
            <a href="mailto:xinchao@tiemnhamay.vn">Chính sách đổi trả</a>
            <a href="mailto:xinchao@tiemnhamay.vn">Giao hàng & thanh toán</a>
          </div>
          <div className="footer-note">
            <span className="eyebrow">NHẬN LỜI NHẮN TỪ NHÀ MÂY</span>
            <p>Những câu chuyện nhỏ và món quà mới, gửi vào hộp thư của bạn.</p>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                window.alert("Cảm ơn bạn đã đăng ký nhận tin!");
              }}
            >
              <input
                type="email"
                placeholder="Email của bạn"
                aria-label="Email đăng ký"
                required
              />
              <button aria-label="Đăng ký nhận tin">
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Tiệm Nhà Mây. Làm bằng cả sự dịu dàng.</span>
          <span>Thanh toán an toàn · Gói quà miễn phí từ 800.000đ</span>
        </div>
      </footer>
    </div>
  );
}
