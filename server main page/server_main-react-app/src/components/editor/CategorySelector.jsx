import React from 'react';

const CategorySelector = ({ category, setCategory, options }) => {
  return (
    <div className="category-selector">
      <label htmlFor="category-select">카테고리:</label>
      <select 
        id="category-select"
        value={category} 
        onChange={(e) => setCategory(e.target.value)}
        className="category-select"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelector; 