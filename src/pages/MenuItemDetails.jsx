import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const MenuItemDetails = () => {
  const { menuItemId } = useParams();
  const [menuItemDetails, setMenuItemDetails] = useState({});

  useEffect(() => {
    fetch(`https://redmangoapi.azurewebsites.net/api/MenuItem/${menuItemId}`)
      .then((res) => res.json())
      .then((data) => setMenuItemDetails(data.result));
  }, []);

  return (
    <div className="container pt-4 pt-md-5">
      <div className="row">
        <div className="col-7">
          <h2 className="text-success">{menuItemDetails.name}</h2>
          <span>
            <span
              className="badge text-bg-dark pt-2"
              style={{ height: '40px', fontSize: '20px' }}
            >
              {menuItemDetails.category}
            </span>
          </span>
          <span>
            <span
              className="badge text-bg-light pt-2"
              style={{ height: '40px', fontSize: '20px' }}
            >
              {menuItemDetails.specialTag && menuItemDetails.specialTag}
            </span>
          </span>
          <p style={{ fontSize: '20px' }} className="pt-2">
            {menuItemDetails.description}
          </p>
          <span className="h3">$10</span> &nbsp;&nbsp;&nbsp;
          <span
            className="pb-2  p-3"
            style={{ border: '1px solid #333', borderRadius: '30px' }}
          >
            <i
              className="bi bi-dash p-1"
              style={{ fontSize: '25px', cursor: 'pointer' }}
            ></i>
            <span className="h3 mt-3 px-3">XX</span>
            <i
              className="bi bi-plus p-1"
              style={{ fontSize: '25px', cursor: 'pointer' }}
            ></i>
          </span>
          <div className="row pt-4">
            <div className="col-5">
              <button className="btn btn-success form-control">
                Add to Cart
              </button>
            </div>

            <div className="col-5 ">
              <Link to="/">
                <button className="btn btn-secondary form-control">
                  Back to Home
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-5">
          <img
            src={menuItemDetails.image}
            width="100%"
            style={{ borderRadius: '50%' }}
            alt="No content"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default MenuItemDetails;
