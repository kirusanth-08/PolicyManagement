// ViewPolicy.jsx
import axios from "axios";
import { useEffect, useState } from "react";

const ViewPolicy = () => {
  const [policies, setPolicies] = useState([]);
  const [error, setError] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState(""); // To filter by domain

  useEffect(() => {
    const fetchPolicies = async () => {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      try {
        const response = await axios.get("http://localhost:3000/api/policies", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        });
        setPolicies(response.data);
      } catch (err) {
        setError(err.response ? err.response.data : err);
      }
    };
    fetchPolicies();
  }, []);

  const domains = [...new Set(policies.map((policy) => policy.domain))]; // Get unique domains

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">View Policies</h2>
      {error ? (
        <p className="text-red-600">Error loading policies</p>
      ) : (
        <>
          <div className="flex space-x-4 mb-4">
            <select
              className="border p-2 rounded"
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
            >
              <option value="">All Domains</option>
              {domains.map((domain, index) => (
                <option key={index} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          </div>

          {policies
            .filter((policy) => (selectedDomain ? policy.domain === selectedDomain : true))
            .map((policy) => (
              <div key={policy._id} className="border p-4 rounded-lg mb-4 shadow-md">
                <h3 className="text-lg font-semibold">{policy.title}</h3>
                <p>{policy.description}</p>
                <p className="text-sm text-gray-500">Version: {policy.version}</p>
                <p className="text-sm text-gray-500">Domain: {policy.domain}</p>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default ViewPolicy;
