import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import CartDrawer from '../CartDrawer/CartDrawer';

function Header() {
  const { cart, user, logout, setIsCartOpen } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { label: 'HÀNG MỚI', link: '/hang-moi', isRoute: true },
    { label: 'TRANG TRÍ NHÀ', link: '/trang-tri-nha', isRoute: true },
    { label: 'CÂU CHUYỆN HANOIA', link: '/cau-chuyen', isRoute: true }
  ];

  return (
    <header className="w-full bg-white text-black border-b border-neutral-100 sticky top-0 z-50">
      {/* Top Banner (Optional for luxury announcement feel) */}
      <div className="bg-black text-white text-[10px] tracking-widest text-center py-2 uppercase font-medium">
        Free shipping on orders over 2.000.000đ | Miễn phí vận chuyển toàn quốc
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="font-serif text-3xl font-normal tracking-tight hover:opacity-80 transition-opacity">
              hanoia
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              item.isRoute ? (
                <Link
                  key={item.label}
                  to={item.link}
                  className="text-xs font-semibold tracking-widest text-neutral-800 hover:text-black transition-colors relative py-2 group uppercase"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.link}
                  className="text-xs font-semibold tracking-widest text-neutral-800 hover:text-black transition-colors relative py-2 group uppercase"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              )
            ))}
            {user?.role === 'admin' && (
              <Link
                key={4}
                to={"/admin"}
                className="text-xs font-semibold tracking-widest text-neutral-800 hover:text-black transition-colors relative py-2 group uppercase"
              >
                ADMIN
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            )}
          </nav>

          {/* Right Controls */}
          <div className="hidden md:flex items-center space-x-6">

            {/* Login / User Status */}
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-xs font-medium text-neutral-600">
                  Xin chào, <span className="font-bold text-neutral-900">{user.fullName}</span>
                </span>
                <button
                  onClick={logout}
                  className="border border-neutral-300 hover:border-black text-[10px] tracking-widest px-3.5 py-2 transition-all uppercase cursor-pointer text-neutral-600 hover:text-black font-semibold bg-white"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="border border-black text-xs font-semibold tracking-widest px-5 py-2.5 hover:bg-black hover:text-white transition-all duration-300 uppercase"
              >
                Đăng nhập
              </Link>
            )}

            {/* Cart Icon & Count */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center space-x-2 text-neutral-700 hover:text-black transition-colors group p-2 cursor-pointer bg-transparent border-0"
            >
              <svg className="w-5 h-5 transition-transform group-hover:scale-105" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <span className="text-xs font-semibold tracking-wider">({cartCount})</span>
            </button>

          </div>

          {/* Hamburger Menu Button - Mobile */}
          <div className="flex items-center lg:hidden space-x-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center text-neutral-700 p-2 cursor-pointer bg-transparent border-0"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <span className="text-xs font-semibold ml-1">({cartCount})</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-neutral-700 hover:text-black p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-neutral-100 px-4 pt-4 pb-6 space-y-3">
          {navItems.map((item) => (
            item.isRoute ? (
              <Link
                key={item.label}
                to={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-xs font-semibold tracking-wider py-2 text-neutral-800 hover:text-black uppercase"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-xs font-semibold tracking-wider py-2 text-neutral-800 hover:text-black uppercase"
              >
                {item.label}
              </a>
            )
          ))}
          <div className="border-t border-neutral-100 pt-4 flex flex-col space-y-4">
            {user ? (
              <div className="flex flex-col space-y-2 px-2">
                <span className="text-xs font-medium text-neutral-600">
                  Xin chào, <span className="font-bold text-neutral-800">{user.fullName}</span>
                </span>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-center border border-neutral-300 text-xs font-semibold tracking-widest py-3 hover:border-black transition-colors uppercase cursor-pointer bg-white"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center border border-black text-xs font-semibold tracking-widest py-3 hover:bg-black hover:text-white transition-colors uppercase"
              >
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Sliding Cart Drawer Component */}
      <CartDrawer />
    </header>
  );
}

export default Header;
