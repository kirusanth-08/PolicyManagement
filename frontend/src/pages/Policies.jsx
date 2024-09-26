/* eslint-disable no-undef */
import axios from 'axios';
import { useEffect, useState } from 'react';
// import AcknowledgmentButton from '../components/AcknowledgmentButton';

const Policies = () => {
  const [policies, setPolicies] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

 // Fetch policies and user data
 useEffect(() => {
  const fetchPolicies = async () => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}` // Pass the token in the request header
        }
      };

      const { data } = await axios.get('http://localhost:3000/api/policies', config);
      setPolicies(data);
    } catch (err) {
      console.error('Error fetching policies:', err);
      setError(err);
    }
  };

  const fetchUserData = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  fetchPolicies();
  fetchUserData();
}, []);

  // Function to handle acknowledgment submission
  const handleAcknowledge = async (policyId) =>{ console.log(policyId , user)
    if (user) {
      try {
        await axios.post('http://localhost:3000/api/acknowledgments', {
          policyId,
          userId: user._id, 
        });
        console.log(user); // We don't need the response directly here
        alert('Policy acknowledged successfully');
      } catch (error) {
        console.error('Error acknowledging policy:', error);
        alert('Failed to acknowledge policy');
      }
    }
  };

  // Grouping policies by domain
  const groupPoliciesByDomain = () => {
    return policies.reduce((grouped, policy) => {
      const domain = policy.domain;
      if (!grouped[domain]) {
        grouped[domain] = [];
      }
      grouped[domain].push(policy);
      return grouped;
    }, {});
  };

  const groupedPolicies = groupPoliciesByDomain();

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-center mb-8">Available Policies</h2>
      {error ? (
        <p className="text-red-500 text-center">Error loading policies</p>
      ) : Object.keys(groupedPolicies).length > 0 ? (
        Object.keys(groupedPolicies).map((domain) => (
          <div key={domain} className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">{domain}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedPolicies[domain].map((policy) => (
                <div key={policy._id} className="bg-white p-6 shadow-lg rounded-lg">
                  <h4 className="text-xl font-semibold mb-2">{policy.title}</h4>
                  <p className="text-gray-600 mb-4">{policy.description}</p>
                  <p className="text-gray-500">Version: {policy.version}</p>

                  {/* Acknowledge button, visible only for users */}
                  {user && user.role !== 'admin' && (
                    <button
                      onClick={() => handleAcknowledge(policy._id)}
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                    >
                      Acknowledge
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No policies available</p>
      )}
    </div>
  );
};

export default Policies;
