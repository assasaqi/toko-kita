🛒 Toko Kita - Aplikasi E-Commerce Full-StackToko Kita adalah aplikasi e-commerce berbasis web full-stack yang memisahkan arsitektur frontend dan backend secara independen. Aplikasi ini mendukung fitur otentikasi/otorisasi pengguna, manajemen produk, pengelolaan keranjang belanja, serta pemrosesan pesanan.   🛠️ Tech Stack & TeknologiBackendRuntime: Node.js (Express.js)   Database: PostgreSQL   ORM: Prisma ORM   Authentication: JSON Web Token (JWT) & bcrypt   FrontendFramework / Build Tool: React.js dengan Vite   Styling: Tailwind CSS   HTTP Client: Axios   📁 Struktur RepositoriPlaintexttoko-kita/
├── backend/                  # REST API Service
│   ├── prisma/               # Skema & migrasi database Prisma
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── src/
│   │   ├── config/           # Konfigurasi Prisma Client
│   │   ├── controllers/      # Logika aplikasi (Auth, Product, Order)
│   │   ├── middleware/       # Autentikasi & Otorisasi JWT
│   │   ├── routes/           # Endpoint API Express
│   │   └── server.js         # Entry point backend
│   └── package.json
│
└── frontend/                 # Client Interface (SPA)
    ├── src/
    │   ├── api/              # Axios instance Client API
    │   ├── components/       # Komponen UI (Navbar, CartDrawer, InvoiceModal, dsb.)
    │   ├── pages/            # Halaman (LoginPage, CustomerPage, AdminPage)
    │   ├── App.jsx           # Routing & komponen utama
    │   └── main.jsx          # Entry point frontend
    ├── index.html
    └── package.json
⚙️ Fitur UtamaAutentikasi & Hak Akses (Auth)   Registrasi & Login.   Peran Pengguna (Role): CUSTOMER dan ADMIN.   Sisi Customer (Pelanggan)   Katalog Produk & Detail Barang.   Keranjang Belanja (Cart Drawer).   Pemesanan (Checkout) & Struk/Faktur Belanja (Invoice Modal).   Sisi Admin   Manajemen inventaris/produk (Tambah, Edit, Hapus).   Pengelolaan daftar pesanan pelanggan.   🚀 Panduan Instalasi & Jalankan Aplikasi1. PrasyaratNode.js (v18+)NPM / YarnPostgreSQL Server yang aktif2. Pengaturan BackendMasuk ke direktori backend:Bashcd backend
Install dependensi:Bashnpm install
Buat file .env di folder backend dan sesuaikan koneksi database Anda:Cuplikan kodePORT=5000
DATABASE_URL="postgresql://username:password@localhost:5432/tokokita_db?schema=public"
JWT_SECRET="rahasia_super_aman"
Jalankan Migrasi Prisma untuk membuat tabel di PostgreSQL:Bashnpx prisma migrate dev --name init_db
Jalankan server Backend:Bashnpm run dev
# Atau: node src/server.js
Server backend akan berjalan di http://localhost:5000.   3. Pengaturan FrontendBuka terminal baru dan masuk ke direktori frontend:Bashcd frontend
Install dependensi:Bashnpm install
Buat file .env (opsional) atau pastikan src/api/axiosClient.js terhubung ke endpoint backend:   Cuplikan kodeVITE_API_BASE_URL=http://localhost:5000
Jalankan aplikasi Frontend:Bashnpm run dev
Aplikasi frontend akan berjalan di http://localhost:5173.   🔗 Endpoint Utama APIMethodEndpointDeskripsiAksesPOST/api/auth/registerMendaftar akun baruPublikPOST/api/auth/loginLogin & mendapatkan JWT tokenPublikGET/api/productsMengambil daftar produkPublikPOST/api/productsMenambah produk baruAdminPUT/DELETE/api/products/:idMemperbarui / Menghapus produkAdminPOST/api/ordersMembuat pesanan baruCustomerGET/api/ordersMengambil daftar pesananAdmin / Customer
