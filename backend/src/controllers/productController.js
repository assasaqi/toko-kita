const prisma = require('../config/prisma');

// Ambil semua produk
const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Gagal mengambil data produk" });
  }
};

// Tambah produk baru
const createProduct = async (req, res) => {
  try {
    const { nama, harga, stok } = req.body;
    if (!nama || !harga || stok === undefined) {
      return res.status(400).json({ error: "Nama, harga, dan stok wajib diisi" });
    }
    const newProduct = await prisma.product.create({
      data: {
        nama,
        harga: parseInt(harga),
        stok: parseInt(stok),
      },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Gagal menambahkan produk" });
  }
};

// Edit produk (Update)
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, harga, stok } = req.body;

    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        nama: nama || undefined,
        harga: harga ? parseInt(harga) : undefined,
        stok: stok !== undefined ? parseInt(stok) : undefined,
      },
    });

    res.json({ message: "Produk berhasil diperbarui", product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Gagal memperbarui produk (Mungkin ID tidak ditemukan)" });
  }
};

// Hapus produk (Delete)
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Produk berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Gagal menghapus produk. Pastikan produk ini belum ada di riwayat pesanan." });
  }
};

// PASTIKAN BARIS INI ADA DI PALING BAWAH
module.exports = { getProducts, createProduct, updateProduct, deleteProduct };
