import React from "react";
import {
  Customer,
  CurrencyType,
  PayhereCheckout,
  CheckoutParams,
} from "payhere-js-sdk";
import { useAuth0 } from "@auth0/auth0-react";
const Checkout = () => {
  const { user } = useAuth0();
  function onPayhereCheckoutError(errorMsg) {
    alert(errorMsg);
  }

  async function checkout() {
    // using async await
    try {
      const customer = new Customer({
        first_name: "Sandun",
        last_name: user.sub,
        phone: "+94719292914",
        email: user.email,
        address: "No. 255, Narammala Road",
        city: "Alawwa",
        country: "Sri Lanka",
      });
      const checkoutData = new CheckoutParams({
        returnUrl: "http://localhost:3000/thankyou",
        cancelUrl: "http://localhost:3000/payments",
        notifyUrl: "http://localhost:8080/notify",
        order_id: "0123456",
        itemTitle: "Demo Item",
        currency: CurrencyType.LKR,
        amount: 1000,
      });

      const checkout = new PayhereCheckout(
        customer,
        checkoutData,
        onPayhereCheckoutError
      );
      const result = checkout.start();
      console.log(result); //NE9WeDNhQVRyN280SkFkdVNVUFVaYzNYZzo0UFppM1Qwa3BCQjhRZVpYQ2ZQN2prNDhWSjBBRjZ2SHE0cDg3U3hEZHpsWiA=
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      
      <button onClick={checkout}>Pay with Payhere</button>
    </div>
  );
};

export default Checkout;
