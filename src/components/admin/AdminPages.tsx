import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Bell,
  Box,
  Boxes,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  CircleHelp,
  Download,
  FileDown,
  Gift,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  MoreHorizontal,
  Package,
  Plus,
  Search,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Sun,
  TrendingUp,
  Truck,
  Users,
  X,
} from "lucide-react";
import { revenueSeries } from "../../data/mockData";
import { useStore } from "../../store/useStore";
import type {
  Category,
  Customer,
  Order,
  OrderStatus,
  Product,
} from "../../types";
import { money } from "../../lib/format";
import { Modal } from "../common/feedback";
import { useToast } from "../common/toastContext";

const navigation = [
  { label: "Tổng quan", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Sản phẩm", path: "/admin/products", icon: Package },
  { label: "Danh mục", path: "/admin/categories", icon: Boxes },
  { label: "Đơn hàng", path: "/admin/orders", icon: ShoppingCart },
  { label: "Khách hàng", path: "/admin/customers", icon: Users },
  { label: "Phân tích", path: "/admin/analytics", icon: TrendingUp },
];

const pageNames: Record<string, string> = {
  "/admin/dashboard": "Tổng quan",
  "/admin/products": "Sản phẩm",
  "/admin/categories": "Danh mục",
  "/admin/orders": "Đơn hàng",
  "/admin/customers": "Khách hàng",
  "/admin/analytics": "Phân tích",
  "/admin/settings": "Cài đặt",
};

export function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = useStore((state) => state.currentUser);
  const logout = useStore((state) => state.logout);
  const darkMode = useStore((state) => state.darkMode);
  const toggleTheme = useStore((state) => state.toggleTheme);
  const orderCount = useStore(
    (state) =>
      state.orders.filter((order) => order.status === "Chờ xác nhận").length,
  );
  function signOut() {
    logout();
    navigate("/", { replace: true });
  }
  return (
    <div
      className={`admin-shell ${collapsed ? "sidebar-collapsed" : ""} ${darkMode ? "admin-dark" : ""}`}
    >
      {drawerOpen && (
        <button
          className="admin-drawer-scrim"
          aria-label="Đóng menu"
          onClick={() => setDrawerOpen(false)}
        />
      )}
      <aside className={`admin-sidebar ${drawerOpen ? "drawer-open" : ""}`}>
        <Link className="admin-brand" to="/admin/dashboard">
          <span className="admin-brand-mark">m.</span>
          {!collapsed && (
            <span>
              tiệm nhà mây<small>STUDIO ADMIN</small>
            </span>
          )}
        </Link>
        <div className="workspace-label">{!collapsed && "WORKSPACE"}</div>
        <nav className="admin-nav">
          {navigation.map(({ label, path, icon: Icon }) => (
            <NavLink
              title={collapsed ? label : undefined}
              key={path}
              to={path}
              className={({ isActive }) =>
                `admin-nav-link ${isActive ? "active" : ""}`
              }
              onClick={() => setDrawerOpen(false)}
            >
              <Icon size={19} />
              <span>{label}</span>
              {path === "/admin/orders" && orderCount > 0 && (
                <b>{orderCount}</b>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-spacer" />
        <Link
          className={`admin-nav-link ${location.pathname === "/admin/settings" ? "active" : ""}`}
          to="/admin/settings"
          title={collapsed ? "Cài đặt" : undefined}
        >
          <Settings size={19} />
          <span>Cài đặt</span>
        </Link>
        <button className="admin-nav-link admin-logout" onClick={signOut}>
          <LogOut size={19} />
          <span>Đăng xuất</span>
        </button>
        <div className="sidebar-help">
          <span className="help-avatar">
            <CircleHelp size={17} />
          </span>
          {!collapsed && (
            <span>
              <strong>Cần hỗ trợ?</strong>
              <small>Nhắn với Nhà Mây</small>
            </span>
          )}
          <button
            aria-label="Liên hệ hỗ trợ"
            onClick={() =>
              (window.location.href = "mailto:xinchao@tiemnhamay.vn")
            }
          >
            <ArrowRight size={15} />
          </button>
        </div>
        <div className="admin-profile">
          <span className="profile-avatar">{currentUser?.name.split(" ").map((part) => part[0]).join("").slice(-2).toUpperCase()}</span>
          {!collapsed && (
            <span className="profile-copy">
              <strong>{currentUser?.name ?? "Quản trị viên"}</strong>
              <small>Chủ cửa hàng</small>
            </span>
          )}
          <button
            className="icon-button profile-more"
            title="Tài khoản"
            onClick={() =>
              window.alert("Bạn đang đăng nhập với vai trò Chủ cửa hàng.")
            }
          >
            <MoreHorizontal size={19} />
          </button>
        </div>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <button
            className="icon-button admin-mobile-menu"
            onClick={() => setDrawerOpen(true)}
            aria-label="Mở menu"
          >
            <Menu size={20} />
          </button>
          <button
            className="icon-button collapse-toggle"
            title={collapsed ? "Mở rộng thanh bên" : "Thu gọn thanh bên"}
            onClick={() => setCollapsed((value) => !value)}
          >
            <ChevronLeft size={18} />
          </button>
          <div className="topbar-crumb">
            <span>Nhà Mây</span>
            <span>/</span>
            <strong>{pageNames[location.pathname] ?? "Tổng quan"}</strong>
          </div>
          <div className="topbar-actions">
            <Link className="view-store-link" to="/">
              Xem cửa hàng <ArrowRight size={14} />
            </Link>
            <button
              className="icon-button theme-toggle"
              title={darkMode ? "Bật giao diện sáng" : "Bật giao diện tối"}
              onClick={toggleTheme}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className="icon-button notification-button"
              aria-label={`Thông báo, ${orderCount} đơn mới`}
              onClick={() =>
                window.alert(`Bạn có ${orderCount} đơn hàng chờ xác nhận.`)
              }
            >
              <Bell size={18} />
              {orderCount > 0 && <i />}
            </button>
            <span className="topbar-divider" />
            <span className="topbar-date">
              <CalendarDays size={15} /> 06 Tháng 10, 2026
            </span>
          </div>
        </header>
        <main className="admin-content">
          <Outlet />
        </main>
        <footer className="admin-footer">
          <span>© 2026 Tiệm Nhà Mây</span>
          <span>
            Được tạo bằng sự tử tế <span className="footer-heart">♥</span>
          </span>
        </footer>
      </div>
    </div>
  );
}

function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="admin-page-header">
      <div>
        {eyebrow && <span className="admin-eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action && <div className="page-header-action">{action}</div>}
    </div>
  );
}

function StatCard({
  label,
  value,
  change,
  icon: Icon,
  tone,
  note,
}: {
  label: string;
  value: string;
  change: string;
  icon: typeof ShoppingBag;
  tone: string;
  note: string;
}) {
  return (
    <article className="stat-card">
      <div className={`stat-icon ${tone}`}>
        <Icon size={19} />
      </div>
      <span className="stat-label">{label}</span>
      <strong className="stat-value">{value}</strong>
      <div className="stat-trend">
        <span>
          <ArrowUpRight size={13} /> {change}
        </span>
        <small>{note}</small>
      </div>
    </article>
  );
}

const statusClasses: Record<OrderStatus, string> = {
  "Chờ xác nhận": "status-pending",
  "Đang gói quà": "status-packing",
  "Đang giao": "status-shipping",
  "Đã giao": "status-complete",
  "Đã hủy": "status-cancelled",
};

function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={`status-badge ${statusClasses[status]}`}>
      <i />
      {status}
    </span>
  );
}

export function DashboardPage() {
  const orders = useStore((state) => state.orders);
  const products = useStore((state) => state.products);
  const customers = useStore((state) => state.customers);
  const [range, setRange] = useState<keyof typeof revenueSeries>("7 ngày");
  const [activeTab, setActiveTab] = useState<
    "Đơn hàng gần đây" | "Sản phẩm bán chạy"
  >("Đơn hàng gần đây");
  const recentOrders = [...orders].slice(0, 5);
  const bestSellers = [...products]
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, 5);
  return (
    <>
      <PageHeader
        eyebrow="THỨ BA, 06 THÁNG 10, 2026"
        title="Chào buổi sáng, Mai Anh 👋"
        description="Một ngày mới để gửi thêm những điều tử tế."
        action={
          <button
            className="button button-admin-primary"
            onClick={() => (window.location.href = "/admin/products")}
          >
            <Plus size={16} /> Thêm sản phẩm
          </button>
        }
      />
      <div className="stats-grid">
        <StatCard
          label="Doanh thu tháng này"
          value="88,3 tr"
          change="18,6%"
          icon={TrendingUp}
          tone="stat-green"
          note="so với tháng trước"
        />
        <StatCard
          label="Đơn hàng quà tặng"
          value={String(orders.length + 124)}
          change="12,4%"
          icon={ShoppingBag}
          tone="stat-peach"
          note="so với tháng trước"
        />
        <StatCard
          label="Khách hàng mới"
          value={String(customers.length + 86)}
          change="8,2%"
          icon={Users}
          tone="stat-blue"
          note="so với tháng trước"
        />
        <StatCard
          label="Sản phẩm trong kho"
          value={String(
            products.reduce((total, product) => total + product.stock, 0),
          )}
          change="4,3%"
          icon={Box}
          tone="stat-yellow"
          note="so với tuần trước"
        />
      </div>
      <div className="dashboard-chart-layout">
        <section className="admin-panel revenue-panel">
          <div className="panel-heading">
            <div>
              <span className="admin-eyebrow">HIỆU SUẤT CỬA HÀNG</span>
              <h2>Doanh thu</h2>
            </div>
            <select
              className="select-compact"
              value={range}
              onChange={(event) =>
                setRange(event.target.value as keyof typeof revenueSeries)
              }
            >
              {Object.keys(revenueSeries).map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
          <div className="chart-total">
            <strong>88.320.000đ</strong>
            <span>
              <ArrowUpRight size={14} /> 18,6%
            </span>
            <small>so với kỳ trước</small>
          </div>
          <div className="revenue-chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueSeries[range]}
                margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d47c52" stopOpacity={0.23} />
                    <stop offset="95%" stopColor="#d47c52" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  stroke="#e9e9e4"
                  strokeDasharray="3 5"
                />
                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#92968f", fontSize: 11 }}
                  dy={8}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#92968f", fontSize: 10 }}
                  tickFormatter={(value: number) =>
                    `${Math.round(value / 1000000)}tr`
                  }
                />
                <Tooltip
                  formatter={(value) => money(Number(value))}
                  contentStyle={{
                    borderRadius: 10,
                    borderColor: "#e9e9e4",
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#c96f47"
                  strokeWidth={2.5}
                  fill="url(#revenueFill)"
                  activeDot={{ r: 5, strokeWidth: 0, fill: "#c96f47" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-legend">
            <span>
              <i /> Doanh thu thuần
            </span>
            <span>Cập nhật lần cuối: 08:42</span>
          </div>
        </section>
        <section className="admin-panel source-panel">
          <div className="panel-heading">
            <div>
              <span className="admin-eyebrow">TRONG THÁNG NÀY</span>
              <h2>Tổng quan nhanh</h2>
            </div>
            <button
              className="icon-button"
              aria-label="Tùy chọn tổng quan"
              onClick={() =>
                window.alert("Số liệu được cập nhật theo thời gian thực.")
              }
            >
              <MoreHorizontal size={19} />
            </button>
          </div>
          <div className="quick-ring">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: "Đã hoàn thành", value: 74 },
                    { name: "Đang xử lý", value: 18 },
                    { name: "Khác", value: 8 },
                  ]}
                  dataKey="value"
                  innerRadius="72%"
                  outerRadius="92%"
                  startAngle={90}
                  endAngle={-270}
                  paddingAngle={3}
                  stroke="none"
                >
                  <Cell fill="#75957c" />
                  <Cell fill="#d6a063" />
                  <Cell fill="#e6e6df" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="ring-label">
              <strong>156</strong>
              <span>đơn hàng</span>
            </div>
          </div>
          <div className="ring-legend">
            <div>
              <i className="legend-sage" />
              <span>Đã hoàn thành</span>
              <strong>74%</strong>
            </div>
            <div>
              <i className="legend-ochre" />
              <span>Đang xử lý</span>
              <strong>18%</strong>
            </div>
            <div>
              <i className="legend-neutral" />
              <span>Khác</span>
              <strong>8%</strong>
            </div>
          </div>
          <div className="quick-insight">
            <span>
              <TrendingUp size={16} />
            </span>
            <p>
              Đơn hàng hoàn thành tăng <strong>12%</strong> so với tháng trước.
            </p>
          </div>
        </section>
      </div>
      <section className="admin-panel recent-panel">
        <div className="panel-heading recent-panel-heading">
          <div>
            <span className="admin-eyebrow">CẬP NHẬT MỚI NHẤT</span>
            <h2>{activeTab}</h2>
          </div>
          <div className="panel-tabs">
            <button
              className={activeTab === "Đơn hàng gần đây" ? "active" : ""}
              onClick={() => setActiveTab("Đơn hàng gần đây")}
            >
              Đơn hàng
            </button>
            <button
              className={activeTab === "Sản phẩm bán chạy" ? "active" : ""}
              onClick={() => setActiveTab("Sản phẩm bán chạy")}
            >
              Bán chạy
            </button>
          </div>
        </div>
        {activeTab === "Đơn hàng gần đây" ? (
          <div className="table-scroll">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>MÃ ĐƠN</th>
                  <th>KHÁCH HÀNG</th>
                  <th>NGÀY ĐẶT</th>
                  <th>SỐ MÓN</th>
                  <th>TỔNG TIỀN</th>
                  <th>TRẠNG THÁI</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <strong>{order.id}</strong>
                    </td>
                    <td>
                      <span className="table-person">
                        <span className="mini-avatar">
                          {order.customer.slice(0, 1)}
                        </span>
                        {order.customer}
                      </span>
                    </td>
                    <td>{order.date}</td>
                    <td>{order.items} món</td>
                    <td>
                      <strong>{money(order.total)}</strong>
                    </td>
                    <td>
                      <StatusBadge status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bestseller-list">
            {bestSellers.map((product, index) => (
              <div className="bestseller-row" key={product.id}>
                <span className="bestseller-rank">0{index + 1}</span>
                <img src={product.image} alt="" />
                <span className="bestseller-name">
                  <strong>{product.name}</strong>
                  <small>{product.category}</small>
                </span>
                <span className="bestseller-sales">
                  {product.reviews + 20}
                  <small>đã bán</small>
                </span>
                <strong>{money(product.price)}</strong>
              </div>
            ))}
          </div>
        )}
        <Link
          to={
            activeTab === "Đơn hàng gần đây"
              ? "/admin/orders"
              : "/admin/products"
          }
          className="table-footer-link"
        >
          Xem tất cả <ArrowRight size={15} />
        </Link>
      </section>
    </>
  );
}

function ProductForm({
  product,
  onSave,
  onCancel,
}: {
  product?: Product;
  onSave: (product: Product) => void;
  onCancel: () => void;
}) {
  const categories = useStore((state) => state.categories);
  const [image, setImage] = useState(product?.image ?? "");
  const [error, setError] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name")).trim();
    const price = Number(form.get("price"));
    const stock = Number(form.get("stock"));
    if (!name || !image || price <= 0 || stock < 0) {
      setError("Kiểm tra tên, hình ảnh, giá và số lượng tồn kho.");
      return;
    }
    onSave({
      id: product?.id ?? `SP-${Date.now()}`,
      name,
      category: String(form.get("category")),
      price,
      originalPrice: Number(form.get("originalPrice")) || undefined,
      material: String(form.get("material")),
      occasions: form.getAll("occasions").map(String) as Product["occasions"],
      stock,
      image,
      description: String(form.get("description")),
      rating: product?.rating ?? 5,
      reviews: product?.reviews ?? 0,
      featured: form.get("featured") === "on",
    });
  }
  return (
    <form className="admin-form" onSubmit={submit}>
      <div className="form-grid admin-form-grid">
        <label className="form-field">
          Tên sản phẩm
          <input
            name="name"
            defaultValue={product?.name}
            placeholder="VD: Bình gốm men ngà"
            required
          />
        </label>
        <label className="form-field">
          Danh mục
          <select
            name="category"
            defaultValue={product?.category ?? categories[0]?.name}
            required
          >
            {categories.map((category) => (
              <option key={category.id}>{category.name}</option>
            ))}
          </select>
        </label>
        <label className="form-field">
          Giá bán (đ)
          <input
            name="price"
            type="number"
            min="1000"
            step="1000"
            defaultValue={product?.price}
            placeholder="350000"
            required
          />
        </label>
        <label className="form-field">
          Giá niêm yết (đ)
          <input
            name="originalPrice"
            type="number"
            min="0"
            step="1000"
            defaultValue={product?.originalPrice}
            placeholder="Không bắt buộc"
          />
        </label>
        <label className="form-field">
          Chất liệu
          <input
            name="material"
            defaultValue={product?.material}
            placeholder="VD: Gốm thủ công"
            required
          />
        </label>
        <label className="form-field">
          Tồn kho
          <input
            name="stock"
            type="number"
            min="0"
            defaultValue={product?.stock ?? 0}
            required
          />
        </label>
        <label className="form-field full-field">
          Ảnh sản phẩm
          <input
            value={image}
            onChange={(event) => setImage(event.target.value)}
            placeholder="Dán liên kết ảnh..."
            required
          />
          <span className="upload-row">
            <input
              type="file"
              accept="image/*"
              aria-label="Tải ảnh lên"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => setImage(String(reader.result));
                  reader.readAsDataURL(file);
                }
              }}
            />
            Tải ảnh lên hoặc dán đường dẫn
          </span>
        </label>
        <label className="form-field full-field">
          Mô tả
          <textarea
            name="description"
            defaultValue={product?.description}
            rows={3}
            placeholder="Câu chuyện phía sau món quà..."
            required
          />
        </label>
        <fieldset className="occasion-field full-field">
          <legend>Dịp phù hợp</legend>
          {["Sinh nhật", "Kỷ niệm", "Giáng sinh", "Tốt nghiệp", "Tân gia"].map(
            (occasion) => (
              <label key={occasion}>
                <input
                  type="checkbox"
                  name="occasions"
                  value={occasion}
                  defaultChecked={product?.occasions.includes(
                    occasion as Product["occasions"][number],
                  )}
                />{" "}
                {occasion}
              </label>
            ),
          )}
        </fieldset>
        <label className="check-field full-field">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={product?.featured}
          />{" "}
          Hiển thị trong sản phẩm nổi bật
        </label>
      </div>
      {error && <p className="form-error">{error}</p>}
      <div className="modal-actions">
        <button
          type="button"
          className="button button-outline"
          onClick={onCancel}
        >
          Hủy
        </button>
        <button className="button button-admin-primary">
          <Check size={15} /> Lưu sản phẩm
        </button>
      </div>
    </form>
  );
}

