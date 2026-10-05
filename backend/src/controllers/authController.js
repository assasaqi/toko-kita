const jwt = require('jsonwebtoken');

const login = (req, res) => {
  const { username, password } = req.body;

  // Ambil data admin dari file .env
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  // Cek apakah username dan password cocok
  if (username === adminUsername && password === adminPassword) {
    // Buat token JWT yang berlaku selama 1 hari (24 jam)
    const token = jwt.sign(
      { role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    return res.json({ message: 'Login berhasil', token });
  }

  return res.status(401).json({ error: 'Username atau password salah' });
};

module.exports = { login };
