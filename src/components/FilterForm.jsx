import React from 'react';

const FilterForm = ({ searchTerm, searchTermChange} ) => {
  
  return (
    <form className="form-filter">
      <input
        type="text"
        placeholder="Search term..."
        value={searchTerm}
        onChange={(e) => searchTermChange(e.target.value)}
      />
    </form>
  );
}

export default FilterForm;
