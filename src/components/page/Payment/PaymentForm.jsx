import { PaymentElement } from '@stripe/react-stripe-js';

const PaymentForm = () => {
  return (
    <form>
      <PaymentElement />
      <button className="mt-5 w-100 btn btn-success">Submit</button>
    </form>
  );
};

export default PaymentForm;
