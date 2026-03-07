import React from 'react';
import OpportunityCard from './OpportunityCard';

const OpportunityMatrix = ({ opportunities, onSelectOpportunity }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {opportunities.map(op => (
        <OpportunityCard key={op.id} op={op} onSelect={onSelectOpportunity} />
      ))}
    </div>
  );
};

export default OpportunityMatrix;
