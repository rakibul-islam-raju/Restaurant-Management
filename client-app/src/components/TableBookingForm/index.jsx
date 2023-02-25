import SectionHeader from "@/components/SectionHeader";
import Buttton from "@/components/utils/Button";
import Input from "@/components/utils/Input";
import { AuthContext } from "@/contexts/AuthContext";
import reservationService from "@/services/reservationService";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import Auth from "../Auth";
import { ErrorMessage } from "../Messages";
import Modal from "../Modal";

const reservationSchema = yup.object({
	name: yup.string().required().min(4).label("Name"),
	phone: yup
		.string()
		.matches(/^[0-9]+$/, "Must be only digits")
		.required()
		.min(11)
		.max(11)
		.label("Phone"),
	date: yup.date().required().label("Date"),
	time: yup.string().required().label("Time"),
	person: yup.number().required().min(2).max(12).default(2).label("Person"),
});

const TableBookingForm = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(reservationSchema),
	});

	const { isAuthenticated } = useContext(AuthContext);

	const [authModal, setAuthModal] = useState(false);
	const [reserveInfo, setReserveInfo] = useState(null);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const [responseError, setResponseError] = useState([]);

	const closeAuthModal = () => setAuthModal(false);

	const onSubmit = async (data) => {
		if (!isAuthenticated) {
			// store data
			setCookie(null, "reservationInfo", JSON.stringify(data));
			setAuthModal(true);
		}
		try {
			setLoading(true);
			console.log("data date =>", data?.date);
			const newData = { ...data };
			if (newData?.date) {
				newData.date = moment(newData.date).format("YYYY-MM-DD");
			}
			const response = await reservationService.createReservation(newData);
			console.log("response =>", response);
			toast.success("Reservation Complete");
			router.push("profile");
		} catch (err) {
			setResponseError(err?.response?.data);
			setErrorMessage(err?.data?.details || "Something went wrong!");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const cookies = parseCookies();
		if (cookies["reservationInfo"]) {
			const data = JSON.parse(cookies["reservationInfo"]);
			setReserveInfo(data);
			// destros cookie
			destroyCookie(null, "reservationInfo");
		}
	}, []);

	return (
		<section className=" mb-32 md:mt:32 md:bg-[url('/bg_3.jpg.webp')] md:bg-center md:bg-cover md:bg-no-repeat  md:bg-fixed">
			<div className="container p-4 py-16 grid grid-cols-6   ">
				<div className="relative col-span-6 md:col-span-4 bg-white z-[0] md:p-14 ">
					<SectionHeader
						upperText={"Book a table"}
						lowerText={"Make Reservation"}
					/>

					{errorMessage && <ErrorMessage text={errorMessage} />}

					<form onSubmit={handleSubmit(onSubmit)} noValidate>
						<Input
							forId={"name"}
							labelText={"Name"}
							type={"text"}
							placeholder={"Your Name"}
							defaultValue={reserveInfo?.name}
							register={register}
							name="name"
							error={errors?.name?.message || responseError?.name}
							helperText={errors?.name?.message || responseError?.name}
						/>
						<div className="flex flex-col md:flex-row gap-0 md:gap-2">
							<div className="w-full">
								<Input
									forId={"phone"}
									labelText={"Phone"}
									type={"tel"}
									placeholder={"Phone Number"}
									defaultValue={reserveInfo?.phone}
									register={register}
									name="phone"
									error={errors?.phone?.message || responseError?.phone}
									helperText={errors?.phone?.message || responseError?.phone}
								/>
							</div>
							<div className="w-full">
								<Input
									forId={"person"}
									labelText={"Person"}
									type={"number"}
									min={2}
									placeholder={"Person"}
									defaultValue={reserveInfo?.person ?? 2}
									register={register}
									name="person"
									error={errors?.person?.message || responseError?.person}
									helperText={errors?.person?.message || responseError?.person}
								/>
							</div>
						</div>
						<div className="flex flex-col md:flex-row gap-0 md:gap-2">
							<div className="w-full">
								<Input
									forId={"date"}
									labelText={"Date"}
									type={"date"}
									placeholder={"Date"}
									defaultValue={reserveInfo?.date}
									register={register}
									name="date"
									error={errors?.date?.message || responseError?.date}
									helperText={errors?.date?.message || responseError?.date}
								/>
							</div>
							<div className="w-full">
								<Input
									forId={"time"}
									labelText={"Time"}
									type={"time"}
									placeholder={"Time"}
									defaultValue={reserveInfo?.time}
									register={register}
									name="time"
									error={errors?.time?.message || responseError?.time}
									helperText={errors?.time?.message || responseError?.time}
								/>
							</div>
						</div>
						<Buttton
							width={"w-full"}
							text="Book Now"
							type="submit"
							disabled={loading}
						/>
					</form>
				</div>
			</div>

			{/* auth modal */}
			{authModal && (
				<Modal handleClose={closeAuthModal}>
					<Auth handleClose={closeAuthModal} />
				</Modal>
			)}
		</section>
	);
};

export default TableBookingForm;
