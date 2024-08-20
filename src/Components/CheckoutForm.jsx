// src/components/CheckoutForm.js
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

function CheckoutForm({ amount, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: name,
        email: email,
      },
    });

    if (error) {
      console.error("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setPaymentCompleted(true);
      alert(`Payment of $${amount} was successful!`);
      onSuccess(paymentMethod);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-8"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Payment Information
        </h2>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="John Doe"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="john.doe@example.com"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Card Details
          </label>
          <div className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <CardElement />
          </div>
        </div>

        <button
          type="submit"
          disabled={!stripe}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Pay ${amount}
        </button>
      </form>

      {paymentCompleted && (
        <div className="mt-6 bg-green-100 p-4 rounded-lg">
          <h3 className="text-green-800 font-semibold text-lg">
            Payment Successful!
          </h3>
          <p className="text-green-700">
            You have successfully paid <strong>${amount}</strong>.
          </p>
        </div>
      )}
    </div>
  );
}

export default CheckoutForm;
