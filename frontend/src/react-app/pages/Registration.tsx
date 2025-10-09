// src/react-app/pages/Registration.tsx
import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNo: '',
    collegeName: '',
    courseSpecialization: '',
    yearOfStudy: '',
    howDidYouHear: 'Social Media',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const { name, email, contactNo, collegeName, courseSpecialization, yearOfStudy, howDidYouHear } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/register', formData);
      setMessage(res.data.msg);
      // Optionally clear the form
      setFormData({
        name: '', email: '', contactNo: '', collegeName: '',
        courseSpecialization: '', yearOfStudy: '', howDidYouHear: 'Social Media',
      });
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Something went wrong!');
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Workshop Registration</h1>
      <form onSubmit={onSubmit} className="space-y-4 max-w-lg">
        {/* Add input fields for each form item */}
        <input type="text" name="name" value={name} onChange={onChange} placeholder="Full Name" required className="w-full p-2 border rounded" />
        <input type="email" name="email" value={email} onChange={onChange} placeholder="Email Address" required className="w-full p-2 border rounded" />
        <input type="text" name="contactNo" value={contactNo} onChange={onChange} placeholder="Contact No." required className="w-full p-2 border rounded" />
        <input type="text" name="collegeName" value={collegeName} onChange={onChange} placeholder="College Name" required className="w-full p-2 border rounded" />
        <input type="text" name="yearOfStudy" value={yearOfStudy} onChange={onChange} placeholder="Year of Study" required className="w-full p-2 border rounded" />
        <input type="text" name="courseSpecialization" value={courseSpecialization} onChange={onChange} placeholder="Course Specialization" className="w-full p-2 border rounded" />
        <select name="howDidYouHear" value={howDidYouHear} onChange={onChange} required className="w-full p-2 border rounded">
            <option value="Social Media">Social Media</option>
            <option value="College">College</option>
            <option value="Friend">Friend</option>
            <option value="Other">Other</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Register</button>
      </form>
      {message && <p className="text-green-500 mt-4">{message}</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Registration;