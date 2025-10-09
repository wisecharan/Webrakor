// src/react-app/pages/AdminLogin.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { username, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', formData);
      localStorage.setItem('token', res.data.token); // Save the token
      navigate('/admin'); // Redirect to the dashboard
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Login failed!');
    }
  };

  return (
    <div className="container mx-auto p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Admin Login</h1>
      <form onSubmit={onSubmit} className="space-y-4 w-full max-w-xs">
        <input type="text" name="username" value={username} onChange={onChange} placeholder="Username" required className="w-full p-2 border rounded" />
        <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">Login</button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default AdminLogin;