/* eslint-disable react/prop-types */
import AcknowledgmentButton from './AcknowledgmentButton';
import CRUDButtons from './CRUDButtons';

const PolicyCard = ({ policy, isAdmin, onUpdate }) => {
  return (
    <div className="policy-card">
      <h2>{policy.title}</h2>
      <p>{policy.description}</p>
      <p><strong>Version:</strong> {policy.version}</p>
      <p><strong>Domain:</strong> {policy.domain}</p>

      {/* Show Acknowledgment button for regular users */}
      {!isAdmin && <AcknowledgmentButton policyId={policy._id} />}

      {/* Show CRUD buttons for admins */}
      {isAdmin && <CRUDButtons policy={policy} onUpdate={onUpdate} />}
    </div>
  );
};

export default PolicyCard;
