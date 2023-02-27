import campaignService from "@/services/campaignService";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Loader from "../Loader";

export default function Campaigns() {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);

	const fetchCampaigns = async () => {
		try {
			setLoading(true);
			setErrorMessage(null);
			const res = await campaignService.getCampaigns();
			setData(res?.results);
		} catch (err) {
			setErrorMessage(err?.data?.details || "Something went wrong!");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchCampaigns();
	}, []);

	return loading ? (
		<Loader />
	) : (
		<section className="md:max-w-6xl mx-auto p-4">
			<Swiper
				centeredSlides={true}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				modules={[Autoplay, Pagination]}
				spaceBetween={30}
				slidesPerView={1}
				loop={true}
				pagination={{
					clickable: true,
				}}
			>
				{data?.map((item) => (
					<SwiperSlide key={item?.id}>
						<div className="relative h-[500px] w-full m-auto">
							<Image
								src={item?.image}
								fill
								alt={item?.title}
								className="object-center"
							/>
							<div className="absolute bottom-0 w-full bg-golden bg-opacity-80 backdrop-blur text-white py-4 px-4 text-center">
								<div className="text-2xl">{item?.title}</div>
								{item?.description && (
									<pre className="">{item?.description}</pre>
								)}
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
}
