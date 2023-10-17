import Layout from "../components/Layout";
import HomepageCarousel from "../components/HomepageCarousel";
import BestProducts from "../components/BestProducts";

const Home = () => {
  return (
    <Layout>
      <div className=" min-h-screen">
        <HomepageCarousel/>
        <BestProducts category="Electronics"/>
        <BestProducts category="Clothing"/>

      </div>
    </Layout>
  );
};

export default Home;
