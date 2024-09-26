/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";

const AddPolicyModal = ({ policy, closeModal, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    domain: "",
    version: "",
  });

  // If editing, prefill the form with existing policy data
  useEffect(() => {
    if (policy) {
      setFormData({
        title: policy.title,
        description: policy.description,
        domain: policy.domain,
        version: policy.version,
      });
    }
  }, [policy]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async () => {
    const url = policy
      ? `http://localhost:3000/api/policies/${policy._id}`
      : "http://localhost:3000/api/policies";
    const method = policy ? "put" : "post";

    try {
      await axios[method](url, formData);
      alert(policy ? "Policy updated" : "Policy created");
      onUpdate();
      closeModal();
    } catch (error) {
      console.error("Error saving policy:", error);
    }
  };

  return (
    <div className="modal">
      <h2>{policy ? "Edit Policy" : "Add Policy"}</h2>
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <input
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        name="domain"
        value={formData.domain}
        onChange={handleChange}
        placeholder="Domain"
      />
      <input
        name="version"
        value={formData.version}
        onChange={handleChange}
        placeholder="Version"
      />
      <button onClick={handleSubmit}>
        {policy ? "Update" : "Create"}
      </button>
      <button onClick={closeModal}>Close</button>
    </div>
  );
};

export default AddPolicyModal;
