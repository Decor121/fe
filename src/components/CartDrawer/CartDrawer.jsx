import { useApp } from '../../context/AppContext';

function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQty,
    removeFromCart,
    clearCart
  } = useApp();

  if (!isCartOpen) return null;

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((acc, item) => {
      const price = item.product?.price || 0;
      return acc + price * item.quantity;
    }, 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    alert('Cảm ơn bạn đã đặt hàng! Hanoia sẽ liên hệ trực tiếp qua Email/Số điện thoại để xác nhận đơn hàng sớm nhất.');
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        {/* Drawer Panel */}
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 border-l border-neutral-100">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between">
            <h2 className="text-sm font-bold tracking-widest text-neutral-900 uppercase">
              Giỏ Hàng ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-neutral-400 hover:text-neutral-900 p-2 -mr-2 rounded-full hover:bg-neutral-50 transition-all cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 pt-12">
                <div className="w-16 h-16 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-300">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-neutral-800 font-semibold">Giỏ hàng trống</h3>
                  <p className="text-xs text-neutral-400 font-light mt-1.5 leading-relaxed">
                    Bạn chưa chọn tác phẩm nào. Khám phá các bộ sưu tập của Hanoia để lựa chọn sản phẩm phù hợp.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="border border-black text-[10px] tracking-widest font-semibold px-6 py-3 uppercase hover:bg-black hover:text-white transition-all cursor-pointer"
                >
                  Tiếp tục mua sắm
                </button>
              </div>
            ) : (
              cart.map((item, index) => {
                const product = item.product;
                if (!product) return null;
                return (
                  <div key={product._id || index} className="flex gap-4 border-b border-neutral-100 pb-6 items-start">
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-neutral-50 rounded-xl overflow-hidden border border-neutral-200/60 flex-shrink-0 flex items-center justify-center p-2">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                    </div>

                    {/* Product details */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-semibold text-neutral-800 uppercase tracking-wider truncate">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(product._id)}
                          className="text-neutral-400 hover:text-red-500 transition-colors p-1"
                          title="Xóa khỏi giỏ hàng"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>

                      <div className="text-[10px] text-neutral-500 font-light flex items-center gap-2">
                        <span>Mã: {product.code}</span>
                        {product.color && (
                          <>
                            <span>|</span>
                            <span>Màu: {product.color}</span>
                          </>
                        )}
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-neutral-200 rounded bg-neutral-50/50">
                          <button
                            onClick={() => updateCartQty(product._id, Math.max(1, item.quantity - 1))}
                            className="px-2.5 py-1 text-xs text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-all font-semibold cursor-pointer border-0 bg-transparent"
                          >
                            —
                          </button>
                          <span className="px-2 text-xs font-semibold text-neutral-800 w-6 text-center select-none">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQty(product._id, item.quantity + 1)}
                            className="px-2.5 py-1 text-xs text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-all font-semibold cursor-pointer border-0 bg-transparent"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-xs font-bold text-neutral-800">
                          {((product.price || 0) * item.quantity).toLocaleString('vi-VN')}₫
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Checkout details */}
          {cart.length > 0 && (
            <div className="px-6 py-6 border-t border-neutral-100 space-y-4 bg-neutral-50/30">
              <div className="flex justify-between items-baseline">
                <span className="text-xs uppercase tracking-widest font-semibold text-neutral-600">Tổng cộng</span>
                <span className="text-lg font-bold text-neutral-900">{calculateTotal().toLocaleString('vi-VN')}₫</span>
              </div>
              <p className="text-[10px] text-neutral-400 font-light leading-relaxed">
                * Thuế GTGT và chi phí vận chuyển sẽ được miễn phí toàn quốc theo chính sách Hanoia Luxury.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    if (confirm('Xác nhận xóa sạch giỏ hàng?')) clearCart();
                  }}
                  className="px-4 py-3.5 border border-neutral-200 text-xs font-semibold uppercase hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all tracking-wider text-neutral-500 bg-white cursor-pointer"
                >
                  Xóa hết
                </button>
                <button
                  onClick={handleCheckout}
                  className="flex-1 bg-black text-white hover:bg-[#b08263] text-xs font-semibold py-3.5 transition-all tracking-widest uppercase cursor-pointer border-0"
                >
                  Đặt hàng ngay
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default CartDrawer;
