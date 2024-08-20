import { Route, Routes } from "react-router-dom";
import Shop from "./Pages/Shop";
import Product from "./Pages/Product";
import CheckOut from "./Pages/CheckOut";
import Navbar from "./Components/Navbar";
import Success from "./Pages/Success";

function App() {
  return (
    <>
      <Navbar />
      <main className="m-auto">
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/payment-success" element={<Success />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
