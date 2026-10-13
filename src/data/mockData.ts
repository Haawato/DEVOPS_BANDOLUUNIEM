import type { Category, Customer, Order, Product, StoredAccount } from '../types'

const photos = {
  ceramic: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=85',
  lamp: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85',
  print: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=900&q=85',
  candle: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=85',
  keychain: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85',
  vase: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=900&q=85',
  jewelry: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=85',
  notebook: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=900&q=85',
  wood: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=85',
  textile: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85',
  card: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=85',
  tea: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=85',
  fragrance: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=900&q=85',
  decor: 'https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=900&q=85',
  art: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=85',
  souvenir: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=900&q=85',
}

const baseProducts: Product[] = [
  { id: 'sp-01', name: 'Bình gốm men vân đá', category: 'Gốm sứ', price: 485000, material: 'Gốm thủ công', occasions: ['Tân gia', 'Kỷ niệm'], stock: 18, image: photos.vase, description: 'Mỗi chiếc bình được tạo hình và tráng men thủ công tại một xưởng gốm nhỏ ở Bát Tràng. Những đường vân tự nhiên khiến mỗi món quà là độc nhất.', rating: 4.9, reviews: 42, featured: true },
  { id: 'sp-02', name: 'Đèn ngủ ánh trăng', category: 'Đèn ngủ', price: 620000, originalPrice: 750000, material: 'Gốm & gỗ', occasions: ['Sinh nhật', 'Kỷ niệm'], stock: 9, image: photos.lamp, description: 'Ánh sáng dịu nhẹ như một lời chúc ngủ ngon. Chân đèn làm từ gỗ sồi, chụp đèn gốm nung ở nhiệt độ cao.', rating: 4.8, reviews: 36, featured: true },
  { id: 'sp-03', name: 'Tranh in tay phố Hội', category: 'Tranh treo tường', price: 350000, material: 'Giấy mỹ thuật', occasions: ['Tân gia', 'Tốt nghiệp'], stock: 24, image: photos.print, description: 'Bản in giới hạn lấy cảm hứng từ những mái ngói vàng bên sông Hoài. Được in thủ công trên giấy cotton bền màu.', rating: 4.7, reviews: 29, featured: true },
  { id: 'sp-04', name: 'Nến thơm Mùa an yên', category: 'Nến thơm', price: 285000, material: 'Sáp đậu nành', occasions: ['Sinh nhật', 'Giáng sinh'], stock: 31, image: photos.candle, description: 'Hương gỗ tuyết tùng và vỏ cam ngọt, được pha chế để căn phòng thêm ấm áp sau một ngày dài.', rating: 4.9, reviews: 58, featured: true },
  { id: 'sp-05', name: 'Móc khóa gốm mini', category: 'Móc khóa', price: 125000, material: 'Gốm nung', occasions: ['Sinh nhật', 'Tốt nghiệp'], stock: 45, image: photos.keychain, description: 'Món quà nhỏ xinh được nặn tay, mang theo một chút bình yên của phố cổ trong mỗi chuyến đi.', rating: 4.6, reviews: 73 },
  { id: 'sp-06', name: 'Bộ tách trà sớm mai', category: 'Gốm sứ', price: 540000, material: 'Gốm Bát Tràng', occasions: ['Tân gia', 'Kỷ niệm'], stock: 12, image: photos.ceramic, description: 'Bộ tách trà men ngà, giữ trọn hương trà và những câu chuyện đầu ngày.', rating: 4.8, reviews: 21 },
  { id: 'sp-07', name: 'Vòng tay đá mặt trời', category: 'Phụ kiện', price: 320000, material: 'Đá tự nhiên', occasions: ['Sinh nhật', 'Kỷ niệm'], stock: 15, image: photos.jewelry, description: 'Vòng tay thủ công với những hạt đá màu hổ phách, một lời chúc về năng lượng tích cực.', rating: 4.7, reviews: 18 },
  { id: 'sp-08', name: 'Sổ tay nét mực', category: 'Thiệp & sổ', price: 195000, material: 'Giấy tái chế', occasions: ['Tốt nghiệp', 'Sinh nhật'], stock: 27, image: photos.notebook, description: 'Bìa sổ in họa tiết độc quyền, giấy ngà thân thiện với môi trường cho những ý tưởng mới.', rating: 4.8, reviews: 34 },
  { id: 'sp-09', name: 'Khay gỗ trà chiều', category: 'Đồ gỗ thủ công', price: 395000, material: 'Gỗ sồi', occasions: ['Tân gia', 'Kỷ niệm'], stock: 14, image: photos.wood, description: 'Khay gỗ sồi bo góc mềm, hoàn thiện bằng dầu lau an toàn để những buổi trà chiều thêm ấm cúng.', rating: 4.8, reviews: 26 },
  { id: 'sp-10', name: 'Túi vải Hội An', category: 'Túi vải', price: 245000, material: 'Vải canvas', occasions: ['Sinh nhật', 'Tốt nghiệp'], stock: 32, image: photos.textile, description: 'Túi canvas dày dặn với họa tiết lấy cảm hứng từ những ô cửa vàng phố Hội, tiện dụng mỗi ngày.', rating: 4.7, reviews: 31 },
  { id: 'sp-11', name: 'Thiệp hoa ép mùa hạ', category: 'Thiệp & sổ', price: 85000, material: 'Giấy mỹ thuật', occasions: ['Sinh nhật', 'Kỷ niệm'], stock: 60, image: photos.card, description: 'Tấm thiệp nhỏ với họa tiết hoa ép và khoảng trắng vừa đủ cho những lời chúc viết tay.', rating: 4.9, reviews: 45 },
  { id: 'sp-12', name: 'Kẹp sách gỗ khắc tay', category: 'Đồ gỗ thủ công', price: 110000, material: 'Gỗ tre', occasions: ['Tốt nghiệp', 'Sinh nhật'], stock: 38, image: photos.wood, description: 'Kẹp sách mảnh nhẹ được khắc họa tiết lá, món quà tinh tế cho người bạn yêu những trang sách.', rating: 4.8, reviews: 22 },
  { id: 'sp-13', name: 'Chuông gió tre đón nắng', category: 'Đồ trang trí', price: 335000, material: 'Tre tự nhiên', occasions: ['Tân gia', 'Kỷ niệm'], stock: 17, image: photos.decor, description: 'Âm thanh trong trẻo từ những ống tre tuyển chọn, mang một chút bình yên đến hiên nhà.', rating: 4.6, reviews: 19 },
  { id: 'sp-14', name: 'Tinh dầu thư giãn', category: 'Hương thơm', price: 265000, material: 'Tinh dầu thiên nhiên', occasions: ['Sinh nhật', 'Giáng sinh'], stock: 28, image: photos.fragrance, description: 'Hương sả chanh và gỗ nhẹ nhàng, chưng cất từ nguyên liệu thực vật cho những phút nghỉ ngơi.', rating: 4.8, reviews: 37 },
  { id: 'sp-15', name: 'Hộp trà sen hồ Tây', category: 'Trà & đặc sản', price: 420000, material: 'Trà sen & giấy dó', occasions: ['Tân gia', 'Kỷ niệm', 'Giáng sinh'], stock: 20, image: photos.tea, description: 'Trà xanh ướp sen thơm dịu, đóng trong hộp giấy thủ công để trao tặng những người quý mến.', rating: 4.9, reviews: 33 },
  { id: 'sp-16', name: 'Khăn lụa sắc thu', category: 'Khăn lụa', price: 690000, material: 'Lụa tơ tằm', occasions: ['Sinh nhật', 'Kỷ niệm'], stock: 11, image: photos.textile, description: 'Khăn lụa mềm nhẹ với gam màu trầm ấm, được dệt tại một xưởng gia đình ở miền Trung.', rating: 4.9, reviews: 17 },
  { id: 'sp-17', name: 'Nam châm phố cổ', category: 'Quà lưu niệm', price: 75000, material: 'Gỗ ép in màu', occasions: ['Sinh nhật', 'Tốt nghiệp'], stock: 75, image: photos.souvenir, description: 'Mô hình mái ngói phố cổ thu nhỏ, món quà lưu niệm dễ thương mang theo một ký ức đẹp.', rating: 4.5, reviews: 64 },
  { id: 'sp-18', name: 'Tượng mèo gốm an nhiên', category: 'Đồ trang trí', price: 275000, material: 'Gốm nung', occasions: ['Tân gia', 'Sinh nhật'], stock: 21, image: photos.ceramic, description: 'Tượng mèo nhỏ tạo hình và vẽ men bằng tay, gửi lời chúc bình an đến góc nhà thân thương.', rating: 4.7, reviews: 28 },
  { id: 'sp-19', name: 'Hộp quà hương vị Việt', category: 'Trà & đặc sản', price: 890000, material: 'Trà, cà phê & giấy dó', occasions: ['Tân gia', 'Giáng sinh', 'Kỷ niệm'], stock: 8, image: photos.souvenir, description: 'Tuyển chọn trà, cà phê rang mộc và đặc sản địa phương trong một hộp quà gói thủ công.', rating: 4.9, reviews: 15, featured: true },
  { id: 'sp-20', name: 'Khung ảnh gỗ mộc', category: 'Đồ gỗ thủ công', price: 315000, material: 'Gỗ thông', occasions: ['Tân gia', 'Kỷ niệm'], stock: 16, image: photos.wood, description: 'Khung ảnh gỗ thông giữ lại những khoảnh khắc thân quen, phù hợp với bàn làm việc hoặc kệ sách.', rating: 4.6, reviews: 20 },
  { id: 'sp-21', name: 'Bông tai đất nung', category: 'Phụ kiện', price: 225000, material: 'Đất sét polymer', occasions: ['Sinh nhật', 'Kỷ niệm'], stock: 23, image: photos.jewelry, description: 'Đôi bông tai nhẹ tênh tạo hình lá nhỏ, mỗi cặp được hoàn thiện thủ công với sắc màu riêng.', rating: 4.8, reviews: 25 },
  { id: 'sp-22', name: 'Sổ vẽ những ngày xanh', category: 'Thiệp & sổ', price: 175000, material: 'Giấy vẽ cotton', occasions: ['Tốt nghiệp', 'Sinh nhật'], stock: 29, image: photos.art, description: 'Giấy dày mịn phù hợp cho màu nước và ký họa, dành tặng người luôn nhìn thấy điều đẹp đẽ quanh mình.', rating: 4.7, reviews: 16 },
  { id: 'sp-23', name: 'Túi tote thêu cành lá', category: 'Túi vải', price: 285000, material: 'Vải cotton', occasions: ['Sinh nhật', 'Tốt nghiệp'], stock: 25, image: photos.textile, description: 'Túi cotton thêu cành lá bằng chỉ màu tự nhiên, rộng rãi cho những chuyến đi ngắn trong ngày.', rating: 4.8, reviews: 39 },
  { id: 'sp-24', name: 'Đèn mây góc nhỏ', category: 'Đèn ngủ', price: 760000, material: 'Mây tre đan', occasions: ['Tân gia', 'Giáng sinh'], stock: 7, image: photos.lamp, description: 'Chụp đèn đan tay từ mây tự nhiên, tỏa ánh sáng ấm và tạo bóng đổ dịu dàng lên căn phòng.', rating: 4.8, reviews: 13 },
  { id: 'sp-25', name: 'Bưu thiếp mái ngói phố Hội', category: 'Quà lưu niệm', price: 65000, material: 'Giấy mỹ thuật', occasions: ['Sinh nhật', 'Tốt nghiệp'], stock: 80, image: photos.print, description: 'Bưu thiếp in hình mái ngói vàng và giàn hoa giấy, gửi một lời chào thân thương từ Hội An.', rating: 4.8, reviews: 24 },
  { id: 'sp-26', name: 'Mô hình Chùa Cầu thu nhỏ', category: 'Quà lưu niệm', price: 285000, material: 'Gỗ sơn mài', occasions: ['Tân gia', 'Kỷ niệm'], stock: 16, image: photos.souvenir, description: 'Mô hình Chùa Cầu được làm thủ công với những chi tiết đặc trưng của phố cổ, thích hợp trưng bày trên bàn.', rating: 4.9, reviews: 32 },
  { id: 'sp-27', name: 'Huy hiệu sắc màu Việt Nam', category: 'Quà lưu niệm', price: 55000, material: 'Kim loại tráng men', occasions: ['Sinh nhật', 'Tốt nghiệp'], stock: 90, image: photos.art, description: 'Huy hiệu nhỏ lấy cảm hứng từ sắc màu và hoa văn Việt Nam, dễ dàng gắn lên túi hoặc áo khoác.', rating: 4.6, reviews: 41 },
  { id: 'sp-28', name: 'Nam châm đèn lồng Hội An', category: 'Quà lưu niệm', price: 79000, material: 'Gỗ ép in màu', occasions: ['Sinh nhật', 'Kỷ niệm'], stock: 68, image: photos.keychain, description: 'Chiếc đèn lồng nhiều màu thu nhỏ, lưu giữ ánh sáng phố Hội trên góc tủ lạnh của bạn.', rating: 4.7, reviews: 53 },
  { id: 'sp-29', name: 'Lót ly bản đồ Việt Nam', category: 'Quà lưu niệm', price: 125000, material: 'Gỗ tre', occasions: ['Tân gia', 'Kỷ niệm'], stock: 34, image: photos.wood, description: 'Bộ lót ly khắc bản đồ Việt Nam trên gỗ tre, vừa hữu dụng vừa gợi nhớ những miền đất thân quen.', rating: 4.8, reviews: 27 },
  { id: 'sp-30', name: 'Tượng cô gái áo dài', category: 'Quà lưu niệm', price: 320000, material: 'Gốm vẽ tay', occasions: ['Sinh nhật', 'Tân gia'], stock: 12, image: photos.ceramic, description: 'Tượng gốm nhỏ vẽ tay hình cô gái áo dài, một nét duyên Việt Nam để trang trí kệ sách hoặc bàn làm việc.', rating: 4.9, reviews: 18 },
  { id: 'sp-31', name: 'Móc khóa xe xích lô', category: 'Quà lưu niệm', price: 95000, material: 'Hợp kim đúc', occasions: ['Sinh nhật', 'Tốt nghiệp'], stock: 57, image: photos.keychain, description: 'Mô hình xích lô tí hon với lớp phủ màu bền, món quà nhỏ gọn gợi nhắc những chuyến dạo phố.', rating: 4.5, reviews: 38 },
  { id: 'sp-32', name: 'Tranh mini con phố mùa hoa', category: 'Quà lưu niệm', price: 195000, material: 'Giấy cotton', occasions: ['Tân gia', 'Kỷ niệm'], stock: 22, image: photos.art, description: 'Bản in khổ nhỏ tái hiện con phố ngập sắc hoa, có thể đặt bàn hoặc lồng khung treo tường.', rating: 4.7, reviews: 21 },
  { id: 'sp-33', name: 'Hộp nhạc gỗ giai điệu quê nhà', category: 'Quà lưu niệm', price: 390000, material: 'Gỗ sồi', occasions: ['Sinh nhật', 'Kỷ niệm', 'Giáng sinh'], stock: 9, image: photos.wood, description: 'Hộp nhạc lên dây cót với giai điệu êm dịu, hoàn thiện vân gỗ tự nhiên và khắc lời nhắn theo yêu cầu.', rating: 4.8, reviews: 14 },
  { id: 'sp-34', name: 'Dấu trang đèn lồng giấy dó', category: 'Quà lưu niệm', price: 72000, material: 'Giấy dó ép', occasions: ['Tốt nghiệp', 'Sinh nhật'], stock: 46, image: photos.notebook, description: 'Dấu trang mảnh nhẹ in họa tiết đèn lồng, dành tặng người thích giữ lại những trang sách hay.', rating: 4.7, reviews: 29 },
  { id: 'sp-35', name: 'Bộ 5 bưu ảnh miền Trung', category: 'Quà lưu niệm', price: 145000, material: 'Giấy mỹ thuật', occasions: ['Kỷ niệm', 'Tốt nghiệp'], stock: 31, image: photos.card, description: 'Năm tấm bưu ảnh tuyển chọn từ biển xanh, phố cổ và những miền nắng gió, gói trong bao giấy tái chế.', rating: 4.8, reviews: 35 },
  { id: 'sp-36', name: 'Mô hình thuyền buồm sông Hoài', category: 'Quà lưu niệm', price: 420000, material: 'Gỗ thủ công', occasions: ['Tân gia', 'Kỷ niệm'], stock: 10, image: photos.decor, description: 'Thuyền buồm gỗ thu nhỏ với cánh buồm vải, lấy cảm hứng từ những chiếc thuyền trôi trên sông Hoài lúc chiều xuống.', rating: 4.9, reviews: 12 },
  { id: 'sp-37', name: 'Ống cắm bút phố cổ', category: 'Quà lưu niệm', price: 185000, material: 'Gốm tráng men', occasions: ['Tốt nghiệp', 'Tân gia'], stock: 19, image: photos.vase, description: 'Ống cắm bút gốm vẽ họa tiết cửa sổ phố cổ, điểm nhấn gọn gàng cho góc học tập và làm việc.', rating: 4.6, reviews: 17 },
  { id: 'sp-38', name: 'Đèn lồng vải để bàn', category: 'Quà lưu niệm', price: 520000, material: 'Tre & vải lụa', occasions: ['Tân gia', 'Giáng sinh'], stock: 8, image: photos.lamp, description: 'Đèn lồng mini khung tre bọc vải lụa, tỏa ánh sáng ấm và mang một chút không khí phố Hội về nhà.', rating: 4.9, reviews: 11 },
]

export const initialCategories: Category[] = [
  { id: 'cat-01', name: 'Gốm sứ', description: 'Vẻ đẹp từ đất và đôi bàn tay', image: photos.ceramic, active: true },
  { id: 'cat-02', name: 'Đèn ngủ', description: 'Ánh sáng ấm cho góc nhỏ', image: photos.lamp, active: true },
  { id: 'cat-03', name: 'Tranh treo tường', description: 'Một góc Việt Nam trong nhà', image: photos.print, active: true },
  { id: 'cat-04', name: 'Nến thơm', description: 'Hương thơm của những dịp đặc biệt', image: photos.candle, active: true },
  { id: 'cat-05', name: 'Móc khóa', description: 'Món quà nhỏ mang theo mỗi ngày', image: photos.keychain, active: true },
  { id: 'cat-06', name: 'Đồ gỗ thủ công', description: 'Vân gỗ mộc và nét chạm tỉ mỉ', image: photos.wood, active: true },
  { id: 'cat-07', name: 'Túi vải', description: 'Nhẹ nhàng theo bạn mỗi ngày', image: photos.textile, active: true },
  { id: 'cat-08', name: 'Thiệp & sổ', description: 'Viết xuống điều bạn muốn gửi', image: photos.card, active: true },
  { id: 'cat-09', name: 'Phụ kiện', description: 'Chi tiết nhỏ mang dấu ấn riêng', image: photos.jewelry, active: true },
  { id: 'cat-10', name: 'Đồ trang trí', description: 'Thêm một nét riêng cho tổ ấm', image: photos.decor, active: true },
  { id: 'cat-11', name: 'Hương thơm', description: 'Khoảng lặng dịu dàng trong ngày', image: photos.fragrance, active: true },
  { id: 'cat-12', name: 'Trà & đặc sản', description: 'Hương vị thân quen từ mọi miền', image: photos.tea, active: true },
  { id: 'cat-13', name: 'Khăn lụa', description: 'Sợi tơ mềm cùng sắc màu tinh tế', image: photos.textile, active: true },
  { id: 'cat-14', name: 'Quà lưu niệm', description: 'Mang theo một chút ký ức đẹp', image: photos.souvenir, active: true },
]

function fillCategoryCatalog(products: Product[], categories: Category[]): Product[] {
  const completed = [...products]
  let nextId = Math.max(...products.map((product) => Number(product.id.slice(3)))) + 1

  for (const category of categories) {
    const categoryProducts = products.filter((product) => product.category === category.name)
    if (categoryProducts.length === 0) continue

    for (let index = categoryProducts.length; index < 15; index += 1) {
      const base = categoryProducts[(index - categoryProducts.length) % categoryProducts.length]
      const variant = index + 1
      completed.push({
        ...base,
        id: `sp-${String(nextId).padStart(2, '0')}`,
        name: `${base.name} · Bộ sưu tập ${String(variant).padStart(2, '0')}`,
        price: base.price + ((variant % 7) + 1) * 5000,
        stock: Math.max(5, base.stock + (variant % 5) - 2),
        description: `${base.description} Phiên bản tuyển chọn ${variant}.`,
        rating: Math.max(4.2, Number((base.rating - (variant % 4) * 0.1).toFixed(1))),
        reviews: Math.max(3, base.reviews - (variant % 6) * 2),
        featured: false,
      })
      nextId += 1
    }
  }

  return completed
}

export const initialProducts = fillCategoryCatalog(baseProducts, initialCategories)

export const initialOrders: Order[] = [
  { id: 'DH-2408', customer: 'Nguyễn Minh Anh', email: 'minhanh@email.com', date: '2026-10-06', total: 970000, status: 'Chờ xác nhận', items: 2, giftNote: 'Chúc mừng tân gia, mong nhà mới luôn đầy ắp tiếng cười!', payment: 'Chuyển khoản QR' },
  { id: 'DH-2407', customer: 'Trần Hoàng Nam', email: 'nam.tran@email.com', date: '2026-10-06', total: 620000, status: 'Đang gói quà', items: 1, giftNote: 'Chúc em luôn tỏa sáng trên hành trình mới.', payment: 'COD' },
  { id: 'DH-2406', customer: 'Lê Thu Hà', email: 'thuha@email.com', date: '2026-10-05', total: 905000, status: 'Đang giao', items: 3, giftNote: '', payment: 'Chuyển khoản QR' },
  { id: 'DH-2405', customer: 'Phạm Gia Bảo', email: 'giabao@email.com', date: '2026-10-04', total: 350000, status: 'Đã giao', items: 1, giftNote: 'Gửi mẹ một chút nắng vàng Hội An.', payment: 'COD' },
  { id: 'DH-2404', customer: 'Vũ Ngọc Linh', email: 'linh.vu@email.com', date: '2026-10-03', total: 485000, status: 'Đã giao', items: 1, giftNote: '', payment: 'Chuyển khoản QR' },
  { id: 'DH-2403', customer: 'Đặng Quốc Huy', email: 'huy.dang@email.com', date: '2026-10-02', total: 410000, status: 'Đã hủy', items: 2, giftNote: '', payment: 'COD' },
]

