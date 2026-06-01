import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

function Login() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'bot', text: 'Xin chào! Home Decor có thể giúp gì cho bạn?' }
  ]);

  const navigate = useNavigate();
  const { login } = useApp();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!emailOrPhone || !password) {
      setError('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    setLoading(true);

    const result = await login(emailOrPhone, password);
    setLoading(false);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Đăng nhập thất bại.');
    }
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    setChatHistory((prev) => [...prev, { sender: 'user', text: chatMessage }]);
    setChatMessage('');

    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        { sender: 'bot', text: 'Cảm ơn bạn. Yêu cầu hỗ trợ đăng nhập của bạn đã được ghi nhận.' }
      ]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#efefef] flex flex-col font-sans text-neutral-800 relative selection:bg-brand-500 selection:text-white">

      {/* Minimal Header */}
      <header className="w-full bg-white h-20 flex items-center justify-center border-b border-neutral-200/50">
        <Link to="/" className="font-serif text-3xl font-normal tracking-tight text-neutral-900 hover:opacity-85 transition-opacity">
          Home Decor
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[420px] bg-white p-8 md:p-10 shadow-[0_4px_25px_rgba(0,0,0,0.04)] rounded-none border border-neutral-200/40">

          <h2 className="text-[17px] font-bold text-center text-neutral-800 tracking-wider uppercase mb-8 font-sans">
            Khách hàng đã có tài khoản
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="text-xs text-red-500 bg-red-50 border border-red-100 p-3 text-center">
                {error}
              </div>
            )}

            {/* Email/Phone Input */}
            <div className="relative">
              <input
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="Email/Số điện thoại *"
                className="w-full bg-white border border-neutral-300 px-4 py-3.5 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-neutral-800 transition-colors"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mật khẩu *"
                className="w-full bg-white border border-neutral-300 px-4 py-3.5 pr-10 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-neutral-800 transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-800 focus:outline-none cursor-pointer"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  // Eye Slash Icon
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.824 7.824L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  // Eye Icon
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.43 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white hover:bg-neutral-800 text-xs font-semibold tracking-widest py-4 transition-all uppercase cursor-pointer disabled:bg-neutral-400 disabled:cursor-not-allowed"
              >
                {loading ? 'ĐANG XỬ LÝ...' : 'ĐĂNG NHẬP'}
              </button>
            </div>

            {/* Register Link */}
            <div className="text-center pt-2">
              <Link
                to="/register"
                className="text-xs font-bold text-neutral-800 tracking-wider hover:underline"
              >
                TẠO TÀI KHOẢN
              </Link>
            </div>
          </form>

        </div>
      </main>

      {/* Floating Chat Widget */}
      <div className="absolute bottom-6 right-6 z-50">
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-14 h-14 rounded-full bg-[#3c3a37] text-white flex items-center justify-center shadow-lg hover:bg-neutral-800 transition-all duration-300 cursor-pointer border border-neutral-700 hover:scale-105 active:scale-95"
          aria-label="Chat with Home Decor"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0zm0 0h-.375M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      </div>

      {/* Floating Simulated Chat Dialog */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-[360px] bg-white border border-neutral-200 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
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

    </div>
  );
}

export default Login;
