const prisma = require('../config/prisma');
const midtransClient = require('midtrans-client');

// Inisialisasi Midtrans Snap
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY
});

// Ambil riwayat pesanan (Untuk Admin)
const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        orderItems: { include: { product: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ error: "Gagal mengambil daftar pesanan" });
  }
};

// Buat Pesanan Baru (Checkout) & Request Token Midtrans
const createOrder = async (req, res) => {
  try {
    const { items, totalHarga } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ error: "Keranjang kosong" });
    }

    // 1. Buat pesanan utama di database
    const newOrder = await prisma.order.create({
      data: {
        totalHarga: parseInt(totalHarga),
        statusBayar: "pending",
        statusKirim: "pending",
      },
    });

    // 2. Simpan item pesanan & kurangi stok
    for (const item of items) {
      await prisma.orderItem.create({
        data: {
          orderId: newOrder.id,
          productId: item.id,
          jumlah: item.qty,
          hargaItem: item.harga,
        },
      });

      await prisma.product.update({
        where: { id: item.id },
        data: { stok: { decrement: item.qty } },
      });
    }

    // 3. Siapkan parameter untuk Midtrans
    const parameter = {
      transaction_details: {
        order_id: `ORDER-${newOrder.id}-${Date.now()}`,
        gross_amount: parseInt(totalHarga)
      },
      credit_card: {
        secure: true
      }
    };

    // 4. Minta Token Transaksi ke Midtrans
    const transaction = await snap.createTransaction(parameter);
    const midtransToken = transaction.token;

    // 5. Kirim respons sukses ke frontend
    return res.status(201).json({
      message: "Checkout berhasil!",
      order: newOrder,
      midtransToken: midtransToken
    });

  } catch (error) {
    // Cetak error detail di terminal backend
    console.error("DETAIL ERROR CHECKOUT:", error.message);
    if (error.ApiResponse) {
      console.error("Respon Midtrans:", error.ApiResponse);
    }
    return res.status(500).json({ error: "Gagal memproses checkout: " + error.message });
  }
};

// Ubah Status Pesanan
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { statusBayar } = req.body;
    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { statusBayar },
    });
    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error.message);
    res.status(500).json({ error: "Gagal memperbarui status pesanan" });
  }
};

module.exports = { getOrders, createOrder, updateOrderStatus };
