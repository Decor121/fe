import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : 'http://localhost:5000/api';

export function AppProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('decor_token') || null);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch current user and cart when token changes
  useEffect(() => {
    const loadUserAndCart = async () => {
      if (!token) {
        setUser(null);
        // Load guest cart from localStorage
        const localCart = localStorage.getItem('decor_guest_cart');
        setCart(localCart ? JSON.parse(localCart) : []);
        setLoading(false);
        return;
      }

      try {
        // Fetch cart from backend using token
        const res = await fetch(`${API_URL}/cart`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (res.ok) {
          const cartData = await res.json();
          setCart(cartData);

          // Re-fetch user profile from a status or similar, or just parse from JWT if we decode it.
          // For simplicity, we can load user data saved in localStorage, or verify/fetch it.
          const savedUser = localStorage.getItem('decor_user');
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          }
        } else {
          // Token expired or invalid
          logout();
        }
      } catch (err) {
        console.error('Error loading cart from backend:', err);
      } finally {
        setLoading(false);
      }
    };

    loadUserAndCart();
  }, [token]);

  // Sync guest cart to localStorage when it changes
  useEffect(() => {
    if (!token) {
      localStorage.setItem('decor_guest_cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('decor_guest_cart');
    }
  }, [cart, token]);

  const login = async (emailOrPhone, password) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrPhone, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Đăng nhập thất bại.');
      }
      console.log("123", data.token)
      localStorage.setItem('decor_token', data.token);
      localStorage.setItem('decor_user', JSON.stringify({
        id: data.user.id,
        fullName: data.user.fullName,
        emailOrPhone: data.user.emailOrPhone,
        role: data.user.role
      }));

      // Sync guest cart to backend if guest cart contains items
      const localCart = localStorage.getItem('decor_guest_cart');
      const guestItems = localCart ? JSON.parse(localCart) : [];

      setToken(data.token);
      setUser({
        id: data.user.id,
        fullName: data.user.fullName,
        emailOrPhone: data.user.emailOrPhone,
        role: data.user.role
      });

      if (guestItems.length > 0) {
        // Sequentially add guest items to DB cart
        for (const item of guestItems) {
          if (item.product && item.product._id) {
            await fetch(`${API_URL}/cart`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data.token}`
              },
              body: JSON.stringify({
                productId: item.product._id,
                quantity: item.quantity
              })
            });
          }
        }
        // Fetch updated cart from backend
        const cartRes = await fetch(`${API_URL}/cart`, {
          headers: { 'Authorization': `Bearer ${data.token}` }
        });
        if (cartRes.ok) {
          const finalCart = await cartRes.json();
          setCart(finalCart);
        }
      } else {
        setCart(data.user.cart || []);
      }

      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const register = async (fullName, emailOrPhone, password) => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, emailOrPhone, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Đăng ký thất bại.');
      }

      return { success: true, message: data.message };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('decor_token');
    localStorage.removeItem('decor_user');
    localStorage.removeItem('decor_guest_cart');
    setToken(null);
    setUser(null);
    setCart([]);
  };

  const addToCart = async (product, quantity = 1) => {
    if (token) {
      try {
        // Check if product is already in local cart to calculate updated quantity
        const existingItem = cart.find(item => item.product._id === product._id);
        const newQty = existingItem ? existingItem.quantity + quantity : quantity;

        const res = await fetch(`${API_URL}/cart`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ productId: product._id, quantity: newQty })
        });

        if (res.ok) {
          const updatedCart = await res.json();
          setCart(updatedCart);
        } else {
          const errData = await res.json();
          throw new Error(errData.error || 'Không thể thêm vào giỏ hàng.');
        }
      } catch (err) {
        console.error('Error adding to cart on backend:', err);
        alert(err.message);
      }
    } else {
      // Guest cart logic
      setCart(prev => {
        const idx = prev.findIndex(item => item.product._id === product._id);
        if (idx > -1) {
          const newCart = [...prev];
          newCart[idx].quantity += quantity;
          return newCart;
        } else {
          return [...prev, { product, quantity }];
        }
      });
    }
    // Show drawer automatically for modern/seamless feel!
    setIsCartOpen(true);
  };

  const updateCartQty = async (productId, quantity) => {
    if (quantity < 1) return;

    if (token) {
      try {
        const res = await fetch(`${API_URL}/cart`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ productId, quantity })
        });

        if (res.ok) {
          const updatedCart = await res.json();
          setCart(updatedCart);
        }
      } catch (err) {
        console.error('Error updating quantity:', err);
      }
    } else {
      setCart(prev =>
        prev.map(item =>
          item.product._id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = async (productId) => {
    if (token) {
      try {
        const res = await fetch(`${API_URL}/cart/${productId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (res.ok) {
          const updatedCart = await res.json();
          setCart(updatedCart);
        }
      } catch (err) {
        console.error('Error removing product:', err);
      }
    } else {
      setCart(prev => prev.filter(item => item.product._id !== productId));
    }
  };

  const clearCart = async () => {
    if (token) {
      try {
        const res = await fetch(`${API_URL}/cart`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (res.ok) {
          setCart([]);
        }
      } catch (err) {
        console.error('Error clearing cart:', err);
      }
    } else {
      setCart([]);
    }
  };

  return (
    <AppContext.Provider
      value={{
        token,
        user,
        cart,
        isCartOpen,
        setIsCartOpen,
        loading,
        login,
        register,
        logout,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
