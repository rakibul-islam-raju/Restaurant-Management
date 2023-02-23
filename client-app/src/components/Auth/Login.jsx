import { AuthContext } from "@/contexts/AuthContext";
import authService from "@/services/authService";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Divider from "../Divider";
import { ErrorMessage } from "../Messages";
import Buttton from "../utils/Button";
import Checkbox from "../utils/Checkbox";
import Input from "../utils/Input";

const loginSchema = yup.object({
	email: yup.string().email().required(),
	password: yup.string().required().min(4).max(100),
});

export default function Login() {
	const router = useRouter();
	const { isAuthenticated, login } = useContext(AuthContext);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(loginSchema),
	});

	console.log("isAuthenticated =>", isAuthenticated);

	const [showPassword, setShowPassword] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const [loading, setLoading] = useState(false);

	const onSubmit = async (data) => {
		setErrorMessage(null);
		setLoading(true);

		const { next } = router.query;
		const redirectUrl = next ? decodeURIComponent(next) : "/";

		try {
			const res = await authService.login(data);
			const { access, refresh } = res;
			if (access && refresh) {
				login(access, refresh);
				router.push(redirectUrl);
				// window.location.href = "/";
			}
		} catch (error) {
			console.error(error);
			setErrorMessage(error?.data?.details || "Something went wrong!");
		}
	};

	return (
		<div>
			<h2 className="text-4xl font-semibold leading-loose tracking-wide text-gray-700">
				Login
			</h2>
			<Divider />
			{errorMessage && <ErrorMessage text={errorMessage} />}
			<form noValidate onSubmit={handleSubmit(onSubmit)}>
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
					type={showPassword ? "text" : "password"}
					placeholder="Password"
					required
					register={register}
					name="password"
					error={errors?.password?.message}
					helperText={errors?.password?.message}
				/>
				<Checkbox
					disabled={loading}
					label={"Show Password"}
					value={showPassword}
					onChange={() => setShowPassword((prevState) => !prevState)}
				/>
				<Buttton text="Login" type="submit" width={"w-full"} />
			</form>
		</div>
	);
}
