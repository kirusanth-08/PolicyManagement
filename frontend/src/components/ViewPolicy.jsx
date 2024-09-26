// ViewPolicy.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import PolicyCard from "../components/PolicyCard";

const ViewPolicy = () => {
  const [policies, setPolicies] = useState([]);
  const [categorizedPolicies, setCategorizedPolicies] = useState({});

  const fetchPolicies = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/policies");
      const policies = response.data;

      // Categorize policies by their domain
      const categorized = policies.reduce((acc, policy) => {
        const { domain } = policy;
        if (!acc[domain]) {
          acc[domain] = [];
        }
        acc[domain].push(policy);
        return acc;
      }, {});

      setPolicies(policies);
      setCategorizedPolicies(categorized);
    } catch (error) {
      console.error("Error fetching policies:", error);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  return (
    <div>
      <h1>Policies</h1>

      {/* Loop through each domain and display policies under the respective domain */}
      {Object.keys(categorizedPolicies).map((domain) => (
        <div key={domain}>
          <h2>{domain}</h2>
          <div className="policy-list">
            {categorizedPolicies[domain].map((policy) => (
              <PolicyCard key={policy._id} policy={policy} isAdmin={false} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewPolicy;
