import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const EmptyState = ({ title, description, actionText, actionPath }) => {
  const navigate = useNavigate();

  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <MapPin size={48} />
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-description">{description}</p>
      {actionText && actionPath && (
        <button 
          className="btn btn-primary"
          onClick={() => navigate(actionPath)}
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
