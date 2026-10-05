import { ShoppingCart, Trash2 } from 'lucide-react';

export default function CartDrawer({ isCartOpen, setIsCartOpen, cart, removeFromCart, totalBelanja, handleCheckout }) {
  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full p-6 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2"><ShoppingCart /> Keranjang Saya</h2>
            <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
          </div>
          {cart.length === 0 ? <p className="text-gray-400 text-center py-8">Keranjang kosong.</p> : (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b pb-3">
                  <div>
                    <h4 className="font-semibold">{item.nama}</h4>
                    <p className="text-sm text-gray-500">{item.qty} x Rp {item.harga.toLocaleString('id-ID')}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 p-1"><Trash2 className="w-5 h-5" /></button>
                </div>
              ))}
            </div>
          )}
        </div>
        {cart.length > 0 && (
          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-lg font-bold mb-4">
              <span>Total:</span><span className="text-blue-600">Rp {totalBelanja.toLocaleString('id-ID')}</span>
            </div>
            <button onClick={handleCheckout} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700">Lanjut Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
}
