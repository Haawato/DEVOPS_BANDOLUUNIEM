# Tiệm Nhà Mây

Storefront quà lưu niệm và dashboard quản trị, xây dựng bằng React, Vite, TypeScript, Tailwind CSS, React Router, Zustand và Recharts. Dữ liệu hiện được mô phỏng trong trình duyệt; Axios client đã được chuẩn bị tại `src/lib/api.ts` để kết nối REST API sau này.

## Chạy dự án

Yêu cầu Node.js 20.19+ hoặc 22.12+.

```bash
npm install
npm run dev
```

Các lệnh khác:

```bash
npm run build
npm run lint
npm run preview
```

## Các trang

- Tài khoản: `/login`, `/register`
- Storefront: `/`, `/shop`, `/product/:id`, `/cart`, `/checkout`
- Quản trị: `/admin/dashboard`, `/admin/products`, `/admin/categories`, `/admin/orders`, `/admin/customers`, `/admin/analytics`, `/admin/settings`

## Tài khoản demo

- Admin: `admin@tiemnhamay.vn` / `NhaMay@2026`
- Tài khoản đăng ký mới có role customer và chỉ vào được cửa hàng.
- Guard role chạy phía client với mock data. Trước khi public, cần chuyển xác thực và phân quyền sang backend; mật khẩu localStorage hiện không phải cơ chế bảo mật thật.

## Dữ liệu và trạng thái

- Mock catalog, danh mục, đơn hàng, khách hàng và biểu đồ nằm trong `src/data/mockData.ts`.
- Zustand quản lý giỏ hàng, voucher, đơn hàng, CRUD, phí cửa hàng và giao diện; dữ liệu được lưu trong localStorage với key `tiem-nha-may-store`.
- Mã ưu đãi demo: `NHAMAY10`.
- Hình ảnh sản phẩm được tải từ Unsplash; QR thanh toán là dữ liệu mẫu, không thực hiện giao dịch thật.
