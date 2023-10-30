import { AuthContext } from "@/contexts/AuthContext";
import userService from "@/services/userService";
import { getFormData } from "@/utils/getFormData";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { parseCookies } from "nookies";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { ErrorMessage } from "../Messages";
import Buttton from "../utils/Button";
import Input from "../utils/Input";

const profileSchema = yup
	.object({
		first_name: yup.string().required().min(4).max(100).label("First Name"),
		last_name: yup.string().required().min(4).max(100).label("Last Name"),
		email: yup.string().email().label("Email"),
		image: yup.mixed().required("Image is required").label("Image"),
	})
	.required();

export default function ProfileEditForm({
	togglePassEdit,
	handleClose,
	editData,
	setUserData,
}) {
	const cookies = parseCookies();
	const refresh = cookies["refresh"];

	const { login } = useContext(AuthContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(profileSchema),
	});

	const [image, setImage] = useState(null);
	const [previewImage, setPreviewImage] = useState(null);
	const [loading, setLoading] = useState(false);
	const [responseError, setResponseError] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	const onSubmit = async (data) => {
		try {
			setErrorMessage(null);
			setLoading(true);
			const newData = { ...data };
			if (image) {
				newData.image = image;
			} else {
				delete newData.image;
			}
			const formData = getFormData(newData);
			const res = await userService.editProfile({
				data: formData,
				email: editData.email,
			});
			if (res?.access && res?.refresh && res?.user) {
				login(res.access, res.refresh);
				toast.success("Profile Updated");
				handleClose();
				setUserData(res.user);
			}
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
				<div className="flex justify-center">
					<div className="relative w-40 h-40 rounded-full bg-golden">
						{previewImage ? (
							<Image
								fill
								src={previewImage}
								alt={editData?.full_name}
								className="object-cover object-center md:object-center rounded-full"
							/>
						) : editData?.image ? (
							<Image
								fill
								src={editData.image}
								alt={editData?.full_name}
								className="object-cover object-center md:object-center rounded-full"
							/>
						) : (
							<div className="text-center test-white text-8xl text-white font-semibold mt-6">
								<div className="">
									{editData?.first_name?.charAt(0)}
									{editData?.last_name?.charAt(0)}
								</div>
							</div>
						)}
						<div className="absolute bottom-0 left-0 right-0 ml-auto mr-auto flex justify-center">
							<label className="rounded text-white bg-gray-700 bg-opacity-50 px-1 cursor-pointer">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
									/>
								</svg>

								<input
									{...register("image")}
									onChange={(e) => {
										setImage(e.target.files[0]);
										setPreviewImage(URL.createObjectURL(e.target.files[0]));
									}}
									type="file"
									multiple
									accept="image/*"
									hidden
								/>
							</label>
						</div>
					</div>
				</div>

				<div className="flex flex-col md:flex-row w-full justify-between gap-x-0 md:gap-x-4">
					<div className="w-full">
						<Input
							forId={"first_name"}
							type="text"
							labelText={"First Name"}
							required
							defaultValue={editData?.first_name || ""}
							register={register}
							name="first_name"
							error={errors?.first_name?.message || responseError?.first_name}
							helperText={
								errors?.first_name?.message || responseError?.first_name
							}
						/>
					</div>
					<div className="w-full">
						<Input
							forId={"last_name"}
							type="text"
							labelText={"Last Name"}
							required
							defaultValue={editData?.last_name || ""}
							register={register}
							name="last_name"
							error={errors?.last_name?.message || responseError?.last_name}
							helperText={
								errors?.last_name?.message || responseError?.last_name
							}
						/>
					</div>
				</div>
				<Input
					forId={"email"}
					type="email"
					labelText={"Email"}
					required
					defaultValue={editData?.email || ""}
					register={register}
					name="email"
					error={errors?.email?.message || responseError?.email}
					helperText={errors?.email?.message || responseError?.email}
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
					Change Password
				</button>
			</div>
		</div>
	);
}
