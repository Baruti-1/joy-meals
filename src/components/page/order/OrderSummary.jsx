import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getStatusColor } from '../../../helper';
import { useUpdateOrderHeaderMutation } from '../../../apis/orderApi';
import MainLoader from '../common/MainLoader';

const OrderSummary = ({ data, userInput }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userAuthStore);
  const badgeTypeColor = getStatusColor(data.status);
  const [updateOrderHeader] = useUpdateOrderHeaderMutation();

  const nextStatus =
    data.status === 'confirmed'
      ? { color: 'info', value: 'Being Cooked' }
      : data.status === 'Being Cooked'
      ? { color: 'warning', value: 'Ready for Pickup' }
      : data.status === 'Ready for Pickup' && {
          color: 'success',
          value: 'Completed',
        };

  const handleNextStatus = async () => {
    setLoading(true);
    await updateOrderHeader({
      orderHeaderId: data.id,
      status: nextStatus.value,
    });
    setLoading(false);
  };

  const handleCancel = async () => {
    setLoading(true);
    await updateOrderHeader({
      orderHeaderId: data.id,
      status: 'Cancelled',
    });
    setLoading(false);
  };

  return (
    <div>
      {loading && <MainLoader />}
      {!loading && (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="text-success">Order Summary</h3>
            <span className={`btn btn-outline-${badgeTypeColor} fs-6`}>
              {data.status}
            </span>
          </div>
          <div className="mt-3">
            <div className="border py-3 px-2">Name: {userInput.name}</div>
            <div className="border py-3 px-2">Email: {userInput.email}</div>
            <div className="border py-3 px-2">
              Phone: {userInput.phoneNumber}
            </div>
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
                {data.status !== 'Cancelled' && data.status !== 'Completed' && (
                  <button
                    className="btn btn-danger mx-2"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                )}
                <button
                  className={`btn btn-${nextStatus.color}`}
                  onClick={handleNextStatus}
                >
                  {nextStatus.value}
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default OrderSummary;
