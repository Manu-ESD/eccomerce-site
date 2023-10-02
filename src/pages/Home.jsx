import React from "react";
import Layout from "../components/Layout";
import FilterSelect from "../components/FilterSelect";

const Home = () => {
  return (
    <Layout>
      <div className=" min-h-screen"> <FilterSelect/> </div>
    </Layout>
  );
};

export default Home;
