import userService from "@/services/userService";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { ErrorMessage } from "../Messages";
import Buttton from "../utils/Button";
import Input from "../utils/Input";

const passwordSchema = yup
	.object({
		old_password: yup.string().required().min(6).max(100).label("Old Password"),
		new_password: yup.string().required().min(6).max(100).label("New Password"),
		confirm_password: yup
			.string()
			.oneOf([yup.ref("new_password"), null], "Passwords must match"),
	})
	.required();

export default function PasswordChangeForm({ togglePassEdit, handleClose }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(passwordSchema),
	});

	const [loading, setLoading] = useState(false);
	const [responseError, setResponseError] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	const onSubmit = async (data) => {
		try {
			setErrorMessage(null);
			setLoading(true);
			const newData = {
				old_password: data.old_password,
				new_password: data.new_password,
			};

			const res = await userService.changePassword(newData);
			toast.success("Password Changed");
			handleClose();
		} catch (err) {
			setResponseError(err?.response?.data);
			setErrorMessage(err?.response?.data?.detail || "Something went wrong!");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			{responseError?.non_field_errors?.length > 0
				? responseError?.non_field_errors?.map((i, j) => (
						<ErrorMessage key={j} text={i} />
				  ))
				: errorMessage && <ErrorMessage text={errorMessage} />}

			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<Input
					forId={"old_password"}
					type="password"
					labelText={"Old Password"}
					required
					register={register}
					name="old_password"
					error={errors?.old_password?.message || responseError?.old_password}
					helperText={
						errors?.old_password?.message || responseError?.old_password
					}
				/>
				<Input
					forId={"new_password"}
					type="password"
					labelText={"New Password"}
					required
					register={register}
					name="new_password"
					error={errors?.new_password?.message || responseError?.new_password}
					helperText={
						errors?.new_password?.message || responseError?.new_password
					}
				/>
				<Input
					forId={"confirm_password"}
					type="password"
					labelText={"Confirm Password"}
					required
					register={register}
					name="confirm_password"
					error={
						errors?.confirm_password?.message || responseError?.confirm_password
					}
					helperText={
						errors?.confirm_password?.message || responseError?.confirm_password
					}
				/>

				<Buttton
					text="Submit"
					type="submit"
					width={"w-full"}
					disabled={loading}
				/>
			</form>

			<div className="flex justify-center">
				<button
					type="button"
					onClick={togglePassEdit}
					className="mt-6 text-golden bg-golden bg-opacity-10 font-semibold px-2 py-1 rounded text-sm"
				>
					Edit Profile
				</button>
			</div>
		</div>
	);
}
