import Home from "./pages/Home";
import Products from "./pages/Products";
import NoPage from "./pages/NoPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AddOrUpdateProducts from "./pages/AddOrUpdateProducts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Cart } from "./components/Cart";
import ProductPage from "./pages/ProductPage";
import ForgotPassword from "./pages/ForgotPassword";
import { useSelector } from "react-redux";

function App() {
  const authData = useSelector((state) => state.authData);
  
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            {!authData.isLoggedIn && (
              <>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/password-reset" element={<ForgotPassword />} />
              </>
            )}
            <Route path="/products-add" element={<AddOrUpdateProducts />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/view" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
