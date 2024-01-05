import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getStatusColor } from '../../../helper';

const OrderSummary = ({ data, userInput }) => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userAuthStore);
  const badgeTypeColor = getStatusColor(data.status);

  const nextStatus =
    data.status === 'confirmed'
      ? { color: 'info', value: 'Being Cooked' }
      : data.status === 'being_cooked'
      ? { color: 'warning', value: 'Ready for Pickup' }
      : data.status === 'ready_for_pickup' && {
          color: 'success',
          value: 'Completed',
        };

  return (
    <div>
      {' '}
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="text-success">Order Summary</h3>
        <span className={`btn btn-outline-${badgeTypeColor} fs-6`}>
          {data.status}
        </span>
      </div>
      <div className="mt-3">
        <div className="border py-3 px-2">Name: {userInput.name}</div>
        <div className="border py-3 px-2">Email: {userInput.email}</div>
        <div className="border py-3 px-2">Phone: {userInput.phoneNumber}</div>
        <div className="border py-3 px-2">
          <h4 className="text-success">Menu Items</h4>
          <div className="p-3">
            {data.cartItems?.map((item) => {
              return (
                <div className="d-flex" key={item.menuItem.id}>
                  <div className="d-flex w-100 justify-content-between">
                    <p>{item.menuItem?.name}</p>
                    <p>
                      ${item.menuItem?.price} x {item.quantity} =
                    </p>
                  </div>
                  <p style={{ width: '70px', textAlign: 'right' }}>
                    ${(item.menuItem?.price ?? 0) * (item.quantity ?? 0)}
                  </p>
                </div>
              );
            })}
            <hr />
            <h4 className="text-success" style={{ textAlign: 'right' }}>
              ${data.cartTotal?.toFixed(2)}
            </h4>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Back to Orders
        </button>
        {userData.role === 'admin' && (
          <div className="d-flex">
            <button className="btn btn-danger mx-2">Cancel</button>
            <button className={`btn btn-${nextStatus.color}`}>
              {nextStatus.value}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
