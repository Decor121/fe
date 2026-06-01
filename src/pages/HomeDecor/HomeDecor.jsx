import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

function HomeDecor() {
  const { addToCart } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [items, setItems] = useState([]);

  // Selected product detail view state
  const [selectedProduct, setSelectedProduct] = useState(location.state?.selectedProduct || null);

  useEffect(() => {
    if (location.state?.selectedProduct) {
      setSelectedProduct(location.state.selectedProduct);
      // Clear state so refreshing the page doesn't re-open the product
      navigate('.', { replace: true, state: {} });
    }
  }, [location.state?.selectedProduct, navigate]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('desc');
  const [liked, setLiked] = useState(false);

  const categories = [
    { id: 'All', label: 'Tất cả sản phẩm' },
    { id: 'trays', label: 'Khay & Hộp' },
    { id: 'vases', label: 'Bình hoa sơn mài' },
    { id: 'paintings', label: 'Tranh sơn mài' },
    { id: 'objects', label: 'Đồ trưng bày' }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products?category=${activeCategory}&sortBy=${sortBy}`);
        if (res.ok) {
          const data = await res.json();
          setItems(data);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, [activeCategory, sortBy]);

  const sortedItems = items;

  if (selectedProduct) {
    const item = selectedProduct;
    return (
      <section className="py-20 lg:py-28 bg-white min-h-screen text-neutral-800 border-b border-neutral-100 animate-in fade-in duration-500">
        <div className="max-w-7xl mx-auto px-6">

          {/* Back button & Breadcrumbs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <button
              onClick={() => {
                setSelectedProduct(null);
                setActiveImageIndex(0);
                setQuantity(1);
                setLiked(false);
              }}
              className="flex items-center gap-2 text-xs font-semibold text-[#b08263] hover:text-brand-700 transition-colors uppercase tracking-widest cursor-pointer bg-transparent border-0 outline-none"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Quay lại danh sách
            </button>

            {/* Breadcrumbs */}
            <div className="text-xs uppercase tracking-widest text-neutral-400 font-light flex flex-wrap items-center gap-1.5">
              <span className="cursor-pointer hover:text-neutral-800" onClick={() => setSelectedProduct(null)}>Trang Chủ</span>
              <span>/</span>
              <span className="cursor-pointer hover:text-neutral-800" onClick={() => setSelectedProduct(null)}>Trang Trí Nhà</span>
              <span>/</span>
              <span className="text-neutral-800 font-medium">{item.name}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left Column: Images */}
            <div className="space-y-6">
              {/* Main Image */}
              <div className="w-full aspect-[4/3] sm:aspect-square bg-neutral-50 border border-neutral-200/60 rounded-2xl overflow-hidden relative flex items-center justify-center p-8">
                <img
                  src={item.images ? item.images[activeImageIndex] : item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              {/* Gallery Thumbnails */}
              {item.images && item.images.length > 0 && (
                <div className="flex gap-4">
                  {item.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-20 h-20 bg-neutral-50 rounded-xl overflow-hidden border transition-all cursor-pointer ${activeImageIndex === idx ? 'border-[#b08263] ring-1 ring-[#b08263]/30' : 'border-neutral-200 hover:border-neutral-400'
                        }`}
                    >
                      <img src={img} alt={`${item.name} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Info */}
            <div className="space-y-8">
              {/* Title & Collection */}
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#b08263]">
                  {item.label} Collection
                </span>
                <h1 className="font-display text-3xl sm:text-4xl font-light text-neutral-900 leading-tight tracking-wide uppercase">
                  {item.name}
                </h1>
                <p className="text-2xl font-semibold text-neutral-900 pt-2">
                  {item.price.toLocaleString('vi-VN')} ₫
                </p>
              </div>

              {/* Specs block */}
              <div className="space-y-4 pt-4 border-t border-neutral-100 text-sm">
                <div className="text-neutral-500 font-light text-xs">
                  Mã sản phẩm: <span className="font-medium text-neutral-800">{item.code}</span>
                </div>

                {/* Color Swatch */}
                <div className="space-y-2">
                  <div className="text-xs text-neutral-500 font-light uppercase tracking-wider">
                    Màu sắc: <span className="font-semibold text-neutral-800">{item.color}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="w-8 h-8 rounded border-2 border-[#b08263] p-0.5 shadow-sm transition-all focus:outline-none cursor-pointer"
                      style={{ backgroundColor: item.colorHex }}
                      title={item.color}
                    />
                  </div>
                </div>
              </div>

              {/* Quantity selector & Actions */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                {/* Selector */}
                <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden bg-neutral-50/50">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-4 py-2.5 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 font-medium transition-all cursor-pointer bg-transparent border-0"
                  >
                    —
                  </button>
                  <span className="px-5 text-neutral-800 font-medium text-sm w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-4 py-2.5 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 font-medium transition-all cursor-pointer bg-transparent border-0"
                  >
                    +
                  </button>
                </div>

                {/* Share & Like icons */}
                <div className="flex items-center gap-4">
                  {/* Share button */}
                  <button
                    onClick={() => alert('Đã sao chép liên kết sản phẩm!')}
                    className="w-10 h-10 border border-neutral-200 hover:border-brand-500 rounded-full flex items-center justify-center text-neutral-500 hover:text-brand-600 transition-all cursor-pointer bg-white"
                    title="Chia sẻ"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 10.742l4.636-2.318M8.684 13.258l4.636 2.318m-4.636-1.136a3 3 0 11-6 0 3 3 0 016 0zm10.789-5.111a3 3 0 11-6 0 3 3 0 016 0zm0 10.222a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                  {/* Heart button */}
                  <button
                    onClick={() => setLiked(!liked)}
                    className="w-10 h-10 border border-neutral-200 hover:border-brand-500 rounded-full flex items-center justify-center transition-all cursor-pointer bg-white"
                    title="Yêu thích"
                  >
                    <svg className={`w-4 h-4 ${liked ? 'fill-red-500 text-red-500' : 'text-neutral-500 hover:text-red-500'}`} fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Add to Cart button */}
              <div className="pt-2">
                <button
                  onClick={() => addToCart(item, quantity)}
                  className="w-full bg-neutral-900 hover:bg-[#b08263] text-white font-medium text-sm py-4 rounded-xl transition-all shadow-md tracking-widest uppercase cursor-pointer border-0"
                >
                  Thêm vào giỏ hàng
                </button>
              </div>

              {/* Mini Details block */}
              <div className="pt-6 border-t border-neutral-100 space-y-3">
                <h3 className="font-display font-semibold text-neutral-900 text-sm tracking-widest uppercase">
                  Chi tiết
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed">
                  {item.details}
                </p>
                <div className="text-xs text-neutral-600 font-light">
                  Kích cỡ: <span className="font-normal text-neutral-800">{item.dimensions}</span>
                </div>
              </div>

            </div>

          </div>

          {/* Full Width Tabs Section */}
          <div className="mt-20 border-t border-neutral-200 pt-10">
            {/* Tabs Headers */}
            <div className="flex border-b border-neutral-200">
              <button
                onClick={() => setActiveTab('desc')}
                className={`pb-4 px-6 text-sm font-medium tracking-wide border-b-2 transition-all cursor-pointer bg-transparent border-t-0 border-x-0 ${activeTab === 'desc' ? 'border-[#b08263] text-neutral-900' : 'border-transparent text-neutral-400 hover:text-neutral-600'
                  }`}
              >
                Mô tả sản phẩm
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-4 px-6 text-sm font-medium tracking-wide border-b-2 transition-all cursor-pointer bg-transparent border-t-0 border-x-0 ${activeTab === 'specs' ? 'border-[#b08263] text-neutral-900' : 'border-transparent text-neutral-400 hover:text-neutral-600'
                  }`}
              >
                Đặc điểm
              </button>
            </div>

            {/* Tabs Contents */}
            <div className="py-8 max-w-4xl">
              {activeTab === 'desc' ? (
                <div className="space-y-4 text-xs sm:text-sm text-neutral-500 font-light leading-relaxed">
                  <p>{item.descriptionLong}</p>
                  <div className="text-neutral-400 pt-2 font-normal">
                    Reference: <span className="text-neutral-700">{item.code}</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-xs sm:text-sm text-neutral-500 font-light leading-relaxed">
                  <ul className="list-disc pl-5 space-y-2">
                    {item.characteristics.split(';').map((char, index) => (
                      <li key={index} className="text-neutral-600">
                        {char.trim()}
                      </li>
                    ))}
                    <li className="text-neutral-600">
                      Chất liệu chế tác: {item.material}
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>
    );
  }

  return (
    <section className="py-20 lg:py-28 bg-white min-h-screen text-neutral-800 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
            Không gian sống nghệ thuật
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-light text-neutral-900 leading-tight">
            Trang Trí <span className="font-semibold italic text-[#b08263]">Không Gian</span>
          </h1>
          <p className="text-neutral-500 leading-relaxed">
            Thổi hồn di sản sơn mài vào từng ngóc ngách của căn nhà. Mỗi thiết kế là một tác phẩm nghệ thuật sang trọng giúp khẳng định gu thẩm mỹ độc tôn của gia chủ.
          </p>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12 border-b border-neutral-200/70 pb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${activeCategory === cat.id
                ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/10'
                : 'bg-neutral-50 text-neutral-600 border border-neutral-200 hover:text-black hover:bg-neutral-100'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Controls Row: Results count & Sorting */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 text-sm border-b border-neutral-100 pb-6">
          <div className="text-neutral-500 font-light">
            Hiển thị <span className="font-semibold text-neutral-900">{sortedItems.length}</span> tác phẩm
          </div>
          <div className="flex items-center gap-3">
            <span className="text-neutral-400 font-light text-xs sm:text-sm">Sắp xếp:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-neutral-50 hover:bg-neutral-100/50 border border-neutral-200 text-neutral-800 pl-4 pr-10 py-2 rounded-lg text-xs font-medium cursor-pointer focus:outline-none focus:border-brand-500 transition-all"
              >
                <option value="newest">Mới nhất</option>
                <option value="priceAsc">Giá tăng dần</option>
                <option value="priceDesc">Giá giảm dần</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-500">
                <svg className="fill-current h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedItems.map((item) => (
            <div
              key={item.id}
              className="border border-neutral-200 bg-white rounded-2xl overflow-hidden hover:border-brand-500/40 hover:shadow-xl hover:shadow-neutral-100/50 transition-all duration-500 group flex flex-col justify-between"
            >
              <div>
                {/* Image aspect-square */}
                <div className="h-72 w-full bg-neutral-100 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                  <span className="absolute bottom-4 left-4 text-[10px] font-semibold uppercase tracking-wider bg-brand-500 text-white px-2.5 py-1 rounded shadow-md">
                    {item.label}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <h4 className="font-display font-medium text-neutral-900 text-lg tracking-wide group-hover:text-brand-600 transition-colors">
                      {item.name}
                    </h4>
                    <span className="text-sm font-semibold text-brand-600 whitespace-nowrap pt-0.5">
                      {item.price.toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 mt-2">
                <button
                  onClick={() => {
                    setSelectedProduct(item);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full inline-block text-center border border-neutral-200 hover:border-brand-500 text-neutral-600 hover:text-brand-600 hover:bg-brand-50/20 font-medium text-xs py-3 rounded-lg transition-all cursor-pointer bg-transparent"
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-24 p-8 sm:p-12 rounded-3xl border border-neutral-200 bg-gradient-to-tr from-brand-50/40 via-neutral-50 to-neutral-50 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full filter blur-3xl -z-10"></div>
          <div className="space-y-3 max-w-xl text-center lg:text-left">
            <h3 className="font-display text-2xl sm:text-3xl text-neutral-900 font-light">
              Thiết Kế Không Gian <span className="font-semibold italic text-brand-600">Theo Yêu Cầu</span>
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-light">
              Home Decors cung cấp dịch vụ đo đạc, phác thảo 3D và chế tác sơn mài đo ni đóng giày phù hợp với từng phong cách kiến trúc đẳng cấp.
            </p>
          </div>
          <a
            href="#connect"
            className="bg-brand-500 hover:bg-brand-600 text-white font-medium px-8 py-4 rounded-xl transition-all shadow-lg shadow-brand-500/10 shrink-0 text-sm"
          >
            Đăng ký Khảo sát
          </a>
        </div>

      </div>
    </section>
  );
}

export default HomeDecor;
