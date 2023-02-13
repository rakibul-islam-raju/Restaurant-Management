import About from "components/About";
import Chef from "components/Chef";
import Feature from "components/Feature";
import FeaturedMenus from "components/Feature/FeatureMenus";
import Header from "components/Header";
import Statistics from "components/Statistics";

import Head from "next/head";

export default function Home() {
	return (
		<>
			<Head>
				<title>Take My Order</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="stylesheet" href="boxicons.min.css" />
				<link rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css" />

				<head />
			</Head>

			<section className="scroll-smooth">
				<Header />
				<Feature />
				<About />
				<Statistics />
				<Review />
				<Chef />



			</section>
		</>
	);
}
