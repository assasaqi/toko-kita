const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Uji Coba Server
app.get('/', (req, res) => {
  res.send('Server Toko Kita berjalan dengan lancar (Dengan Auth)!');
});

// Routing Utama
app.use('/api/auth', authRoutes); // Route untuk login Admin
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Jalankan Server
app.listen(port, () => {
  console.log(`✅ Server backend berjalan di http://localhost:${port}`);
});
