import FooterImage from "@/components/Footer/FooterImage";
import Icons from "@/components/utils/Icons";
import subscriberService from "@/services/subscriberService";
import { useState } from "react";
import { toast } from "react-toastify";
import Input from "../utils/Input";

function Footer() {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const [responseError, setResponseError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			if (!email) return false;

			setLoading(true);
			setErrorMessage(null);

			await subscriberService.subscribe({ email });
			toast.success("Successfully Subscribed!");
			setEmail(null);
		} catch (err) {
			setResponseError(err?.response?.data);
			setErrorMessage(err?.response?.data?.detail || "Something went wrong!");
		} finally {
			setLoading(false);
		}
	};

	return (
		<footer className="bg-footer  ">
			<div className="grid grid-cols-1 gap-x-8 gap-y-10  md:grid-cols-4  text-white   container p-4 py-20  ">
				<div className="space-y-6  ">
					<h6 className="text-white uppercase">Slice of Spice</h6>

					<div className="space-y-4">
						<small>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum,
							alias atque. Corrupti quo
						</small>
						<Icons bg={true} />
					</div>
				</div>

				<div className=" space-y-6">
					<h6 className="text-white">Open Hours</h6>

					<div className="space-y-3">
						<div className="flex-center ">
							<small>Saturday</small>
							<small>9:00 - 24:00</small>
						</div>
						<div className="flex-center ">
							<small>Sunday</small>
							<small>9:00 - 24:00</small>
						</div>
						<div className="flex-center ">
							<small>Monday</small>
							<small>9:00 - 24:00</small>
						</div>
						<div className="flex-center ">
							<small>Tuesday</small>
							<small>9:00 - 24:00</small>
						</div>
						<div className="flex-center ">
							<small>Wednesday</small>
							<small>9:00 - 24:00</small>
						</div>
						<div className="flex-center ">
							<small>Thursday</small>
							<small>9:00 - 24:00</small>
						</div>
						<div className="flex-center ">
							<small>Friday</small>
							<small>9:00 - 24:00</small>
						</div>
					</div>
				</div>
				<div className=" space-y-6">
					<h6 className="text-white">Instagram</h6>
					<div className="space-y-1 ">
						<div className="flex flex-col md:flex-row gap-1  ">
							<FooterImage image={"/insta-1.jpg.webp"} />
							<FooterImage image={"/insta-2.jpg.webp"} />
							<FooterImage image={"/insta-3.jpg.webp"} />
						</div>
						<div className="flex flex-row gap-1">
							<FooterImage image={"/insta-2.jpg.webp"} />
							<FooterImage image={"/insta-3.jpg.webp"} />
							<FooterImage image={"/insta-4.jpg.webp"} />
						</div>
					</div>
				</div>
				<div className=" space-y-6">
					<h6 className="text-white">Newsletter</h6>

					<form className="" onSubmit={handleSubmit}>
						<small>Lorem ipsum dolor, sit amet consectetur adipisicing</small>

						<div className="form-group pt-4 space-y-3">
							{/* <input
								type="email"
								name="mail"
								placeholder="Enter email address"
								className=" w-full p-4 py-3 text-black text-center rounded-sm text-base  bg-slate-200 focus:outline-none"
								required
							/> */}
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="Email Address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								error={responseError?.email}
								helperText={responseError?.email}
							/>

							<button
								disabled={loading}
								type="submit"
								className="px-8 py-3  text-center rounded-sm text-base w-full bg-golden cursor-pointer"
							>
								Subscribe
							</button>
						</div>
					</form>
				</div>

				<small className="text-center col-span-1 md:col-span-4  md:pt-6 pb-6 md:pb-0 ">
					Copyright © All rights reserved by
					<span className="pt-1">
						<i className="bx bxs-heart "> </i>{" "}
					</span>
					Take My Order
				</small>
			</div>
		</footer>
	);
}

export default Footer;
