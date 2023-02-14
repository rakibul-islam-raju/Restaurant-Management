import About from "components/About";
import Chef from "components/Chef";
import Feature from "components/Feature";
import FeaturedMenus from "components/Feature/FeatureMenus";
import Footer from "components/Footer";
import Header from "components/Header";
import Menu from "components/Menu";
import Review from "components/Review";
import Statistics from "components/Statistics";

import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>Take My Order</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <head />
      </Head>

      <section className="scroll-smooth">
        <Header />
        <Feature />
        <About />
        <Statistics />
        <Review />
        <Menu />
        <Chef />

        <Footer />
      </section>
    </>
  );
}
