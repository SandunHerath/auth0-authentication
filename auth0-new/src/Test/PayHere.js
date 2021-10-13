import React from "react";
import payhere from "payhere-js-sdk";
import axios from "axios";
const Pay = () => {
  // Called when user completed the payment. It can be a successful payment or failure
  //   payhere.onCompleted = function onCompleted(orderId) {
  //     console.log("Payment completed. OrderID:" + orderId);
  //     //Note: validate the payment and show success or failure page to the customer
  //   };

  // Called when user closes the payment without completing
  //   payhere.onDismissed = function onDismissed() {
  //     //Note: Prompt user to pay again or show an error page
  //     console.log("Payment dismissed");
  //   };

  // Called when error happens when initializing payment such as invalid parameters
  //   payhere.onError = function onError(error) {
  //     // Note: show an error page
  //     console.log("Error:" + error);
  //   };

  var payment = {
    sandbox: true,
    merchant_id: "1218791", // Replace your Merchant ID
    returnUrl: "http://localhost:3000/thankyou",
    cancelUrl: "http://localhost:3000/payments",
    notifyUrl: "http://localhost:5000/notify",
    order_id: "0123456",
    itemTitle: "Demo Item",
    currency: "LKR",
    amount: 1000,
    items: "Door bell wireles",
    first_name: "Sandun",
    last_name: "Herath",
    phone: "+94719292914",
    email: "sandunherath124@gmail.com",
    address: "No. 255, Narammala Road",
    city: "Alawwa",
    country: "Sri Lanka",
    delivery_address: "No. 46, Galle road, Kalutara South",
    delivery_city: "Kalutara",
    delivery_country: "Sri Lanka",
    custom_1: "",
    custom_2: "",
  };
  async function checkout() {
    // // using async await
    // try {
    //   payhere.startPayment(payment);
    // } catch (err) {
    //   console.log(err);
    // }
    try {
      const res = await axios.post(
        "https://sandbox.payhere.lk/pay/checkout",
        payment
      );
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <script
        type="text/javascript"
        src="https://www.payhere.lk/lib/payhere.js"
      ></script>
      <button type="submit" id="payhere-payment" onClick={checkout}>
        PayHere Pay
      </button>
    </div>
  );
};

export default Pay;
