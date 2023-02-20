import About from "@/components/About";
import CateringService from "@/components/CateringService";
import Chef from "@/components/Chef";
import Feature from "@/components/Feature";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Review from "@/components/Review";
import Specialities from "@/components/Sepcialities";
import Statistics from "@/components/Statistics";
import TableBookingForm from "@/components/TableBookingForm";
import Head from "next/head";

export default function Home() {
	return (
		<>
			<Head>
				<title>Take My Order</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>

			<section className="scroll-smooth font-poppins">
				<Header />
				<Feature />
				<About />
				<Statistics />
				<Specialities />
				<CateringService />
				<TableBookingForm />
				<Review />
				<Chef />
				<Footer />
			</section>
		</>
	);
}
