// AddPolicyForm.jsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPolicyForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [domain, setDomain] = useState('');
  const [version, setVersion] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    const policy = { title, description, domain, version };

    try {
      await axios.post('http://localhost:3000/api/policies', policy, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      });
      setError(null);
      setTitle('');
      setDescription('');
      setDomain('');
      setVersion('');
      alert('Policy added successfully');
      navigate('/policies');
    } catch (error) {
      setError(error.response?.data?.message || 'Error adding policy');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8"
    >
      <h3 className="text-2xl font-bold mb-6 text-center">Add a New Policy</h3>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Policy Title:
        </label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Description:
        </label>
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Domain:</label>
        <input
          type="text"
          onChange={(e) => setDomain(e.target.value)}
          value={domain}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Version:</label>
        <input
          type="text"
          onChange={(e) => setVersion(e.target.value)}
          value={version}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
      >
        Add Policy
      </button>
    </form>
  );
};

export default AddPolicyForm;
