// src/react-app/pages/AdminDashboard.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Registration } from '../../shared/types'; // Assuming you have a types file

const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please login.');
          setLoading(false);
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const res = await axios.get('http://localhost:5000/api/admin/registrations', config);
        setRegistrations(res.data);
      } catch (err: any) {
        setError(err.response?.data?.msg || 'Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  if (loading) return <p>Loading registrations...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard - Registrations</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Contact No.</th>
              <th className="py-2 px-4 border">College</th>
              <th className="py-2 px-4 border">Course</th>
              <th className="py-2 px-4 border">Registered On</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg) => (
              <tr key={reg._id}>
                <td className="py-2 px-4 border">{reg.name}</td>
                <td className="py-2 px-4 border">{reg.email}</td>
                <td className="py-2 px-4 border">{reg.contactNo}</td>
                <td className="py-2 px-4 border">{reg.collegeName}</td>
                <td className="py-2 px-4 border">{reg.courseSpecialization}</td>
                <td className="py-2 px-4 border">{new Date(reg.registeredAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;