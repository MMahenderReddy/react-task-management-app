import React from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder || 'Search tasks...'}
        className="search-bar-input"
      />
    </div>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default SearchBar;
