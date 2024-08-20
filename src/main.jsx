import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { CartProvider } from "./Context/CartContext.jsx";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51PpvVz01kzpZsEA3kQib4X2hg3SCHVHSuQ8ARCZr2ksxpL2P0TYQwWjCJkpJuBAGeclld6NLPQ4SA5ivyrGSccCl00ieUdU5dv"
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <Elements stripe={stripePromise}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Elements>
    </CartProvider>
  </StrictMode>
);
