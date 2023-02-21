import authService from "@/services/authService";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import Divider from "../Divider";
import { ErrorMessage } from "../Messages";
import Buttton from "../utils/Button";
import Input from "../utils/Input";

const registerSchema = yup.object({
	first_name: yup.string().required().label("First Name").min(3).max(100),
	last_name: yup.string().required().label("Last Name").min(3).max(100),
	email: yup.string().email().label("Email").required(),
	password: yup.string().required().label("Password").min(4).max(100),
});

export default function Registration({ setRegisterTab }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(registerSchema),
	});

	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);

	const onSubmit = async (data) => {
		setErrorMessage(null);
		setLoading(true);
		try {
			const res = await authService.register(data);
			if (res?.token) {
				toast.success("Registration Successfull!");
				setRegisterTab();
			}
		} catch (error) {
			console.error(error);
			setErrorMessage(error?.data?.details || "Something went wrong!");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<h2 className="text-4xl font-semibold leading-loose tracking-wide text-gray-700">
				Create Account
			</h2>
			<Divider />
			{errorMessage && <ErrorMessage text={errorMessage} />}
			<form noValidate onSubmit={handleSubmit(onSubmit)}>
				<Input
					labelText={"First Name"}
					type="text"
					placeholder="First Name"
					required
					register={register}
					name="first_name"
					error={errors?.first_name?.message}
					helperText={errors?.first_name?.message}
				/>
				<Input
					labelText={"Last Name"}
					type="text"
					placeholder="Last Name"
					required
					register={register}
					name="last_name"
					error={errors?.last_name?.message}
					helperText={errors?.last_name?.message}
				/>
				<Input
					labelText={"Email"}
					type="email"
					placeholder="Email Address"
					required
					register={register}
					name="email"
					error={errors?.email?.message}
					helperText={errors?.email?.message}
				/>
				<Input
					labelText={"Password"}
					type={"password"}
					placeholder="Password"
					required
					register={register}
					name="password"
					error={errors?.password?.message}
					helperText={errors?.password?.message}
				/>
				<Buttton
					disabled={loading}
					text="Create Account"
					type="submit"
					width={"w-full"}
				/>
			</form>
		</div>
	);
}
