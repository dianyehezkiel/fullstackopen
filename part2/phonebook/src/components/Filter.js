import React, { useState } from 'react';

const Filter = ({ onChange }) => {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div>
      filter shown with:
      <input value={filter} onChange={handleFilterChange} />
    </div>
  );
}

export default Filter;