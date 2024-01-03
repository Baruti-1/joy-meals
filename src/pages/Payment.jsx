import React from 'react';
import { useLocation } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../components/page/Payment/PaymentForm';
import OrderSummary from '../components/page/order/OrderSummary';

const stripePromise = loadStripe(
  'pk_test_51MG6xmDU3OjDrP4GJV8avgtFNNGxikOffHWtYgncDFkahat38KLX3foPPgFbk0JHNG2FmYhIpSNl2lqbnR3uEfRM00Bv0LptTW'
);

const Payment = () => {
  const {
    state: { apiResult, userInput },
  } = useLocation();

  console.log(apiResult);

  const options = {
    // passing the client secret obtained from the server
    clientSecret: apiResult.clientSecret,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <div className="container m-5 p-5">
        <div className="row">
          <div className="col-md-7">
            <OrderSummary data={apiResult} userInput={userInput} />
          </div>
          <div className="col-md-4 offset-md-1">
            <h4 className="text-success">Payment</h4>
            <div className="mt-5">
              <PaymentForm data={apiResult} userInput={userInput} />
            </div>
          </div>
        </div>
      </div>
    </Elements>
  );
};

export default Payment;
