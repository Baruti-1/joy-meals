import { PaymentElement } from '@stripe/react-stripe-js';

const PaymentForm = () => {
  return (
    <form>
      <PaymentElement />
      <button className="mt-2 btn btn-success">Submit</button>
    </form>
  );
};

export default PaymentForm;
