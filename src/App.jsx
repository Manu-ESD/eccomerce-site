import React, { useState, useEffect, useRef } from "react";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import Offers from "./Pages/Offers";
import About from "./Pages/About";
import NoPage from "./Pages/NoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Cart } from "./components/Cart";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    // <Store.Provider value={[addToCart, setaddToCart]}>

    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
    // </Store.Provider>
  );
}

export default App;
