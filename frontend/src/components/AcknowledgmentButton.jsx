/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";

const AcknowledgmentButton = ({ policyId }) => {
  const [scrollReached, setScrollReached] = useState(false);

  const handleScroll = (e) => {
    const element = e.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      setScrollReached(true); // Enable the button when scrolled to the bottom
    }
  };

  const handleAcknowledge = async () => {
    try {
      await axios.post("/api/acknowledgments", { policyId });
      alert("Acknowledged successfully");
    } catch (error) {
      console.error("Error acknowledging policy:", error);
    }
  };

  return (
    <div>
      <div
        className="policy-content"
        style={{ maxHeight: "150px", overflowY: "auto" }}
        onScroll={handleScroll}
      >
        {/* This would be the actual policy content */}
        {/* Ensure you pass in full policy content if required */}
        <p>Scroll through the policy content to enable the acknowledgment button.</p>
      </div>
      <button
        onClick={handleAcknowledge}
        disabled={!scrollReached}
        className={`bg-blue-500 text-white py-2 px-4 rounded ${
          scrollReached ? "hover:bg-blue-600" : "opacity-50 cursor-not-allowed"
        } transition duration-200`}
      >
        Acknowledge
      </button>
    </div>
  );
};

export default AcknowledgmentButton;
