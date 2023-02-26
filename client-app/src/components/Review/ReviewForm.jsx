import reviewService from "@/services/reviewService";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import Divider from "../Divider";
import { ErrorMessage } from "../Messages";
import Buttton from "../utils/Button";
import Input from "../utils/Input";

const reviewSchema = yup.object({
	rating: yup.number().required().max(5),
	comment: yup.string().required().min(4).max(1000),
});

export default function ReviewForm({ item, handleClose }) {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(reviewSchema),
	});

	const [loading, setLoading] = useState(false);
	const [responseError, setResponseError] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	const onSubmit = async (data) => {
		if (!item?.menu) false;

		try {
			setErrorMessage(null);
			setLoading(true);
			const newData = { ...data, menu: item.menu };
			const res = await reviewService.createReview(newData);
			toast.success("Review Successfull");
			handleClose();
			router.push(window.location.pathname);
		} catch (err) {
			console.log(err);
			setResponseError(err?.response?.data);
			setErrorMessage(err?.data?.details || "Something went wrong!");
		} finally {
			setLoading(false);
		}
	};

	console.log(responseError?.response?.data);

	return (
		<div>
			<h4>{item?.name}</h4>
			<Divider />

			{responseError?.non_field_errors?.length > 0
				? responseError?.non_field_errors?.map((i, j) => (
						<ErrorMessage key={j} text={i} />
				  ))
				: errorMessage && <ErrorMessage text={errorMessage} />}

			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<Input
					forId={"rating"}
					type="number"
					labelText={"Rating"}
					required
					register={register}
					name="rating"
					error={errors?.rating?.message || responseError?.rating}
					helperText={errors?.rating?.message || responseError?.rating}
				/>
				<Input
					forId={"comment"}
					type="text"
					labelText={"Comment"}
					required
					register={register}
					name="comment"
					error={errors?.comment?.message || responseError?.comment}
					helperText={errors?.comment?.message || responseError?.comment}
				/>
				<Buttton
					text="Submit"
					type="submit"
					width={"w-full"}
					disabled={loading}
				/>
			</form>
		</div>
	);
}
