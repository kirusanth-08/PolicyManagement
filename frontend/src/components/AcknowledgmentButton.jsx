/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from 'axios';

const AcknowledgmentButton = ({ policyId }) => {
  const [acknowledged, setAcknowledged] = useState(false);

  const handleAcknowledge = () => {
    axios.post(`http://localhost:3000/api/policies/${policyId}/acknowledge`)
      .then(() => setAcknowledged(true))
      .catch(error => console.error('Error acknowledging policy:', error));
  };

  return (
    <button onClick={handleAcknowledge} disabled={acknowledged}>
      {acknowledged ? 'Acknowledged' : 'Acknowledge'}
    </button>
  );
};

export default AcknowledgmentButton;
