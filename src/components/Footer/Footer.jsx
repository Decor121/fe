import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'bot', text: 'Xin chào! Bạn cần Home Decor hỗ trợ thông tin gì hôm nay?' }
  ]);

  // Handle scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userMsg = { sender: 'user', text: chatMessage };
    setChatHistory((prev) => [...prev, userMsg]);
    setChatMessage('');

    // Simulate luxury bot response
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'Cảm ơn bạn đã quan tâm đến Home Decor. Yêu cầu của bạn đã được chuyển tới chuyên viên tư vấn. Chúng tôi sẽ liên hệ lại ngay qua email/số điện thoại của bạn.'
        }
      ]);
    }, 1000);
  };

  const supportLinks = [
    { label: 'Liên hệ', href: '#contact' },
    { label: 'Hệ thống cửa hàng', href: '#stores' },
    { label: 'Hướng dẫn bảo quản', href: '#care-guide' },
    { label: 'Chính sách đổi hàng', href: '#returns' },
    { label: 'Chính sách bảo hành', href: '#warranty' },
    { label: 'Chính sách giao hàng', href: '#delivery' },
    { label: 'FAQs', href: '#faqs' }
  ];

  const legalLinks = [
    { label: 'Điều khoản sử dụng', href: '#terms' },
    { label: 'Chính sách bảo vệ dữ liệu cá nhân', href: '#privacy' },
    { label: 'Chính sách Cookie', href: '#cookies' }
  ];

  const businessLinks = [
    { label: 'Khách hàng doanh nghiệp', href: '#b2b' }
  ];

  return (
    <footer className="w-full bg-[#f6f5f2] text-neutral-800 border-t border-neutral-200/60 pt-16 pb-12 relative font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 pb-16">

          {/* Logo & Company info - 4 cols */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="font-serif text-[42px] font-normal tracking-tight text-neutral-900 leading-none hover:opacity-80 transition-opacity">
              <img src="/homedecorbg.png" alt="Decor Logo" className="h-12 w-auto object-contain" />
            </Link>
            <div className="space-y-3 text-[12px] text-neutral-500 leading-relaxed font-normal pr-4">
              <p className="font-medium text-neutral-700">Công ty TNHH Home Decor</p>
              <p>Địa chỉ trụ sở chính: Tầng 6, Số nhà 21, ngõ 2, Lê Văn Hưu, Phường Hai Bà Trưng, Thành phố Hà Nội, Việt Nam</p>
              <p>MST: 0108062837</p>
              <p>Thương hiệu Home Decor được phân phối chính thức bởi Công ty Cổ phần Quốc tế Tam Sơn</p>
              <p>Giấy chứng nhận đăng ký kinh doanh số: 0101794983 do Sở Kế hoạch và Đầu tư thành phố Hà Nội cấp lần đầu ngày 07 tháng 10 năm 2005.</p>
            </div>
          </div>

          {/* Customer Support Links - 2 cols. */}
          <div className="lg:col-span-2 lg:pl-4">
            <h4 className="text-[11px] font-bold tracking-wider text-neutral-400 uppercase mb-5">
              Hỗ trợ khách hàng
            </h4>
            <ul className="space-y-3.5">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[13px] font-semibold text-neutral-800 hover:text-neutral-500 transition-colors duration-200 block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links - 2 cols */}
          <div className="lg:col-span-2 lg:pl-2">
            <h4 className="text-[11px] font-bold tracking-wider text-neutral-400 uppercase mb-5">
              Chính sách pháp lý
            </h4>
            <ul className="space-y-3.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[13px] font-semibold text-neutral-800 hover:text-neutral-500 transition-colors duration-200 block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Links - 2 cols */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-bold tracking-wider text-neutral-400 uppercase mb-5">
              Khách hàng doanh nghiệp
            </h4>
            <ul className="space-y-3.5">
              {businessLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[13px] font-semibold text-neutral-800 hover:text-neutral-500 transition-colors duration-200 block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials & Badge - 2 cols */}
          <div className="lg:col-span-2 flex flex-col items-start space-y-6 lg:items-end">

            {/* Social Icons */}
            <div className="flex items-center space-x-5">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-800 hover:text-neutral-500 hover:scale-110 transition-all duration-200"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-800 hover:text-neutral-500 hover:scale-110 transition-all duration-200"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-800 hover:text-neutral-500 hover:scale-110 transition-all duration-200"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.388.555a3.003 3.003 0 0 0-2.11 2.108C0 8.017 0 12 0 12s0 3.983.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.47 20.5 12 20.5 12 20.5s7.53 0 9.388-.555a3.003 3.003 0 0 0 2.11-2.108C24 15.983 24 12 24 12s0-3.983-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* Pinterest */}
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-800 hover:text-neutral-500 hover:scale-110 transition-all duration-200"
                aria-label="Pinterest"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </a>
            </div>

            {/* Ministry of Industry and Trade Badge SVG */}
            <a
              href="http://online.gov.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 focus:outline-none"
            >
              <svg
                viewBox="0 0 220 70"
                width="150"
                height="48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="hover:opacity-90 transition-opacity duration-200"
              >
                {/* Outer badge outline */}
                <rect x="2" y="2" width="216" height="66" rx="33" fill="#ffffff" stroke="#007bc3" strokeWidth="2.5" />
                {/* Blue pill background */}
                <rect x="7" y="7" width="206" height="56" rx="28" fill="#007bc3" />
                {/* Dotted stamp on the left */}
                <circle cx="36" cy="35" r="20" fill="#007bc3" stroke="white" strokeWidth="1.5" />
                <circle cx="36" cy="35" r="16" fill="none" stroke="white" strokeWidth="1" strokeDasharray="3 2" />
                <path d="M29 35L34 40L43 29" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                {/* Official Text */}
                <text x="126" y="30" fill="white" fontFamily="var(--font-display), sans-serif" fontSize="12" fontWeight="800" textAnchor="middle" letterSpacing="1.2">ĐÃ THÔNG BÁO</text>
                <text x="126" y="45" fill="white" fontFamily="var(--font-display), sans-serif" fontSize="10.5" fontWeight="800" textAnchor="middle" letterSpacing="0.6">BỘ CÔNG THƯƠNG</text>
              </svg>
            </a>

          </div>

        </div>

        {/* Bottom Copyright & Footer Note */}
        <div className="border-t border-neutral-300/40 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          <p>© {new Date().getFullYear()} Home Decor. Tất cả các quyền được bảo lưu.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-neutral-600 transition-colors">Chính sách bảo mật</a>
            <a href="#terms" className="hover:text-neutral-600 transition-colors">Điều khoản dịch vụ</a>
          </div>
        </div>

      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3.5">
        {/* Chat Widget Button */}
        <div className="relative group">
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="w-14 h-14 rounded-full bg-[#3c3a37] text-white flex items-center justify-center shadow-lg hover:bg-neutral-800 transition-all duration-300 cursor-pointer border border-neutral-700 hover:scale-105 active:scale-95"
            aria-label="Chat with Home Decor"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zm0 0h-.375M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>

          {/* Tooltip */}
          <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-neutral-900 text-white text-[11px] font-medium tracking-wide px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md">
            Liên hệ tư vấn
          </span>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          className={`w-14 h-14 rounded-full bg-white text-neutral-800 flex items-center justify-center shadow-lg hover:bg-neutral-50 transition-all duration-300 cursor-pointer border border-neutral-200 hover:scale-105 active:scale-95 ${showScrollTop ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-6 invisible'
            }`}
          aria-label="Back to Top"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* Floating Simulated Chat Dialog */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-[360px] bg-white border border-neutral-200 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300 font-sans">
          {/* Chat Header */}
          <div className="bg-[#3c3a37] text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-serif font-bold text-sm tracking-widest text-neutral-200">
                h
              </div>
              <div>
                <h5 className="text-[13px] font-bold tracking-wide">Home Decor Assistant</h5>
                <span className="text-[10px] text-neutral-300/80">Trực tuyến</span>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-neutral-300 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 h-[260px] overflow-y-auto bg-neutral-50 flex flex-col gap-3">
            {chatHistory.map((chat, idx) => (
              <div
                key={idx}
                className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${chat.sender === 'bot'
                  ? 'bg-white text-neutral-800 self-start shadow-sm border border-neutral-100 rounded-tl-none'
                  : 'bg-[#b08263] text-white self-end rounded-tr-none'
                  }`}
              >
                {chat.text}
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendChat} className="border-t border-neutral-100 p-3 bg-white flex gap-2">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Nhập tin nhắn..."
              className="flex-1 border border-neutral-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-[#b08263]"
            />
            <button
              type="submit"
              className="bg-[#3c3a37] text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-neutral-800 transition-colors"
            >
              Gửi
            </button>
          </form>
        </div>
      )}
    </footer>
  );
}

export default Footer;
