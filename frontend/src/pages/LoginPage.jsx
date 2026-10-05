import { useState } from 'react';
import axiosClient from '../api/axiosClient';
import { Lock } from 'lucide-react';

export default function LoginPage({ setIsAdminLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    axiosClient.post('/auth/login', { username, password })
      .then((res) => {
        // Simpan token ke Local Storage browser
        localStorage.setItem('token', res.data.token);
        setIsAdminLoggedIn(true); // Ubah status menjadi login
      })
      .catch((err) => {
        setError(err.response?.data?.error || 'Gagal login. Periksa kembali data Anda.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex items-center justify-center py-16">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-sm w-full">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-purple-100 p-3 rounded-full mb-3">
            <Lock className="text-purple-600 w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Login Admin</h2>
        </div>

        {error && <p className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4 text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-500">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full mt-1 p-2 border rounded-lg outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 p-2 border rounded-lg outline-none focus:border-purple-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white font-bold py-2.5 rounded-lg hover:bg-purple-700 transition"
          >
            {loading ? 'Memproses...' : 'Masuk Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}
