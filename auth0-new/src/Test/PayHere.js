import React from "react";

const PaymentModal = ({ orderId, name, amount }) => {
  // Put the payment variables here
  var payment = {
    sandbox: true, // if the account is sandbox or real
    merchant_id: "1219082", // Replace your Merchant ID
    return_url: "http://localhost:3000/thankyou",
    cancel_url: "http://localhost:3000/payments",
    notify_url:
      "http://24eb-2407-c00-4004-5b60-8417-789e-58d1-218f.ngrok.io/api/users/pay",
    order_id: "0123456",
    items: "test",
    amount: 2000,
    currency: "LKR",
    first_name: "Sandun",
    last_name: "Herath",
    phone: "+94719292914",
    email: "sandunherath124@gmail.com",
    address: "No. 255, Narammala Road",
    city: "Alawwa",
    country: "Sri Lanka",
    delivery_address: "No. 46, Galle road, Kalutara South", // optional field
    delivery_city: "Kalutara", // optional field
    delivery_country: "Sri Lanka", // optional field
    custom_1: "", // optional field
    custom_2: "", // optional field
  };

  // Called when user completed the payment. It can be a successful payment or failure
  window.payhere.onCompleted = function onCompleted(orderId) {
    console.log("Payment completed. OrderID:" + orderId);
    //Note: validate the payment and show success or failure page to the customer
  };

  // Called when user closes the payment without completing
  window.payhere.onDismissed = function onDismissed() {
    //Note: Prompt user to pay again or show an error page
    console.log("Payment dismissed");
  };

  // Called when error happens when initializing payment such as invalid parameters
  window.payhere.onError = function onError(error) {
    // Note: show an error page
    console.log("Error:" + error);
  };

  function pay() {
    window.payhere.startPayment(payment);
  }

  return <button onClick={pay}>Pay with Payhere</button>;
};

export default PaymentModal;