export const initialCustomers: Customer[] = [
  { id: 'KH-101', name: 'Nguyễn Minh Anh', email: 'minhanh@email.com', phone: '090 321 4567', orders: 8, spent: 3240000, joined: '2025-06-12' },
  { id: 'KH-102', name: 'Trần Hoàng Nam', email: 'nam.tran@email.com', phone: '091 456 7890', orders: 5, spent: 2180000, joined: '2025-08-24' },
  { id: 'KH-103', name: 'Lê Thu Hà', email: 'thuha@email.com', phone: '093 222 1188', orders: 12, spent: 5680000, joined: '2025-02-03' },
  { id: 'KH-104', name: 'Phạm Gia Bảo', email: 'giabao@email.com', phone: '098 714 2255', orders: 3, spent: 985000, joined: '2026-01-18' },
  { id: 'KH-105', name: 'Vũ Ngọc Linh', email: 'linh.vu@email.com', phone: '097 338 4412', orders: 6, spent: 2710000, joined: '2025-11-09' },
]

export const initialAccounts: StoredAccount[] = [
  { id: 'admin-001', name: 'Mai Anh', email: 'admin@tiemnhamay.vn', password: 'NhaMay@2026', role: 'admin' },
]

export const revenueSeries = {
  '7 ngày': [
    { label: '30/09', revenue: 2650000 }, { label: '01/10', revenue: 3180000 }, { label: '02/10', revenue: 2290000 }, { label: '03/10', revenue: 4620000 }, { label: '04/10', revenue: 3870000 }, { label: '05/10', revenue: 5240000 }, { label: '06/10', revenue: 4680000 },
  ],
  '30 ngày': [
    { label: 'Tuần 1', revenue: 16800000 }, { label: 'Tuần 2', revenue: 22400000 }, { label: 'Tuần 3', revenue: 19500000 }, { label: 'Tuần 4', revenue: 31200000 },
  ],
  '3 tháng': [
    { label: 'Tháng 8', revenue: 62800000 }, { label: 'Tháng 9', revenue: 71400000 }, { label: 'Tháng 10', revenue: 88300000 },
  ],
  '12 tháng': [
    { label: 'T11', revenue: 42800000 }, { label: 'T12', revenue: 69700000 }, { label: 'T1', revenue: 55200000 }, { label: 'T2', revenue: 48600000 }, { label: 'T3', revenue: 71400000 }, { label: 'T4', revenue: 63800000 }, { label: 'T5', revenue: 82300000 }, { label: 'T6', revenue: 74600000 }, { label: 'T7', revenue: 96200000 }, { label: 'T8', revenue: 62800000 }, { label: 'T9', revenue: 71400000 }, { label: 'T10', revenue: 88300000 },
  ],
}