import { useState, useEffect } from 'react';
import { Registration } from '@/shared/types';
import apiClient from '@/api/axios'; // Use path alias

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

        // Use the new apiClient and a relative path
        const res = await apiClient.get('/api/admin/registrations', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRegistrations(res.data);
      } catch (err: any) {
        setError(err.response?.data?.msg || 'Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);
  
  // ... rest of the component is the same
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
              <th className="py-2 px-4 border">Year</th>
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
                <td className="py-2 px-4 border">{reg.yearOfStudy}</td>
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