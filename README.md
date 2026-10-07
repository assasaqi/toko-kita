🛒 Toko Kita
Dokumentasi Repositori & Panduan Penggunaan Application Full-Stack
Toko Kita adalah aplikasi e-commerce berbasis web full-stack yang memisahkan arsitektur frontend dan backend secara independen. Aplikasi ini mendukung fitur otentikasi/otorisasi pengguna, manajemen produk, pengelolaan keranjang belanja, serta pemrosesan pesanan.
🛠️ Tech Stack & Teknologi
Backend
•	Runtime: Node.js (Express.js)
•	Database: PostgreSQL
•	ORM: Prisma ORM
•	Authentication: JSON Web Token (JWT) & bcrypt
Frontend
•	Framework / Build Tool: React.js dengan Vite
•	Styling: Tailwind CSS
•	HTTP Client: Axios
📁 Struktur Repositori
toko-kita/
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

⚙️ Fitur Utama
•	Autentikasi & Hak Akses (Auth): Registrasi, Login, serta pembagian peran pengguna (Role: CUSTOMER dan ADMIN).
•	Sisi Customer (Pelanggan): Katalog Produk, Detail Barang, Keranjang Belanja (Cart Drawer), Checkout, dan Struk/Faktur Belanja (Invoice Modal).
•	Sisi Admin: Manajemen inventaris/produk (Tambah, Edit, Hapus) dan Pengelolaan daftar pesanan pelanggan.
🚀 Panduan Instalasi & Jalankan Aplikasi
1. Prasyarat
•	Node.js (v18+)
•	NPM / Yarn
•	PostgreSQL Server yang aktif
2. Pengaturan Backend
Masuk ke direktori backend dan install dependensi:
cd backend
npm install

Buat file .env di folder backend dan sesuaikan koneksi database Anda:
PORT=5000
DATABASE_URL="postgresql://username:password@localhost:5432/tokokita_db?schema=public"
JWT_SECRET="rahasia_super_aman"

Jalankan Migrasi Prisma untuk membuat tabel di PostgreSQL:
npx prisma migrate dev --name init_db

Jalankan server Backend (Server akan berjalan di http://localhost:5000):
npm run dev

3. Pengaturan Frontend
Buka terminal baru, masuk ke direktori frontend, dan install dependensi:
cd frontend
npm install

Buat file .env (opsional) atau pastikan src/api/axiosClient.js terhubung ke endpoint backend:
VITE_API_BASE_URL=http://localhost:5000

Jalankan aplikasi Frontend (Aplikasi akan berjalan di http://localhost:5173):
npm run dev

🔗 Endpoint Utama API
Method	Endpoint	Deskripsi	Akses
POST	/api/auth/register	Mendaftar akun baru	Publik
POST	/api/auth/login	Login & mendapatkan JWT token	Publik
GET	/api/products	Mengambil daftar produk	Publik
POST	/api/products	Menambah produk baru	Admin
PUT / DELETE	/api/products/:id	Memperbarui / Menghapus produk	Admin
POST	/api/orders	Membuat pesanan baru	Customer
GET	/api/orders	Mengambil daftar pesanan	Admin / Customer

