import { useEffect, useState } from "react";
import axios from "axios";

const UserHome = () => {
const [policies, setPolicies] = useState([]);  
const [userId, setUserId] = useState(""); // Add userId state if required

useEffect(() => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  // If both token and user are available, set loggedIn state and user details
  if (token && user) {
    try {
      const parsedUser = JSON.parse(user); // Parse user details from localStorage
      setUserId(parsedUser.id); // Set user's name for display
    } catch (error) {
      console.error("Failed to parse user data:", error);
    }
  }
}, []);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/acknowledgments/${userId}`)
      .then((response) => setPolicies(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);



  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to Your Dashboard</h1>
      <p>Here, you can view the latest policies and complete your acknowledgments.</p>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Policies</h2>
        <ul>
          {policies.map((policy) => (
            <li key={policy._id}>
              <h3>{policy.title}</h3>
              <p>{policy.description}</p>
              <p>Domain: {policy.domain}</p>
              <p>Version: {policy.version}</p>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default UserHome;
