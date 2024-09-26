/* eslint-disable react/prop-types */
import { useState } from 'react';
import AddPolicyModal from './AddPolicyModal';  // Import the modal
import axios from 'axios';

const CRUDButtons = ({ policy, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(null); // Mode: 'create' or 'edit'

  const handleDelete = () => {
    // API call to delete the policy
    axios.delete(`http://localhost:3000/api/policies/${policy._id}`)
      .then(() => {
        alert('Policy deleted');
        onUpdate();  // Call parent component to refresh data
      })
      .catch(error => console.error('Error deleting policy:', error));
  };

  return (
    <div>
      <button onClick={() => { setModalMode('create'); setIsModalOpen(true); }}>Create</button>
      <button onClick={() => { setModalMode('edit'); setIsModalOpen(true); }}>Update</button>
      <button onClick={handleDelete}>Delete</button>

      {/* Open the modal for Create/Edit */}
      {isModalOpen && (
        <AddPolicyModal
          policy={modalMode === 'edit' ? policy : null}  // Pass the policy data if editing
          closeModal={() => setIsModalOpen(false)}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
};

export default CRUDButtons;
