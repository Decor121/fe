import { useState, useEffect } from 'react';

function NewArrivals() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [combos, setCombos] = useState([]);

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  useEffect(() => {
    const fetchCombos = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/combos');
        if (res.ok) {
          const data = await res.json();
          setCombos(data);
        }
      } catch (err) {
        console.error('Error fetching combos:', err);
      }
    };
    fetchCombos();
  }, []);



  return (
    <section className="py-20 lg:py-28 bg-white min-h-screen text-neutral-800 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <div className="text-center max-w-5xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#b08263]">
            Tuyển Tập Mới Nhất
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-light text-neutral-900 leading-tight">
            Combo Không Gian <span className="font-semibold italic text-[#b08263]">Nghệ Thuật</span>
          </h1>
          <p className="text-neutral-500 leading-relaxed font-light">
            Mở đầu BST FW26, Hanoia tập trung khai thác bảng sắc thái và hình dáng của thiên nhiên. Từ những sáng tạo mới đến các thiết kế biểu tượng, tất cả đều được 'tinh chỉnh' để khoác lên mình diện mạo hoàn toàn mới. Đây cũng là dịp Hanoia tái ngộ người nghệ sĩ đồng hành thân thiết, cùng ghi lại những chuyển động giàu năng lượng và thu trọn thần thái kiêu kỳ của các loài chim nhiệt đới. Thông qua những đường nét tối giản và thanh thoát, BST khơi gợi sự kết nối giữa tâm hồn con người với sức sống rạng rỡ của thế giới tự nhiên.          </p>
        </div>

        {/* Combos Loop */}
        <div className="space-y-24">
          {combos.map((combo, index) => (
            <div key={combo.id} className="space-y-12">
              {/* Intro Header */}
              <div className="text-center max-w-5xl mx-auto space-y-3">
                <span className="text-xs uppercase tracking-widest text-[#b08263] font-semibold">
                  {combo.label}
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-light text-neutral-900">
                  {combo.title}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed">
                  {combo.desc}
                </p>
              </div>

              {/* Combo Banner Image */}
              <div className="w-full bg-neutral-100 overflow-hidden shadow-sm relative group border border-neutral-200">
                <img
                  src={combo.bannerImage}
                  alt={combo.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>

              {/* Quote / Highlight */}
              <div className="text-center max-w-xl mx-auto">
                <p className="text-xs sm:text-sm text-neutral-500 italic font-light">
                  "{combo.quote}"
                </p>
              </div>

              {/* Products list below */}
              <div className="flex flex-wrap items-stretch justify-center gap-8 max-w-4xl mx-auto">
                {combo.products.map((product) => {
                  const isLiked = !!favorites[product.id];
                  return (
                    <div
                      key={product.id}
                      onClick={() => setSelectedProduct(product)}
                      className="group cursor-pointer space-y-4 w-full sm:w-[260px] flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        {/* Card Image Container */}
                        <div className="aspect-square w-full bg-neutral-50 border border-neutral-200/60 rounded-2xl overflow-hidden relative flex items-center justify-center p-6 hover:shadow-xl hover:shadow-neutral-100/50 hover:border-brand-500/20 transition-all duration-300">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 rounded-xl"
                          />
                          {/* Heart Icon Button */}
                          <button
                            onClick={(e) => toggleFavorite(product.id, e)}
                            className="absolute top-4 right-4 bg-white/90 hover:bg-white text-neutral-500 hover:text-red-500 p-2 rounded-full border border-neutral-100 shadow-sm transition-all z-10 cursor-pointer"
                            aria-label="Yêu thích"
                          >
                            <svg
                              className={`w-4 h-4 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-neutral-400'}`}
                              fill={isLiked ? 'currentColor' : 'none'}
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                              />
                            </svg>
                          </button>

                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                            <span className="text-[10px] tracking-wider uppercase bg-brand-500 text-white font-medium px-4 py-2 rounded shadow-md border border-brand-400/20">
                              Xem chi tiết
                            </span>
                          </div>
                        </div>

                        {/* Title */}
                        <div className="text-center px-2 space-y-1">
                          <h4 className="font-display font-medium text-xs tracking-wider uppercase text-neutral-800 group-hover:text-brand-600 transition-colors">
                            {product.name}
                          </h4>
                        </div>
                      </div>

                      <div className="text-center pt-2">
                        <p className="text-xs font-semibold text-brand-600">
                          {typeof product.price === 'number' ? `${product.price.toLocaleString('vi-VN')}₫` : product.price}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Separator */}
              {index < combos.length - 1 && (
                <div className="pt-12 border-b border-neutral-100 max-w-4xl mx-auto"></div>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
          <div className="bg-white border border-neutral-200 max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl relative grid grid-cols-1 md:grid-cols-2">

            {/* Modal Image */}
            <div className="h-72 md:h-full bg-neutral-100 relative">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 text-xs tracking-wider bg-brand-50 text-brand-700 px-3 py-1 rounded-full border border-brand-200/60">
                {selectedProduct.collection}
              </span>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">

              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 p-2 rounded-full transition-all cursor-pointer"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="space-y-4">
                <div>
                  <span className="text-xs uppercase tracking-widest text-brand-600 font-bold">
                    {selectedProduct.collection} Collection
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl text-neutral-900 font-medium mt-1">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-xl font-semibold text-brand-600 mt-2">
                    {typeof selectedProduct.price === 'number' ? `${selectedProduct.price.toLocaleString('vi-VN')}₫` : selectedProduct.price}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                  {selectedProduct.description}
                </p>

                {/* Specs */}
                <div className="space-y-2.5 pt-2 text-xs">
                  <div className="flex border-b border-neutral-200 pb-2">
                    <span className="text-neutral-500 w-24 shrink-0 font-medium">Chất liệu:</span>
                    <span className="text-neutral-800">{selectedProduct.material}</span>
                  </div>
                  <div className="flex border-b border-neutral-200 pb-2">
                    <span className="text-neutral-500 w-24 shrink-0 font-medium">Kích thước:</span>
                    <span className="text-neutral-800">{selectedProduct.size}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <a
                  href="#connect"
                  onClick={() => setSelectedProduct(null)}
                  className="flex-1 bg-brand-500 hover:bg-brand-600 text-white font-medium text-xs sm:text-sm text-center py-3.5 rounded-lg transition-all shadow-lg shadow-brand-500/10"
                >
                  Liên hệ Tư vấn
                </a>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="flex-1 bg-transparent hover:bg-neutral-50 text-neutral-600 border border-neutral-200 hover:text-neutral-900 font-medium text-xs sm:text-sm py-3.5 rounded-lg transition-all"
                >
                  Đóng lại
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}

export default NewArrivals;
