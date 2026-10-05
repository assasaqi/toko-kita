import { Package } from 'lucide-react';

export default function CustomerPage({ products, loading, addToCart }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
        <Package className="text-blue-600" /> Katalog Belanja
      </h2>
      {loading ? <p>Memuat katalog...</p> : products.length === 0 ? <p>Belum ada produk.</p> : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div key={p.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{p.nama}</h3>
                <p className="text-blue-600 font-bold text-xl mt-1">Rp {p.harga.toLocaleString('id-ID')}</p>
                <p className="text-xs text-gray-400 mt-1">Sisa Stok: {p.stok}</p>
              </div>
              <button onClick={() => addToCart(p)} disabled={p.stok === 0} className={`mt-4 w-full py-2 rounded-lg font-medium text-sm transition ${p.stok > 0 ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                {p.stok > 0 ? '+ Keranjang' : 'Stok Habis'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
