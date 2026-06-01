import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

function Admin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ sales: 0, orders: 0, products: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [isDashboardLoading, setIsDashboardLoading] = useState(true);

  const { user, token, loading: isAuthLoading } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    // Wait for AppContext to finish checking local storage & token
    if (isAuthLoading) return;

    // Protect route
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/dashboard`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (res.ok) {
          const data = await res.json();
          setStats(data.stats);
          setRecentOrders(data.recentOrders);
          setInventory(data.inventory);
        } else {
          console.error('Failed to fetch dashboard data');
        }
      } catch (err) {
        console.error('Error fetching admin dashboard:', err);
      } finally {
        setIsDashboardLoading(false);
      }
    };

    fetchDashboardData();
  }, [user, navigate, token, isAuthLoading]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const navItems = [
    { name: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' }
  ];

  if (isAuthLoading || isDashboardLoading) {
    return <div className="min-h-screen bg-[#fcf9f8] flex items-center justify-center font-serif text-2xl text-neutral-900">Loading Dashboard...</div>;
  }

  // Double check user exists before rendering just in case
  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#fcf9f8] text-[#171717] font-sans flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-neutral-200 sticky top-0 z-20">
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-[#171717]">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Link to="/" className="font-serif text-xl font-normal tracking-tight">L'Art du Lacquer</Link>
        <div className="w-6"></div>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-neutral-200 z-40 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:flex flex-col`}>
        <div className="p-6 hidden md:flex items-center justify-center border-b border-neutral-200">
          <Link to="/" className="font-serif text-2xl font-normal tracking-tight">Home Decor</Link>
        </div>

        <div className="p-6 md:hidden flex items-center justify-between border-b border-neutral-200">
          <span className="font-serif text-xl tracking-tight">Menu</span>
          <button onClick={() => setIsSidebarOpen(false)} className="text-[#171717]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2">
          {navItems.map((item, index) => (
            <a
              key={item.name}
              href="#"
              className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors ${index === 0 ? 'bg-neutral-100 text-[#b08263]' : 'text-neutral-600 hover:bg-neutral-50 hover:text-[#171717]'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
              </svg>
              <span>{item.name}</span>
            </a>
          ))}
        </nav>

        <div className="p-4 border-t border-neutral-200">
          <Link to="/" className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-neutral-600 hover:text-[#171717] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Back to Store</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 lg:p-12 max-h-screen overflow-y-auto">
        <div className="mb-10">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight mb-4">Good morning, {user.fullName}</h1>
          <div className="w-16 h-px bg-[#b08263]"></div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 border border-neutral-200 flex flex-col justify-between">
            <div className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-4">Total Sales</div>
            <div className="flex items-baseline space-x-3">
              <div className="font-serif text-2xl md:text-3xl">{formatCurrency(stats.sales)}</div>
            </div>
          </div>

          <div className="bg-white p-6 border border-neutral-200 flex flex-col justify-between">
            <div className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-4">Total Orders</div>
            <div className="font-serif text-2xl md:text-3xl">{stats.orders}</div>
          </div>

          <div className="bg-white p-6 border border-neutral-200 flex flex-col justify-between">
            <div className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-4">Total Products</div>
            <div className="font-serif text-2xl md:text-3xl">{stats.products}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Recent Orders */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
              <h2 className="font-serif text-xl tracking-tight">Recent Orders</h2>
              <a href="#" className="text-xs font-semibold tracking-widest uppercase text-[#b08263] hover:text-[#8a654c] transition-colors">View All</a>
            </div>
            <div className="bg-white border border-neutral-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50/50">
                    <th className="py-4 px-6 text-xs font-semibold tracking-widest text-neutral-500 uppercase">Order</th>
                    <th className="py-4 px-6 text-xs font-semibold tracking-widest text-neutral-500 uppercase">Customer</th>
                    <th className="py-4 px-6 text-xs font-semibold tracking-widest text-neutral-500 uppercase">Status</th>
                    <th className="py-4 px-6 text-xs font-semibold tracking-widest text-neutral-500 uppercase text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.length === 0 ? (
                    <tr><td colSpan="4" className="py-4 px-6 text-sm text-center text-neutral-500">No recent orders</td></tr>
                  ) : (
                    recentOrders.map((order, index) => (
                      <tr key={index} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors">
                        <td className="py-4 px-6 text-sm font-medium">{order.id}</td>
                        <td className="py-4 px-6 text-sm text-neutral-600">{order.customer}</td>
                        <td className="py-4 px-6 text-sm">
                          <span className={`inline-block px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase ${order.status === 'Shipped' || order.status === 'Delivered' ? 'bg-[#f0ece9] text-[#b08263]' :
                            order.status === 'Pending' ? 'bg-amber-50 text-amber-700' : 'bg-neutral-100 text-neutral-600'
                            }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-sm font-medium text-right">{formatCurrency(order.amount)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Inventory */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
              <h2 className="font-serif text-xl tracking-tight">Inventory</h2>
            </div>
            <div className="bg-white border border-neutral-200 p-6 space-y-6">
              {inventory.length === 0 ? (
                <div className="text-sm text-neutral-500 text-center">No products found</div>
              ) : (
                inventory.map((item, index) => (
                  <div key={index} className="flex justify-between items-start space-x-4 border-b border-neutral-100 last:border-0 pb-4 last:pb-0">
                    <div>
                      <h3 className="text-sm font-medium leading-snug mb-1 text-[#171717] truncate max-w-[150px]" title={item.name}>{item.name}</h3>
                      <div className="text-[11px] font-semibold tracking-wider uppercase text-neutral-500">
                        Stock: {item.stock}
                      </div>
                    </div>
                    <span className={`flex-shrink-0 inline-block px-2 py-1 text-[10px] font-semibold tracking-wider uppercase text-center ${item.status === 'Low Stock' ? 'text-red-600 bg-red-50' :
                      item.status === 'High Demand' ? 'text-[#b08263] bg-[#f0ece9]' : 'text-neutral-500 bg-neutral-100'
                      }`}>
                      {item.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

export default Admin;
