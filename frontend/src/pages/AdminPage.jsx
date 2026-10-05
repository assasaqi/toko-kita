import { useState } from 'react';
import axiosClient from '../api/axiosClient';
import { PlusCircle, Package, Edit, Trash2, FileText, LogOut } from 'lucide-react';

export default function AdminPage({ products, orders, fetchProducts, fetchOrders, handleUpdateStatus, setIsAdminLoggedIn }) {
  const [nama, setNama] = useState('');
  const [harga, setHarga] = useState('');
  const [stok, setStok] = useState('');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({ id: '', nama: '', harga: '', stok: '' });

  // Fungsi Logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Hapus token
    setIsAdminLoggedIn(false); // Kembalikan ke halaman login
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!nama || !harga || !stok) return alert('Semua field wajib diisi!');
    axiosClient.post('/products', { nama, harga: parseInt(harga), stok: parseInt(stok) })
      .then(() => {
        setNama(''); setHarga(''); setStok('');
        fetchProducts();
        alert('Produk berhasil ditambahkan!');
      })
      .catch((err) => console.error('Gagal menambah produk:', err));
  };

  const handleDeleteProduct = (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) return;
    axiosClient.delete(`/products/${id}`)
      .then(() => {
        fetchProducts();
        alert('Produk berhasil dihapus!');
      })
      .catch(() => alert('Gagal menghapus produk. Pastikan produk belum pernah dipesan.'));
  };

  const openEditModal = (product) => {
    setEditForm({ id: product.id, nama: product.nama, harga: product.harga, stok: product.stok });
    setIsEditModalOpen(true);
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    axiosClient.put(`/products/${editForm.id}`, {
      nama: editForm.nama,
      harga: parseInt(editForm.harga),
      stok: parseInt(editForm.stok)
    })
    .then(() => {
      setIsEditModalOpen(false);
      fetchProducts();
      alert('Produk berhasil diperbarui!');
    })
    .catch((err) => console.error('Gagal update produk:', err));
  };

  return (
    <div className="space-y-8">
      {/* Header Admin dengan Tombol Logout */}
      <div className="flex justify-between items-center bg-purple-50 p-4 rounded-xl border border-purple-100">
        <h2 className="text-xl font-bold text-purple-800">Sistem Manajemen Toko</h2>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-white text-red-600 border border-red-200 px-4 py-2 rounded-lg font-semibold hover:bg-red-50 transition text-sm"
        >
          <LogOut className="w-4 h-4" /> Keluar
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><PlusCircle className="text-purple-600" /> Tambah Produk Baru</h2>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama Produk" className="w-full p-2 border rounded-lg outline-none focus:border-purple-500" />
            <input type="number" value={harga} onChange={(e) => setHarga(e.target.value)} placeholder="Harga (Rp)" className="w-full p-2 border rounded-lg outline-none focus:border-purple-500" />
            <input type="number" value={stok} onChange={(e) => setStok(e.target.value)} placeholder="Stok Awal" className="w-full p-2 border rounded-lg outline-none focus:border-purple-500" />
            <button type="submit" className="w-full bg-purple-600 text-white font-medium py-2 rounded-lg hover:bg-purple-700">Simpan Produk</button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Package className="text-purple-600" /> Daftar Produk</h2>
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 border-b uppercase text-xs">
              <tr><th className="p-3">Nama</th><th className="p-3">Harga</th><th className="p-3">Stok</th><th className="p-3 text-right">Aksi</th></tr>
            </thead>
            <tbody className="divide-y">
              {products.map(p => (
                <tr key={p.id}>
                  <td className="p-3 font-semibold">{p.nama}</td>
                  <td className="p-3">Rp {p.harga.toLocaleString('id-ID')}</td>
                  <td className="p-3">{p.stok}</td>
                  <td className="p-3 text-right space-x-2">
                    <button onClick={() => openEditModal(p)} className="p-1.5 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"><Edit className="w-4 h-4"/></button>
                    <button onClick={() => handleDeleteProduct(p.id)} className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200"><Trash2 className="w-4 h-4"/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><FileText className="text-purple-600" /> Riwayat Transaksi</h2>
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 border-b uppercase text-xs">
            <tr><th className="p-3">ID Order</th><th className="p-3">Tanggal</th><th className="p-3">Rincian Item</th><th className="p-3">Total</th><th className="p-3">Status Bayar</th><th className="p-3">Aksi</th></tr>
          </thead>
          <tbody className="divide-y">
            {orders.map((o) => (
              <tr key={o.id}>
                <td className="p-3 font-bold text-gray-800">#{o.id}</td>
                <td className="p-3 text-xs">{new Date(o.createdAt).toLocaleString('id-ID')}</td>
                <td className="p-3 text-xs">
                  <ul className="list-disc list-inside">{o.orderItems.map((item, idx) => (<li key={idx}><span className="font-semibold">{item.product?.nama || 'Produk Dihapus'}</span> ({item.jumlah}x)</li>))}</ul>
                </td>
                <td className="p-3 font-bold text-blue-600">Rp {Number(o.totalHarga).toLocaleString('id-ID')}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs font-semibold uppercase ${o.statusBayar === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{o.statusBayar}</span>
                </td>
                <td className="p-3">
                  {o.statusBayar === 'pending' && (
                    <button onClick={() => handleUpdateStatus(o.id, 'paid')} className="bg-green-600 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-green-700">Tandai Lunas</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Edit Produk */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-2xl">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Edit className="text-blue-600 w-5 h-5"/> Edit Produk</h2>
            <form onSubmit={handleUpdateProduct} className="space-y-4">
              <div><label className="text-xs font-semibold text-gray-500">Nama Produk</label><input type="text" value={editForm.nama} onChange={(e) => setEditForm({...editForm, nama: e.target.value})} className="w-full p-2 border rounded-lg outline-none" /></div>
              <div><label className="text-xs font-semibold text-gray-500">Harga (Rp)</label><input type="number" value={editForm.harga} onChange={(e) => setEditForm({...editForm, harga: e.target.value})} className="w-full p-2 border rounded-lg outline-none" /></div>
              <div><label className="text-xs font-semibold text-gray-500">Stok</label><input type="number" value={editForm.stok} onChange={(e) => setEditForm({...editForm, stok: e.target.value})} className="w-full p-2 border rounded-lg outline-none" /></div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg font-medium hover:bg-gray-200">Batal</button>
                <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700">Simpan Perubahan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
