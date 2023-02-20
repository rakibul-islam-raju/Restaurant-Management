import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Divider from "../Divider";
import Buttton from "../utils/Button";
import Checkbox from "../utils/Checkbox";
import Input from "../utils/Input";

const loginSchema = yup.object({
	email: yup.string().email().required().label("Email"),
	password: yup.string().required().label("Password").min(4).max(100),
});

export default function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(loginSchema),
	});

	const [showPassword, setShowPassword] = useState(false);

	const onSubmit = (data) => console.log(data);

	return (
		<div>
			<h2 className="text-4xl font-semibold leading-loose tracking-wide text-gray-700">
				Login
			</h2>
			<Divider />
			<form noValidate onSubmit={handleSubmit(onSubmit)}>
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
				<Checkbox
					label={"Show Password"}
					value={showPassword}
					onChange={() => setShowPassword((prevState) => !prevState)}
				/>
				<Buttton text="Login" type="submit" width={"w-full"} />
			</form>
		</div>
	);
}
