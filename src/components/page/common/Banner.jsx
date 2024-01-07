import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchItem } from '../../../store/redux/menuItemSlice';
import './banner.css';

const Banner = () => {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setSearchItem(e.target.value));
    setSearchValue(e.target.value);
  };

  return (
    <div className="custom-banner">
      <div
        className="m-auto d-flex align-items-center"
        style={{
          width: '400px',
          height: '50vh',
        }}
      >
        <div className="d-flex align-items-center" style={{ width: '100%' }}>
          <input
            type={'text'}
            className="form-control rounded-pill"
            style={{
              width: '100%',
              padding: '20px 20px',
            }}
            placeholder="Search food item"
            value={searchValue}
            onChange={handleChange}
          />
          <span style={{ position: 'relative', left: '-43px' }}>
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
