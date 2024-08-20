// src/pages/Checkout.js
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CheckoutForm from "../components/CheckoutForm";

function Checkout() {
  const { cart } = useContext(CartContext);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h1>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <table className="w-full mb-6 border-collapse">
            <thead>
              <tr>
                <th className="border-b-2 p-4 text-left text-gray-600">
                  Product
                </th>
                <th className="border-b-2 p-4 text-right text-gray-600">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border-b p-4 text-gray-800">{item.title}</td>
                  <td className="border-b p-4 text-right text-gray-800">
                    ${item.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Total: ${calculateTotal()}
          </h2>
          <CheckoutForm
            amount={calculateTotal()}
            onSuccess={() => console.log("Payment succeeded")}
          />
        </>
      )}
    </div>
  );
}

export default Checkout;
