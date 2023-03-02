import SectionHeader from "@/components/SectionHeader";
import chefService from "@/services/chefService";
import { useEffect, useState } from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Loader from "../Loader";
import { ErrorMessage, WarningMessage } from "../Messages";
import ChefCard from "./ChefCard";

function Chef() {
	const [chefs, setChefs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);

	const fetchChefs = async () => {
		try {
			setLoading(true);
			setErrorMessage(null);
			const res = await chefService.getChefs();
			setChefs(res?.results);
		} catch (err) {
			setErrorMessage(err?.data?.details || "Something went wrong!");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchChefs();
	}, []);

	return loading ? (
		<Loader />
	) : (
		<section className="wrapper  ">
			<SectionHeader upperText={"Chef"} lowerText={"Our Master Chef"} />

			{errorMessage && <ErrorMessage text={errorMessage} />}

			<div className="">
				{chefs?.length > 0 ? (
					<Swiper
						spaceBetween={30}
						slidesPerView={1}
						loop={true}
						pagination={{
							clickable: true,
						}}
						breakpoints={{
							640: {
								slidesPerView: 2,
								spaceBetween: 20,
							},

							1024: {
								slidesPerView: 3,
								spaceBetween: 50,
							},
						}}
						modules={[Pagination]}
						className="mySwiper cursor-pointer  "
					>
						{chefs?.map((item) => (
							<SwiperSlide key={item?.id}>
								<ChefCard key={item?.id} data={item} />
							</SwiperSlide>
						))}
					</Swiper>
				) : (
					<WarningMessage text={"No data found"} />
				)}
			</div>
		</section>
	);
}

export default Chef;
