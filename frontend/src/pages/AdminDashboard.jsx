import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto"; // Import chart.js automatically

const AdminDashboard = () => {
  const [acknowledgments, setAcknowledgments] = useState([]);

  useEffect(() => {
    // Mock acknowledgment data
    setAcknowledgments([
      { policy: "Data Protection Policy", count: 30 },
      { policy: "Network Security Policy", count: 50 },
    ]);
  }, []);

  // Use the 'data' object for the Bar chart
  const chartData = {
    labels: acknowledgments.map((ack) => ack.policy), // X-axis labels
    datasets: [
      {
        label: "Acknowledgments", // Title of the chart
        data: acknowledgments.map((ack) => ack.count), // Data values for the chart
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Bar color
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
      
      {/* Render the chart */}
      <div className="mb-6">
        <Bar data={chartData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Manage Users</h3>
          <p>View and manage users of the system.</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Add New Policies</h3>
          <p>Create and update policies for users to acknowledge.</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2">View Acknowledgments</h3>
          <p>View which users have acknowledged policies.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
