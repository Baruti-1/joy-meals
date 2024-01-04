import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderList = ({ data }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="table p-5">
        <h1 className="text-success">Orders List</h1>
        <div className="p-2">
          <div className="row border">
            <div className="col-1">ID</div>
            <div className="col-3">Name</div>
            <div className="col-2">Phone</div>
            <div className="col-1">Total</div>
            <div className="col-1">Items</div>
            <div className="col-2">Date</div>
            <div className="col-2"></div>
          </div>
          {data.result.length !== 0 ? (
            data.result.map((orderItem) => {
              return (
                <div className="row border" key={orderItem.orderHeaderId}>
                  <div className="col-1">{orderItem.orderHeaderId}</div>
                  <div className="col-3">{orderItem.pickupName}</div>
                  <div className="col-2">{orderItem.pickupPhoneNumber}</div>
                  <div className="col-1">
                    $ {orderItem.orderTotal.toFixed(2)}
                  </div>
                  <div className="col-1">{orderItem.totalItems}</div>
                  <div className="col-2">
                    {new Date(orderItem.orderDate).toLocaleDateString()}
                  </div>
                  <div className="col-2">
                    <button
                      className="btn btn-success"
                      onClick={() =>
                        navigate(
                          `/order/orderdetails/${orderItem.orderHeaderId}`
                        )
                      }
                    >
                      Details
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center mt-2">No orders</div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderList;