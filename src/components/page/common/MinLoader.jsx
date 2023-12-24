import React from 'react';

const MinLoader = ({ type = 'warning', size = '100%' }) => {
  return (
    <div
      style={{ scale: `${size}%` }}
      className={`spinner-border text-${type}`}
    ></div>
  );
};

export default MinLoader;
