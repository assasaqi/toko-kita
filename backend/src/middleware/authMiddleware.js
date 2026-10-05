const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Ambil token dari header Authorization (Format: "Bearer <token>")
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).json({ error: 'Akses ditolak. Token tidak tersedia.' });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verifikasi token menggunakan secret key dari .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Simpan data user ke dalam request
    next(); // Loloskan ke controller selanjutnya
  } catch (error) {
    return res.status(401).json({ error: 'Token tidak valid atau sudah kedaluwarsa.' });
  }
};

module.exports = verifyToken;
