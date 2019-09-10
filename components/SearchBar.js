import React, {createRef, useState, useEffect, useCallback} from 'react';

const SearchBar = props => {
  const searchInput = createRef();
  useEffect(() => {
    const handler = event => {
      props.setQuery(event.target.value);
    };
    if (searchInput.current) {
      searchInput.current.addEventListener('keyup', handler);
    }
    return function cleanup() {
      if (searchInput.current) {
        searchInput.current.removeEventListener('keyup', handler);
      }
    };
  });
  return (
    <>
      <input
        ref={searchInput}
        type="text"
        data-ci="search"
        placeholder="Search documents..."
        defaultValue={props.query}
      />
      <style jsx>{`
        input {
          border: 1px solid black;
          background-color: #eee;
          color: black;
          font-size: large;
          padding: 0.5rem;
          width: 100%;
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
};

export default SearchBar;
