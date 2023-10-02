import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import FiltersContainer from "./FiltersContainer";
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const activePath = window.location.pathname;
  return (
    <>
      <Header />
      <div className="flex">
        {
          activePath === "/products" && <FiltersContainer/>
        }
      <div>
      {children}
      </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