export function ProductsPage() {
  const products = useStore((state) => state.products);
  const add = useStore((state) => state.addProduct);
  const update = useStore((state) => state.updateProduct);
  const remove = useStore((state) => state.deleteProduct);
  const toast = useToast();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [editing, setEditing] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const filtered = products.filter(
    (product) =>
      (!search || product.name.toLowerCase().includes(search.toLowerCase())) &&
      (!category || product.category === category),
  );
  function saveProduct(product: Product) {
    if (editing) {
      update(product);
      toast("Đã cập nhật sản phẩm");
    } else {
      add(product);
      toast("Đã thêm sản phẩm mới");
    }
    setModalOpen(false);
    setEditing(null);
  }
  return (
    <>
      <PageHeader
        eyebrow="KHO QUÀ NHÀ MÂY"
        title="Sản phẩm"
        description={`${products.length} món quà đang được chăm chút.`}
        action={
          <button
            className="button button-admin-primary"
            onClick={() => {
              setEditing(null);
              setModalOpen(true);
            }}
          >
            <Plus size={16} /> Thêm sản phẩm
          </button>
        }
      />
      <section className="admin-panel management-panel">
        <div className="management-toolbar">
          <label className="admin-search">
            <Search size={17} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tìm tên sản phẩm..."
            />
          </label>
          <select
            className="select-compact"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="">Tất cả danh mục</option>
            {useStore.getState().categories.map((item) => (
              <option key={item.id}>{item.name}</option>
            ))}
          </select>
          <button
            className="button button-outline export-button"
            onClick={() => {
              const csv = [
                "Tên,Danh mục,Giá,Tồn kho",
                ...filtered.map(
                  (product) =>
                    `${product.name},${product.category},${product.price},${product.stock}`,
                ),
              ].join("\n");
              downloadCsv(csv, "danh-sach-san-pham.csv");
            }}
          >
            <Download size={15} /> Xuất file
          </button>
        </div>
        <div className="table-scroll">
          <table className="admin-table product-admin-table">
            <thead>
              <tr>
                <th>SẢN PHẨM</th>
                <th>SKU</th>
                <th>DANH MỤC</th>
                <th>GIÁ BÁN</th>
                <th>TỒN KHO</th>
                <th>TRẠNG THÁI</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id}>
                  <td>
                    <span className="product-table-name">
                      <img src={product.image} alt="" />
                      <span>
                        <strong>{product.name}</strong>
                        <small>{product.material}</small>
                      </span>
                    </span>
                  </td>
                  <td>{product.id}</td>
                  <td>
                    <span className="category-chip">{product.category}</span>
                  </td>
                  <td>
                    <strong>{money(product.price)}</strong>
                  </td>
                  <td>
                    <span
                      className={
                        product.stock < 10 ? "stock-low" : "stock-okay"
                      }
                    >
                      {product.stock} sản phẩm
                    </span>
                  </td>
                  <td>
                    <span
                      className={
                        product.stock > 0 ? "inventory-live" : "inventory-out"
                      }
                    >
                      <i />
                      {product.stock > 0 ? "Đang bán" : "Hết hàng"}
                    </span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button
                        title="Sửa sản phẩm"
                        className="icon-button"
                        onClick={() => {
                          setEditing(product);
                          setModalOpen(true);
                        }}
                      >
                        <Settings size={15} />
                      </button>
                      <button
                        title="Xóa sản phẩm"
                        className="icon-button danger-icon"
                        onClick={() => {
                          if (window.confirm(`Xóa ${product.name}?`)) {
                            remove(product.id);
                            toast("Đã xóa sản phẩm");
                          }
                        }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="management-foot">
          <span>
            Đang hiển thị {filtered.length} trên {products.length} sản phẩm
          </span>
          <span>
            Kho cập nhật vừa xong <Check size={13} />
          </span>
        </div>
      </section>
      {modalOpen && (
        <Modal
          wide
          title={editing ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
          onClose={() => setModalOpen(false)}
        >
          <ProductForm
            product={editing ?? undefined}
            onSave={saveProduct}
            onCancel={() => setModalOpen(false)}
          />
        </Modal>
      )}
    </>
  );
}

function CategoryForm({
  category,
  onSave,
  onCancel,
}: {
  category?: Category;
  onSave: (category: Category) => void;
  onCancel: () => void;
}) {
  const [image, setImage] = useState(category?.image ?? "");
  return (
    <form
      className="admin-form"
      onSubmit={(event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        onSave({
          id: category?.id ?? `DM-${Date.now()}`,
          name: String(form.get("name")).trim(),
          description: String(form.get("description")).trim(),
          image,
          active: form.get("active") === "on",
        });
      }}
    >
      <label className="form-field">
        Tên danh mục
        <input
          name="name"
          defaultValue={category?.name}
          required
          placeholder="VD: Quà gốm thủ công"
        />
      </label>
      <label className="form-field">
        Mô tả ngắn
        <input
          name="description"
          defaultValue={category?.description}
          required
          placeholder="Một câu mô tả danh mục"
        />
      </label>
      <label className="form-field">
        Ảnh đại diện
        <input
          value={image}
          onChange={(event) => setImage(event.target.value)}
          required
          placeholder="Liên kết ảnh"
        />
      </label>
      <label className="check-field">
        <input
          type="checkbox"
          name="active"
          defaultChecked={category?.active ?? true}
        />{" "}
        Hiển thị danh mục trên cửa hàng
      </label>
      <div className="modal-actions">
        <button
          type="button"
          className="button button-outline"
          onClick={onCancel}
        >
          Hủy
        </button>
        <button className="button button-admin-primary">Lưu danh mục</button>
      </div>
    </form>
  );
}

export function CategoriesPage() {
  const categories = useStore((state) => state.categories);
  const products = useStore((state) => state.products);
  const add = useStore((state) => state.addCategory);
  const update = useStore((state) => state.updateCategory);
  const remove = useStore((state) => state.deleteCategory);
  const [editing, setEditing] = useState<Category | null>(null);
  const [open, setOpen] = useState(false);
  const toast = useToast();
  function save(category: Category) {
    if (editing) update(category);
    else add(category);
    setOpen(false);
    setEditing(null);
    toast(editing ? "Đã cập nhật danh mục" : "Đã tạo danh mục mới");
  }
  return (
    <>
      <PageHeader
        eyebrow="SẮP XẾP KHO QUÀ"
        title="Danh mục"
        description="Giúp khách dễ dàng tìm thấy món quà thật hợp ý."
        action={
          <button
            className="button button-admin-primary"
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            <Plus size={16} /> Thêm danh mục
          </button>
        }
      />
      <div className="category-admin-grid">
        {categories.map((category) => (
          <article className="category-admin-card" key={category.id}>
            <div className="category-admin-image">
              <img src={category.image} alt={category.name} />
              <span
                className={
                  category.active ? "category-active" : "category-inactive"
                }
              >
                <i />
                {category.active ? "Đang hiển thị" : "Đang ẩn"}
              </span>
              <div className="category-card-actions">
                <button
                  className="icon-button"
                  title="Sửa danh mục"
                  onClick={() => {
                    setEditing(category);
                    setOpen(true);
                  }}
                >
                  <Settings size={15} />
                </button>
                <button
                  className="icon-button danger-icon"
                  title="Xóa danh mục"
                  onClick={() => {
                    if (window.confirm(`Xóa danh mục ${category.name}?`)) {
                      remove(category.id);
                      toast("Đã xóa danh mục");
                    }
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            <div className="category-admin-body">
              <div>
                <h2>{category.name}</h2>
                <span>
                  {
                    products.filter(
                      (product) => product.category === category.name,
                    ).length
                  }{" "}
                  sản phẩm
                </span>
              </div>
              <p>{category.description}</p>
            </div>
          </article>
        ))}
        <button
          className="category-add-card"
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          <span>
            <Plus size={21} />
          </span>
          <strong>Tạo danh mục mới</strong>
          <small>Thêm một góc nhỏ cho những món quà</small>
        </button>
      </div>
      {open && (
        <Modal
          title={editing ? "Chỉnh sửa danh mục" : "Tạo danh mục mới"}
          onClose={() => setOpen(false)}
        >
          <CategoryForm
            category={editing ?? undefined}
            onSave={save}
            onCancel={() => setOpen(false)}
          />
        </Modal>
      )}
    </>
  );
}

function downloadCsv(content: string, filename: string) {
  const blob = new Blob([`\uFEFF${content}`], {
    type: "text/csv;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function OrdersPage() {
  const orders = useStore((state) => state.orders);
  const updateStatus = useStore((state) => state.updateOrderStatus);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Tất cả trạng thái");
  const [selected, setSelected] = useState<Order | null>(null);
  const toast = useToast();
  const filtered = orders.filter(
    (order) =>
      (!search ||
        `${order.id} ${order.customer} ${order.email}`
          .toLowerCase()
          .includes(search.toLowerCase())) &&
      (filter === "Tất cả trạng thái" || order.status === filter),
  );
  return (
    <>
      <PageHeader
        eyebrow="THEO DÕI NHỮNG MÓN QUÀ"
        title="Đơn hàng"
        description={`${orders.length} đơn hàng · ${orders.filter((order) => order.status === "Chờ xác nhận").length} đơn cần xác nhận`}
        action={
          <button
            className="button button-outline"
            onClick={() =>
              downloadCsv(
                [
                  "Mã đơn,Khách hàng,Email,Ngày,Tổng tiền,Trạng thái,Lời chúc",
                  ...filtered.map(
                    (order) =>
                      `${order.id},${order.customer},${order.email},${order.date},${order.total},${order.status},${order.giftNote}`,
                  ),
                ].join("\n"),
                "don-hang-nha-may.csv",
              )
            }
          >
            <FileDown size={16} /> Xuất đơn hàng
          </button>
        }
      />
      <div className="order-stat-strip">
        <div>
          <span>
            <ShoppingBag size={17} />
          </span>
          <small>Tổng đơn hàng</small>
          <strong>{orders.length}</strong>
        </div>
        <div>
          <span className="order-stat-orange">
            <Gift size={17} />
          </span>
          <small>Chờ xác nhận</small>
          <strong>
            {orders.filter((order) => order.status === "Chờ xác nhận").length}
          </strong>
        </div>
        <div>
          <span className="order-stat-blue">
            <Truck size={17} />
          </span>
          <small>Đang giao</small>
          <strong>
            {orders.filter((order) => order.status === "Đang giao").length}
          </strong>
        </div>
        <div>
          <span className="order-stat-green">
            <Check size={17} />
          </span>
          <small>Đã giao thành công</small>
          <strong>
            {orders.filter((order) => order.status === "Đã giao").length}
          </strong>
        </div>
      </div>
      <section className="admin-panel management-panel">
        <div className="management-toolbar">
          <label className="admin-search">
            <Search size={17} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Mã đơn, khách hàng..."
            />
          </label>
          <select
            className="select-compact"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            {[
              "Tất cả trạng thái",
              "Chờ xác nhận",
              "Đang gói quà",
              "Đang giao",
              "Đã giao",
              "Đã hủy",
            ].map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
          <button
            className="button button-outline export-button"
            onClick={() => {
              setSearch("");
              setFilter("Tất cả trạng thái");
            }}
          >
            Xóa bộ lọc
          </button>
        </div>
        <div className="table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th>MÃ ĐƠN</th>
                <th>KHÁCH HÀNG</th>
                <th>NGÀY ĐẶT</th>
                <th>SẢN PHẨM</th>
                <th>THANH TOÁN</th>
                <th>TỔNG TIỀN</th>
                <th>TRẠNG THÁI</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.id}>
                  <td>
                    <button
                      className="table-id-link"
                      onClick={() => setSelected(order)}
                    >
                      {order.id}
                    </button>
                  </td>
                  <td>
                    <span className="order-customer">
                      <strong>{order.customer}</strong>
                      <small>{order.email}</small>
                    </span>
                  </td>
                  <td>{order.date}</td>
                  <td>{order.items} món quà</td>
                  <td>{order.payment}</td>
                  <td>
                    <strong>{money(order.total)}</strong>
                  </td>
                  <td>
                    <StatusBadge status={order.status} />
                  </td>
                  <td>
                    <button
                      title="Xem chi tiết đơn"
                      className="icon-button"
                      onClick={() => setSelected(order)}
                    >
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="management-foot">
          <span>
            Đang hiển thị {filtered.length} trên {orders.length} đơn hàng
          </span>
          <span>
            <Check size={13} /> Dữ liệu mới nhất
          </span>
        </div>
      </section>
      {selected && (
        <Modal
          title={`Chi tiết đơn ${selected.id}`}
          onClose={() => setSelected(null)}
        >
          <div className="order-detail-modal">
            <div className="order-detail-person">
              <span className="profile-avatar">
                {selected.customer.slice(0, 1)}
              </span>
              <span>
                <strong>{selected.customer}</strong>
                <small>{selected.email}</small>
              </span>
            </div>
            <div className="order-detail-grid">
              <span>
                Mã đơn<strong>{selected.id}</strong>
              </span>
              <span>
                Ngày đặt<strong>{selected.date}</strong>
              </span>
              <span>
                Số lượng<strong>{selected.items} món quà</strong>
              </span>
              <span>
                Thanh toán<strong>{selected.payment}</strong>
              </span>
              <span>
                Tổng tiền<strong>{money(selected.total)}</strong>
              </span>
              <span>
                Trạng thái
                <StatusBadge status={selected.status} />
              </span>
            </div>
            <div className="gift-note-detail">
              <span>
                <Gift size={16} /> Thiệp chúc mừng
              </span>
              <p>{selected.giftNote || "Đơn hàng này không kèm lời nhắn."}</p>
            </div>
            <label className="form-field">
              Cập nhật trạng thái
              <select
                value={selected.status}
                onChange={(event) => {
                  const status = event.target.value as OrderStatus;
                  updateStatus(selected.id, status);
                  setSelected({ ...selected, status });
                  toast("Đã cập nhật trạng thái đơn hàng");
                }}
              >
                {[
                  "Chờ xác nhận",
                  "Đang gói quà",
                  "Đang giao",
                  "Đã giao",
                  "Đã hủy",
                ].map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </label>
          </div>
        </Modal>
      )}
    </>
  );
}

export function CustomersPage() {
  const customers = useStore((state) => state.customers);
  const orders = useStore((state) => state.orders);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Customer | null>(null);
  const filtered = customers.filter((customer) =>
    `${customer.name} ${customer.email} ${customer.phone}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  return (
    <>
      <PageHeader
        eyebrow="NHỮNG NGƯỜI THƯƠNG NHÀ MÂY"
        title="Khách hàng"
        description="Mỗi lần quay lại là một niềm vui nhỏ."
        action={
          <button
            className="button button-outline"
            onClick={() =>
              downloadCsv(
                [
                  "Tên,Email,Số điện thoại,Số đơn,Tổng chi tiêu",
                  ...filtered.map(
                    (customer) =>
                      `${customer.name},${customer.email},${customer.phone},${customer.orders},${customer.spent}`,
                  ),
                ].join("\n"),
                "khach-hang-nha-may.csv",
              )
            }
          >
            <Download size={15} /> Xuất danh sách
          </button>
        }
      />
      <div className="customer-overview">
        <div>
          <span className="customer-overview-icon">
            <Users size={18} />
          </span>
          <span>
            <small>Tổng khách hàng</small>
            <strong>{customers.length + 86}</strong>
          </span>
          <em>
            <ArrowUpRight size={13} /> 8,2%
          </em>
        </div>
        <div>
          <span className="customer-overview-icon customer-icon-peach">
            <Heart size={18} />
          </span>
          <span>
            <small>Khách hàng thân thiết</small>
            <strong>
              {customers.filter((customer) => customer.orders >= 5).length + 28}
            </strong>
          </span>
          <em>
            <ArrowUpRight size={13} /> 12,6%
          </em>
        </div>
        <div>
          <span className="customer-overview-icon customer-icon-blue">
            <TrendingUp size={18} />
          </span>
          <span>
            <small>Chi tiêu trung bình</small>
            <strong>2,4 tr</strong>
          </span>
          <em>
            <ArrowUpRight size={13} /> 5,1%
          </em>
        </div>
      </div>
      <section className="admin-panel management-panel">
        <div className="management-toolbar">
          <label className="admin-search">
            <Search size={17} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tìm tên, email, số điện thoại..."
            />
          </label>
          <span className="subtle-table-label">
            {filtered.length} khách hàng
          </span>
        </div>
        <div className="table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th>KHÁCH HÀNG</th>
                <th>SỐ ĐIỆN THOẠI</th>
                <th>NGÀY THAM GIA</th>
                <th>ĐƠN HÀNG</th>
                <th>TỔNG CHI TIÊU</th>
                <th>PHÂN LOẠI</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((customer, index) => (
                <tr key={customer.id}>
                  <td>
                    <span className="table-person">
                      <span className={`mini-avatar mini-avatar-${index % 4}`}>
                        {customer.name.slice(0, 1)}
                      </span>
                      <span>
                        <strong>{customer.name}</strong>
                        <small>{customer.email}</small>
                      </span>
                    </span>
                  </td>
                  <td>{customer.phone}</td>
                  <td>{customer.joined}</td>
                  <td>{customer.orders} đơn</td>
                  <td>
                    <strong>{money(customer.spent)}</strong>
                  </td>
                  <td>
                    <span
                      className={
                        customer.orders >= 5
                          ? "loyalty-tag"
                          : "new-customer-tag"
                      }
                    >
                      {customer.orders >= 5 ? "Thân thiết" : "Mới"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="icon-button"
                      title="Xem lịch sử mua hàng"
                      onClick={() => setSelected(customer)}
                    >
                      <ArrowRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {selected && (
        <Modal
          title={`Lịch sử mua quà · ${selected.name}`}
          onClose={() => setSelected(null)}
        >
          <div className="customer-history">
            <div className="customer-history-header">
              <span className="profile-avatar">
                {selected.name.slice(0, 1)}
              </span>
              <span>
                <strong>{selected.email}</strong>
                <small>{selected.phone}</small>
              </span>
              <b>{money(selected.spent)}</b>
            </div>
            <h3>Các đơn hàng gần đây</h3>
            {orders.filter((order) => order.email === selected.email).length ? (
              orders
                .filter((order) => order.email === selected.email)
                .map((order) => (
                  <div className="history-order" key={order.id}>
                    <span>
                      <strong>{order.id}</strong>
                      <small>
                        {order.date} · {order.items} món
                      </small>
                    </span>
                    <span>
                      <strong>{money(order.total)}</strong>
                      <StatusBadge status={order.status} />
                    </span>
                  </div>
                ))
            ) : (
              <p>Chưa có đơn hàng trong khoảng thời gian này.</p>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}

export function AnalyticsPage() {
  const products = useStore((state) => state.products);
  const orders = useStore((state) => state.orders);
  const categoryStats = useMemo(
    () =>
      [...new Set(products.map((product) => product.category))]
        .map((category, index) => ({
          name: category,
          sales: products
            .filter((product) => product.category === category)
            .reduce((total, product) => total + product.reviews, 0),
          color: ["#78937b", "#d58a65", "#d5ad65", "#7b9aa2", "#b58d73"][
            index % 5
          ],
        }))
        .sort((a, b) => b.sales - a.sales),
    [products],
  );
  const paymentStats = [
    { name: "COD", value: 42, color: "#77947c" },
    { name: "Chuyển khoản", value: 58, color: "#d48b65" },
  ];
  return (
    <>
      <PageHeader
        eyebrow="SỐ LIỆU & CÂU CHUYỆN"
        title="Phân tích"
        description="Một góc nhìn rõ hơn về hành trình những món quà."
        action={
          <button
            className="button button-outline"
            onClick={() =>
              downloadCsv(
                [
                  "Danh mục,Số lượt đánh giá",
                  ...categoryStats.map((item) => `${item.name},${item.sales}`),
                ].join("\n"),
                "phan-tich-nha-may.csv",
              )
            }
          >
            <Download size={15} /> Tải báo cáo
          </button>
        }
      />
      <div className="analytics-stat-row">
        <StatCard
          label="Tỷ lệ chuyển đổi"
          value="3,84%"
          change="0,42%"
          icon={Activity}
          tone="stat-green"
          note="so với tháng trước"
        />
        <StatCard
          label="Giá trị đơn trung bình"
          value="568.000đ"
          change="6,8%"
          icon={ShoppingBag}
          tone="stat-peach"
          note="so với tháng trước"
        />
        <StatCard
          label="Khách quay lại"
          value="31,2%"
          change="4,1%"
          icon={Users}
          tone="stat-blue"
          note="so với tháng trước"
        />
      </div>
      <div className="analytics-grid">
        <section className="admin-panel analytics-revenue">
          <div className="panel-heading">
            <div>
              <span className="admin-eyebrow">TĂNG TRƯỞNG CỬA HÀNG</span>
              <h2>Doanh thu theo tháng</h2>
            </div>
            <span className="analytics-period">
              12 tháng gần nhất <ChevronDown size={14} />
            </span>
          </div>
          <div className="analytics-chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={revenueSeries["12 tháng"]}
                margin={{ top: 10, right: 5, left: -15, bottom: 0 }}
              >
                <CartesianGrid
                  vertical={false}
                  stroke="#e9e9e4"
                  strokeDasharray="3 5"
                />
                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#92968f", fontSize: 10 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#92968f", fontSize: 10 }}
                  tickFormatter={(value: number) =>
                    `${Math.round(value / 1000000)}tr`
                  }
                />
                <Tooltip formatter={(value) => money(Number(value))} />
                <Bar dataKey="revenue" radius={[5, 5, 0, 0]}>
                  {revenueSeries["12 tháng"].map((item, index) => (
                    <Cell
                      key={item.label}
                      fill={index === 11 ? "#cf7852" : "#d9e3d8"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
        <section className="admin-panel payment-panel">
          <div className="panel-heading">
            <div>
              <span className="admin-eyebrow">THANH TOÁN</span>
              <h2>Phương thức phổ biến</h2>
            </div>
          </div>
          <div className="payment-chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentStats}
                  dataKey="value"
                  innerRadius="66%"
                  outerRadius="90%"
                  paddingAngle={4}
                  stroke="none"
                >
                  {paymentStats.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="payment-chart-label">
              <strong>100%</strong>
              <small>đơn hàng</small>
            </div>
          </div>
          <div className="ring-legend">
            {paymentStats.map((item) => (
              <div key={item.name}>
                <i style={{ background: item.color }} />
                <span>{item.name}</span>
                <strong>{item.value}%</strong>
              </div>
            ))}
          </div>
        </section>
        <section className="admin-panel category-performance">
          <div className="panel-heading">
            <div>
              <span className="admin-eyebrow">SẢN PHẨM ĐƯỢC QUAN TÂM</span>
              <h2>Danh mục nổi bật</h2>
            </div>
            <span className="performance-caption">theo lượt đánh giá</span>
          </div>
          {categoryStats.map((item, index) => (
            <div className="performance-row" key={item.name}>
              <span className="performance-rank">0{index + 1}</span>
              <span className="performance-name">{item.name}</span>
              <div className="performance-meter">
                <i
                  style={{
                    width: `${Math.min(100, (item.sales / Math.max(1, categoryStats[0]?.sales)) * 100)}%`,
                    background: item.color,
                  }}
                />
              </div>
              <strong>{item.sales}</strong>
            </div>
          ))}
        </section>
        <section className="admin-panel fulfillment-panel">
          <div className="panel-heading">
            <div>
              <span className="admin-eyebrow">TRẢI NGHIỆM GIAO QUÀ</span>
              <h2>Đơn hàng theo trạng thái</h2>
            </div>
          </div>
          <div className="fulfillment-total">
            <strong>{orders.length}</strong>
            <small>đơn gần đây</small>
          </div>
          {(
            [
              "Đã giao",
              "Đang giao",
              "Đang gói quà",
              "Chờ xác nhận",
            ] as OrderStatus[]
          ).map((status) => (
            <div className="fulfillment-row" key={status}>
              <StatusBadge status={status} />
              <span>
                {orders.filter((order) => order.status === status).length} đơn
              </span>
              <i
                style={{
                  width: `${Math.max(6, (orders.filter((order) => order.status === status).length / Math.max(1, orders.length)) * 100)}%`,
                }}
              />
            </div>
          ))}
        </section>
      </div>
      <div className="analytics-note">
        <span>
          <Activity size={17} />
        </span>
        <p>
          Những con số được tổng hợp từ mock data và sẽ sẵn sàng kết nối API khi
          cửa hàng phát triển.
        </p>
      </div>
    </>
  );
}

export function SettingsPage() {
  const giftWrapFee = useStore((state) => state.giftWrapFee);
  const shippingFee = useStore((state) => state.shippingFee);
  const updateFees = useStore((state) => state.updateFees);
  const darkMode = useStore((state) => state.darkMode);
  const toggleTheme = useStore((state) => state.toggleTheme);
  const [saved, setSaved] = useState(false);
  const toast = useToast();
  const [wrap, setWrap] = useState(String(giftWrapFee));
  const [shipping, setShipping] = useState(String(shippingFee));
  return (
    <>
      <PageHeader
        eyebrow="KHÔNG GIAN CỦA NHÀ MÂY"
        title="Cài đặt"
        description="Chăm chút những điều nhỏ làm nên trải nghiệm trọn vẹn."
        action={
          <button
            className="button button-admin-primary"
            onClick={() => {
              updateFees(Number(wrap) || 0, Number(shipping) || 0);
              setSaved(true);
              toast("Đã lưu cài đặt cửa hàng");
            }}
          >
            <Check size={16} /> Lưu thay đổi
          </button>
        }
      />
      <div className="settings-layout">
        <nav className="settings-nav">
          <a className="selected" href="#store-info">
            <Settings size={16} /> Thông tin cửa hàng
          </a>
          <a href="#gift-settings">
            <Gift size={16} /> Gói quà & vận chuyển
          </a>
          <a href="#appearance">
            <Sun size={16} /> Giao diện
          </a>
        </nav>
        <div className="settings-content">
          <section className="admin-panel settings-panel" id="store-info">
            <div className="settings-panel-heading">
              <span className="settings-section-icon">
                <Settings size={17} />
              </span>
              <div>
                <h2>Thông tin cửa hàng</h2>
                <p>Những thông tin khách hàng nhìn thấy khi ghé thăm.</p>
              </div>
            </div>
            <div className="form-grid settings-form-grid">
              <label className="form-field">
                Tên cửa hàng
                <input defaultValue="Tiệm Nhà Mây" />
              </label>
              <label className="form-field">
                Email liên hệ
                <input type="email" defaultValue="xinchao@tiemnhamay.vn" />
              </label>
              <label className="form-field">
                Số điện thoại
                <input type="tel" defaultValue="090 123 4567" />
              </label>
              <label className="form-field">
                Địa chỉ cửa hàng
                <input defaultValue="42 Nguyễn Thái Học, Hội An" />
              </label>
              <label className="form-field full-field">
                Lời giới thiệu
                <textarea
                  rows={3}
                  defaultValue="Những món quà thủ công được chọn lựa bằng cả sự tinh tế."
                />
              </label>
            </div>
          </section>
          <section className="admin-panel settings-panel" id="gift-settings">
            <div className="settings-panel-heading">
              <span className="settings-section-icon settings-icon-peach">
                <Gift size={17} />
              </span>
              <div>
                <h2>Gói quà & vận chuyển</h2>
                <p>Thiết lập phí sẽ tự động áp dụng tại bước thanh toán.</p>
              </div>
            </div>
            <div className="settings-fee-row">
              <div>
                <strong>Phí gói quà</strong>
                <small>Thu cho mỗi sản phẩm được chọn gói quà</small>
              </div>
              <label className="fee-input">
                <input
                  value={wrap}
                  onChange={(event) => setWrap(event.target.value)}
                  type="number"
                  min="0"
                  step="1000"
                />
                <span>đ</span>
              </label>
            </div>
            <div className="settings-fee-row">
              <div>
                <strong>Phí vận chuyển</strong>
                <small>Miễn phí cho đơn hàng từ 800.000đ</small>
              </div>
              <label className="fee-input">
                <input
                  value={shipping}
                  onChange={(event) => setShipping(event.target.value)}
                  type="number"
                  min="0"
                  step="1000"
                />
                <span>đ</span>
              </label>
            </div>
          </section>
          <section className="admin-panel settings-panel" id="appearance">
            <div className="settings-panel-heading">
              <span className="settings-section-icon settings-icon-blue">
                <Moon size={17} />
              </span>
              <div>
                <h2>Giao diện</h2>
                <p>Tùy chỉnh không gian làm việc của bạn.</p>
              </div>
            </div>
            <div className="theme-setting">
              <div>
                <strong>Chế độ tối</strong>
                <small>Giao diện dịu mắt cho những ca làm việc muộn.</small>
              </div>
              <button
                role="switch"
                aria-checked={darkMode}
                className={`switch ${darkMode ? "on" : ""}`}
                onClick={toggleTheme}
              >
                <i />
              </button>
            </div>
          </section>
          {saved && (
            <div className="settings-saved">
              <Check size={15} /> Cài đặt đã được lưu và áp dụng.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
