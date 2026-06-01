import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [backendStatus, setBackendStatus] = useState('connecting');
  const [dbStatus, setDbStatus] = useState('checking');
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState('');
  const [topProducts, setTopProducts] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    // Check backend status
    fetch(`${API_URL}/api/status`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          setBackendStatus('online');
          if (data.message && data.message.includes('Database offline')) {
            setDbStatus('offline');
          } else {
            setDbStatus('online');
          }
        }
      })
      .catch((err) => {
        console.error(err);
        setDbStatus('offline');
      });

    // Fetch top selling products
    fetch(`${API_URL}/api/products?sortBy=bestSelling&limit=4`)
      .then(res => res.json())
      .then(data => setTopProducts(data))
      .catch(err => console.error('Error fetching top products:', err));
  }, [API_URL]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('sending');
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        fetchMessages();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${API_URL}/api/messages`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    if (backendStatus === 'online') {
      fetchMessages();
    }
  }, [backendStatus]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32 bg-white text-neutral-800 border-b border-neutral-200/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#b08263]">
                Premium Interior Architecture
              </span>
              <h1 className="font-display text-5xl md:text-6xl font-light tracking-tight text-neutral-900 leading-tight">
                Crafting <span className="font-semibold italic text-[#b08263]">Timeless</span> Spaces.
              </h1>
              <p className="text-lg text-neutral-600 font-light leading-relaxed max-w-xl">
                We design bespoke living environments that merge functional minimalist structures with warm organic textures. Experience the art of decoration.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/trang-tri-nha"
                className="bg-black text-white font-medium px-8 py-4 rounded-lg hover:bg-neutral-800 transition-all shadow-lg hover:-translate-y-0.5 active:translate-y-0 uppercase text-xs tracking-widest flex items-center justify-center"
              >
                Trang trí nhà
              </Link>
              <Link
                to="/cau-chuyen"
                className="bg-white text-neutral-800 border border-neutral-300 font-medium px-8 py-4 rounded-lg hover:bg-neutral-50 transition-all hover:-translate-y-0.5 active:translate-y-0 uppercase text-xs tracking-widest flex items-center justify-center"
              >
                Câu chuyện
              </Link>
            </div>

            <div className="pt-8 border-t border-neutral-200 grid grid-cols-3 gap-6">
              <div>
                <p className="font-display text-3xl font-semibold text-neutral-900">400+</p>
                <p className="text-xs text-neutral-500 uppercase tracking-wider">Curated Designs</p>
              </div>
              <div>
                <p className="font-display text-3xl font-semibold text-neutral-900">12+</p>
                <p className="text-xs text-neutral-500 uppercase tracking-wider">Design Awards</p>
              </div>
              <div>
                <p className="font-display text-3xl font-semibold text-neutral-900">100%</p>
                <p className="text-xs text-neutral-500 uppercase tracking-wider">Bespoke Quality</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#b08263]/10 to-transparent rounded-2xl filter blur-3xl -z-10"></div>
            <div className="border border-neutral-200 p-2 rounded-2xl bg-neutral-50/50 shadow-2xl relative overflow-hidden group">
              <img
                src="/hero.png"
                alt="Luxury Minimalist Interior Design"
                className="rounded-xl w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-xl border border-neutral-200/80 transition-all duration-300">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-display font-medium text-neutral-900 text-lg">The Sandstone Lounge</h3>
                    <p className="text-sm text-neutral-500">Milan Collection, 2026</p>
                  </div>
                  <span className="text-xs bg-[#b08263]/10 text-[#b08263] px-3 py-1 rounded-full border border-[#b08263]/25">
                    Featured Space
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spaces Grid */}
      <section id="collections" className="py-24 w-full bg-white text-neutral-800 border-b border-neutral-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#b08263]">Portfolio</span>
            <h2 className="font-display text-4xl font-light text-neutral-900">Tailored Living Concepts</h2>
            <p className="text-neutral-600">
              A showcase of modern rooms emphasizing spatial harmony, custom wooden detailing, and premium material accents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {topProducts.length > 0 ? (
              topProducts.map((item, idx) => (
                <Link
                  key={idx}
                  to="/trang-tri-nha"
                  state={{ selectedProduct: item }}
                  className="border border-neutral-200 bg-[#fafafa] rounded-xl p-6 hover:border-[#b08263]/50 hover:bg-white hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 cursor-pointer block"
                >
                  <div className="h-48 w-full bg-neutral-100 rounded-lg mb-6 flex items-center justify-center border border-neutral-200/50 overflow-hidden relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div className="pr-2">
                      <h4 className="font-medium text-neutral-900 text-sm sm:text-base line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-neutral-500 mt-1">{item.price.toLocaleString('vi-VN')}đ</p>
                    </div>
                    <span className="text-[10px] text-[#b08263] bg-[#b08263]/10 px-2 py-0.5 rounded border border-[#b08263]/20 whitespace-nowrap">
                      Đã bán: {item.sold}
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              // Loading placeholders
              [1, 2, 3, 4].map((_, idx) => (
                <div key={idx} className="border border-neutral-200 bg-[#fafafa] rounded-xl p-6 animate-pulse">
                  <div className="h-48 w-full bg-neutral-200 rounded-lg mb-6"></div>
                  <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-neutral-200 rounded w-1/2"></div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
