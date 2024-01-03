import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { useCreateOrderMutation } from '../../../apis/orderApi';
import toastNotify from '../../../helper/toastNotify';

const PaymentForm = ({ data, userInput }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [createOrder] = useCreateOrderMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setIsProcessing(true);
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: 'https://example.com/order/123/complete',
      },
      redirect: 'if_required',
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      toastNotify(result.error.message, 'error');

      setIsProcessing(false);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      let grandTotal = 0;
      let totalItems = 0;

      const orderDetails = [];
      data.cartItems.forEach((item) => {
        const tempOrderDetail = {};
        tempOrderDetail['menuItemId'] = item.menuItem?.id;
        tempOrderDetail['quantity'] = item.quantity;
        tempOrderDetail['itemName'] = item.menuItem?.name;
        tempOrderDetail['price'] = item.menuItem?.price;

        orderDetails.push(tempOrderDetail);

        grandTotal += item.quantity * item.menuItem?.price;
        totalItems += item.quantity;
      });

      const response = await createOrder({
        pickupName: userInput.name,
        pickupPhoneNumber: userInput.phoneNumber,
        pickupEmail: userInput.email,
        totalItems: totalItems,
        orderTotal: grandTotal,
        orderDetailsDTO: orderDetails,
        stripePaymentIntentID: data.stripePaymentIntentId,
        applicationUserId: data.userId,
        status:
          result.paymentIntent.status === 'succeeded' ? 'confirmed' : 'pending',
      });
      if (response.data?.result.status === 'confirmed') {
        navigate(`/order/orderconfirmed/${response.data.result.orderHeaderId}`);
      }
    }
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button className="mt-5 w-100 btn btn-success" disabled={!stripe}>
        <span id="button-text">
          {isProcessing ? 'Processing...' : 'Submit Order'}
        </span>
      </button>
    </form>
  );
};

export default PaymentForm;
