import React from 'react';
import { useSelector } from 'react-redux';

const CartSummary = () => {
  const shoppingCartFromStore = useSelector(
    (state) => state.shoppingCartStore.cartItems ?? []
  );

  if (!shoppingCartFromStore) {
    return <div>Empty Shopping Cart</div>;
  }

  return (
    <div className="container p-4 m-2">
      <h4 className="text-center text-success">Cart Summary</h4>
      {shoppingCartFromStore.map((cartItem) => (
        <div
          key={cartItem.menuItem.id}
          className="d-flex flex-sm-row flex-column align-items-center custom-card-shadow rounded m-3"
          style={{ background: 'ghostwhite' }}
        >
          <div className="p-3">
            <img
              src={cartItem.menuItem.image}
              alt=""
              width={'120px'}
              className="rounded-circle"
            />
          </div>

          <div className="p-2 mx-3" style={{ width: '100%' }}>
            <div className="d-flex justify-content-between align-items-center">
              <h4 style={{ fontWeight: 300 }}>{cartItem.menuItem.name}</h4>
              <h4>
                ${(cartItem.quantity * cartItem.menuItem.price).toFixed(2)}
              </h4>
            </div>
            <div className="flex-fill">
              <h4 className="text-danger">${cartItem.menuItem.price}</h4>
            </div>
            <div className="d-flex justify-content-between">
              <div
                className="d-flex justify-content-between p-2 mt-2 rounded-pill custom-card-shadow  "
                style={{
                  width: '100px',
                  height: '43px',
                }}
              >
                <span style={{ color: 'rgba(22,22,22,.7)' }} role="button">
                  <i className="bi bi-dash-circle-fill"></i>
                </span>
                <span>
                  <b>{cartItem.quantity}</b>
                </span>
                <span style={{ color: 'rgba(22,22,22,.7)' }} role="button">
                  <i className="bi bi-plus-circle-fill"></i>
                </span>
              </div>

              <button className="btn btn-danger mx-1">Remove</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartSummary;