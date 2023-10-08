import Layout from "../components/Layout";
import HomepageCarousel from "../components/HomepageCarousel";

const Home = () => {
  return (
    <Layout>
      <div className=" min-h-screen">
        <HomepageCarousel/>
      </div>
    </Layout>
  );
};

export default Home;
