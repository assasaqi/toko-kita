import { CheckCircle } from 'lucide-react';

export default function InvoiceModal({ invoice, setInvoice }) {
  if (!invoice) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl text-center">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
        <h2 className="text-2xl font-bold text-gray-800">Checkout Berhasil!</h2>
        <p className="text-xs text-gray-400 mt-1 mb-4">Faktur Pemesanan Toko Kita</p>
        <div className="text-left text-sm text-gray-600 space-y-2 mb-6 border-y py-4">
          <div className="flex justify-between"><span className="font-medium">No. Pesanan:</span><span className="font-bold">#{invoice.orderId}</span></div>
          <div className="flex justify-between"><span className="font-medium">Status:</span><span className="uppercase font-bold text-yellow-600">{invoice.status}</span></div>
          <div className="flex justify-between font-bold text-base text-gray-900 mt-2 border-t pt-2"><span>Total Tagihan:</span><span className="text-blue-600">Rp {invoice.totalHarga.toLocaleString('id-ID')}</span></div>
        </div>
        <button onClick={() => setInvoice(null)} className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700">Tutup</button>
      </div>
    </div>
  );
}
