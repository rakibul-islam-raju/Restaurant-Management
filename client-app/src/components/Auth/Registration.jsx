import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Divider from "../Divider";
import Buttton from "../utils/Button";
import Input from "../utils/Input";

const registerSchema = yup.object({
	first_name: yup.string().required().label("First Name").min(3).max(100),
	last_name: yup.string().required().label("Last Name").min(3).max(100),
	email: yup.string().email().label("Email").required(),
	password: yup.string().required().label("Password").min(4).max(100),
});

export default function Registration() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(registerSchema),
	});

	const [showPassword, setShowPassword] = useState(false);

	const onSubmit = (data) => console.log(data);

	return (
		<div>
			<h2 className="text-4xl font-semibold leading-loose tracking-wide text-gray-700">
				Create Account
			</h2>
			<Divider />
			<form noValidate onSubmit={handleSubmit(onSubmit)}>
				<Input
					labelText={"First Name"}
					type="text"
					placeholder="First Name"
					required
					{...register("first_name")}
					error={errors?.first_name?.message}
					helperText={errors?.first_name?.message}
				/>
				<Input
					labelText={"Last Name"}
					type="text"
					placeholder="Last Name"
					required
					{...register("last_name")}
					error={errors?.last_name?.message}
					helperText={errors?.last_name?.message}
				/>
				<Input
					labelText={"Email"}
					type="email"
					placeholder="Email Address"
					required
					{...register("email")}
					error={errors?.email?.message}
					helperText={errors?.email?.message}
				/>
				<Input
					labelText={"Password"}
					type={showPassword ? "text" : "password"}
					placeholder="Password"
					required
					{...register("password")}
					error={errors?.password?.message}
					helperText={errors?.password?.message}
				/>
				<Buttton text="Login" type="submit" width={"w-full"} />
			</form>
		</div>
	);
}
