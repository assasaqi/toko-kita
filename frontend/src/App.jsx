import { useEffect, useState } from 'react';
import axiosClient from './api/axiosClient';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import InvoiceModal from './components/InvoiceModal';
import CustomerPage from './pages/CustomerPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';

export default function App() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [invoice, setInvoice] = useState(null);
  const [viewMode, setViewMode] = useState('customer');

  // State untuk mengecek apakah admin sudah login (melihat ada tidaknya token)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(!!localStorage.getItem('token'));

  // Fetch Produk (Publik)
  const fetchProducts = () => {
    setLoading(true);
    axiosClient.get('/products')
      .then((res) => { setProducts(res.data); setLoading(false); })
      .catch((err) => { console.error('Gagal mengambil produk:', err); setLoading(false); });
  };

  // Fetch Orders (Hanya berjalan jika admin sudah login)
  const fetchOrders = () => {
    if (isAdminLoggedIn) {
      axiosClient.get('/orders')
        .then((res) => setOrders(res.data))
        .catch((err) => {
          console.error('Gagal mengambil pesanan:', err);
          if (err.response?.status === 401 || err.response?.status === 403) {
            // Jika token kadaluarsa, otomatis logout
            localStorage.removeItem('token');
            setIsAdminLoggedIn(false);
          }
        });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Trigger ulang fetchOrders setiap kali status login atau viewMode berubah
  useEffect(() => {
    if (isAdminLoggedIn && viewMode === 'admin') {
      fetchOrders();
    }
  }, [isAdminLoggedIn, viewMode]);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) setCart(cart.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    else setCart([...cart, { ...product, qty: 1 }]);
  };

  const removeFromCart = (id) => setCart(cart.filter((item) => item.id !== id));
  const totalBelanja = cart.reduce((acc, item) => acc + item.harga * item.qty, 0);

  // Checkout pesanan (Publik)
  const handleCheckout = () => {
    if (cart.length === 0) return alert('Keranjang Anda kosong!');
    axiosClient.post('/orders', { items: cart, totalHarga: totalBelanja })
      .then((res) => {
        setInvoice({
          orderId: res.data.order.id,
          items: [...cart],
          totalHarga: totalBelanja,
          date: new Date().toLocaleString('id-ID'),
          status: res.data.order.statusBayar
        });
        setCart([]);
        setIsCartOpen(false);
        fetchProducts();
        if (isAdminLoggedIn) fetchOrders(); // Update dashboard admin jika sedang login
      })
      .catch(() => alert('Terjadi kesalahan saat memproses checkout.'));
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    axiosClient.patch(`/orders/${orderId}/status`, { statusBayar: newStatus })
      .then(() => fetchOrders())
      .catch((err) => console.error('Gagal mengubah status:', err));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar viewMode={viewMode} setViewMode={setViewMode} cart={cart} setIsCartOpen={setIsCartOpen} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {viewMode === 'customer' ? (
          // Tampilan Halaman Pelanggan
          <CustomerPage products={products} loading={loading} addToCart={addToCart} />
        ) : (
          // Logika Tampilan Admin
          !isAdminLoggedIn ? (
            <LoginPage setIsAdminLoggedIn={setIsAdminLoggedIn} />
          ) : (
            <AdminPage
              products={products}
              orders={orders}
              fetchProducts={fetchProducts}
              fetchOrders={fetchOrders}
              handleUpdateStatus={handleUpdateStatus}
              setIsAdminLoggedIn={setIsAdminLoggedIn}
            />
          )
        )}
      </main>

      <CartDrawer
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        cart={cart}
        removeFromCart={removeFromCart}
        totalBelanja={totalBelanja}
        handleCheckout={handleCheckout}
      />
      <InvoiceModal invoice={invoice} setInvoice={setInvoice} />
    </div>
  );
}
