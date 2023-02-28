import contactService from "@/services/contactService";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { ErrorMessage } from "../Messages";
import SectionHeader from "../SectionHeader";
import Buttton from "../utils/Button";
import Input from "../utils/Input";
import TextArea from "../utils/TextArea";

const contactSchema = yup.object({
	name: yup.string().required().min(4).max(100).label("Full Name"),
	email: yup.string().email().required().label("Email"),
	subject: yup.string().required().min(4).max(100).label("Message"),
	message: yup.string().required().min(16).label("Message"),
});

export default function Contact() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(contactSchema),
	});

	const [errorMessage, setErrorMessage] = useState(null);
	const [loading, setLoading] = useState(false);
	const [responseError, setResponseError] = useState(null);

	const onSubmit = async (data) => {
		try {
			setErrorMessage(null);
			setLoading(true);
			const res = await contactService.postContact(data);
			toast.success("Thank you for your query. We'll get back to you soon.");
			reset();
		} catch (err) {
			setResponseError(err?.response?.data);
			setErrorMessage(err?.data?.details || "Something went wrong!");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div id="contact" className="wrapper">
			<SectionHeader upperText={"Contact"} lowerText={"Contact Us"} />

			<div className="w-full md:w-8/12 mx-auto rounded bg-neutral-100 p-8">
				{errorMessage && <ErrorMessage text={errorMessage} />}

				<form onSubmit={handleSubmit(onSubmit)} novalidate>
					<Input
						forId={"fullName"}
						type="text"
						labelText={"Full Name"}
						register={register}
						name="name"
						error={errors?.name?.message || responseError?.name}
						helperText={errors?.name?.message || responseError?.name}
					/>
					<Input
						forId={"email"}
						type="email"
						labelText={"Email"}
						register={register}
						name="email"
						error={errors?.email?.message || responseError?.email}
						helperText={errors?.email?.message || responseError?.email}
					/>
					<Input
						forId={"subject"}
						type="text"
						labelText={"Subject"}
						register={register}
						name="subject"
						error={errors?.subject?.message || responseError?.subject}
						helperText={errors?.subject?.message || responseError?.subject}
					/>
					<TextArea
						rows={8}
						forId={"message"}
						type="text"
						labelText={"Message"}
						register={register}
						name="message"
						error={errors?.message?.message || responseError?.message}
						helperText={errors?.message?.message || responseError?.message}
					/>
					<Buttton
						text="Submit"
						width={"w-full"}
						type="submit"
						disabled={loading}
					/>
				</form>
			</div>
		</div>
	);
}
