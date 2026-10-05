import { ShoppingBag, ShoppingCart, ShieldCheck, UserCheck } from 'lucide-react';

export default function Navbar({ viewMode, setViewMode, cart, setIsCartOpen }) {
  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ShoppingBag className="text-blue-600" />
          <span className="text-xl font-bold text-gray-800">Toko Kita</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setViewMode(viewMode === 'customer' ? 'admin' : 'customer')}
            className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg border transition ${
              viewMode === 'admin' ? 'bg-purple-100 text-purple-700 border-purple-300' : 'bg-gray-100 text-gray-700 border-gray-300'
            }`}
          >
            {viewMode === 'admin' ? <ShieldCheck className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
            Mode: {viewMode === 'admin' ? 'Dashboard Admin' : 'Halaman Pelanggan'}
          </button>

          {viewMode === 'customer' && (
            <button onClick={() => setIsCartOpen(true)} className="relative p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cart.reduce((a, b) => a + b.qty, 0)}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
