import SectionHeader from "@/components/SectionHeader";
import reviewService from "@/services/reviewService";
import { useEffect, useState } from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Loader from "../Loader";
import { ErrorMessage, WarningMessage } from "../Messages";
import Reviewer from "./Reviewer";

export default function Review() {
	const [reviews, setReviews] = useState(null);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);

	const fetchReviews = async () => {
		try {
			setLoading(true);
			setErrorMessage(null);
			const res = await reviewService.getTopRatedReviews({ limit: 10 });
			setReviews(res);
		} catch (err) {
			setErrorMessage(err?.response?.data?.detail || "Something went wrong!");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchReviews();
	}, []);

	return (
		<>
			<div className="wrapper ">
				<SectionHeader upperText={"Testimony"} lowerText={"Happy Customers"} />

				{errorMessage && <ErrorMessage text={errorMessage} />}

				{loading ? (
					<Loader />
				) : reviews?.results?.length > 0 ? (
					<div className="">
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
							{reviews?.results?.map((item) => (
								<SwiperSlide key={item?.id}>
									<Reviewer data={item} />
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				) : (
					<WarningMessage text={"No data found!"} />
				)}
			</div>
		</>
	);
}
