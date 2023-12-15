import Header from "./Header";
import Footer from "./Footer";
import FiltersContainer from "./FiltersContainer";

const Layout = ({ children }) => {
  const activePath = window.location.pathname;

  return (
    <>
      <Header />
      <div className="flex bg-gray-50">
        {activePath === "/products" && <FiltersContainer />}
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
