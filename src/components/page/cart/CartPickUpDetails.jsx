import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { inputHelper } from '../../../helper';
import MinLoader from '../common/MinLoader';
import { useInitiatePaymentMutation } from '../../../apis/paymentApi';

const CartPickUpDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const shoppingCartFromStore = useSelector(
    (state) => state.shoppingCartStore.cartItems ?? []
  );
  const userData = useSelector((state) => state.userAuthStore);
  const navigate = useNavigate();

  let grandTotal = 0;
  let totalItems = 0;

  const initialUserData = {
    name: userData.fullName,
    email: userData.email,
    phoneNumber: '',
  };

  const [userInput, setUserInput] = useState(initialUserData);
  const [initiatePayment] = useInitiatePaymentMutation();

  shoppingCartFromStore.map((cartItem) => {
    totalItems += cartItem.quantity ?? 0;
    grandTotal += (cartItem.menuItem.price ?? 0) * (cartItem.quantity ?? 0);
    return null;
  });

  const handleUserInput = (e) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  useEffect(() => {
    setUserInput({
      name: userData.fullName,
      email: userData.email,
      phoneNumber: '',
    });
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { data } = await initiatePayment(userData.id);
    navigate('/payment', {
      state: { apiResult: data?.result, userInput },
    });
  };

  return (
    <div className="border pb-5 pt-3">
      <h1 style={{ fontWeight: '300' }} className="text-center text-success">
        Pickup Details
      </h1>
      <hr />
      <form onSubmit={handleSubmit} className="col-10 mx-auto">
        <div className="form-group mt-3">
          Pickup Name
          <input
            type="text"
            className="form-control"
            placeholder="name..."
            value={userInput.name}
            onChange={handleUserInput}
            name="name"
            required
          />
        </div>
        <div className="form-group mt-3">
          Pickup Email
          <input
            type="email"
            className="form-control"
            placeholder="email..."
            value={userInput.email}
            onChange={handleUserInput}
            name="email"
            required
          />
        </div>

        <div className="form-group mt-3">
          Pickup Phone Number
          <input
            type="number"
            className="form-control"
            placeholder="phone number..."
            name="phoneNumber"
            value={userInput.phoneNumber}
            onChange={handleUserInput}
            required
          />
        </div>
        <div className="form-group mt-3">
          <div className="card p-3" style={{ background: 'ghostwhite' }}>
            <h5>Grand Total : ${grandTotal.toFixed(2)}</h5>
            <h5>No of items : {totalItems}</h5>
          </div>
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="btn btn-lg btn-success form-control mt-3"
        >
          {isLoading ? <MinLoader /> : 'Place Order!'}
        </button>
      </form>
    </div>
  );
};

export default CartPickUpDetails;
