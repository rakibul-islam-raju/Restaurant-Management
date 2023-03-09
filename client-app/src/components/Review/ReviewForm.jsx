import { AuthContext } from "@/contexts/AuthContext";
import reviewService from "@/services/reviewService";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
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

export default function ReviewForm({ item, handleClose, editData = false }) {
	const router = useRouter();
	const { user } = useContext(AuthContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "onChange",
		resolver: yupResolver(reviewSchema),
	});

	const [loading, setLoading] = useState(false);
	const [responseError, setResponseError] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);
	const [reviewData, setReviewData] = useState(editData || null);

	const onSubmit = async (data) => {
		if (!item?.menu) false;

		try {
			setErrorMessage(null);
			setResponseError(null);
			setLoading(true);
			if (reviewData && reviewData?.id) {
				await reviewService.editReview(reviewData.id, data);
				toast.success("Review Updated");
			} else {
				const newData = { ...data, menu: item.menu };
				await reviewService.createReview(newData);
				toast.success("Review Successfull");
			}
			handleClose();
			router.push(window.location.pathname);
		} catch (err) {
			console.log(err);
			setResponseError(err?.response?.data);
			setErrorMessage(err?.response?.data?.detail || "Something went wrong!");
		} finally {
			setLoading(false);
		}
	};

	const findReviewByCurrentUserAndMenu = async (email, menu) => {
		try {
			setLoading(true);
			const params = { user__email: email, menu };
			const res = await reviewService.getReviews(params);
			if (res.results?.length > 0) {
				setReviewData(res.results[0]);
			}
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (user?.email && item?.menu) {
			findReviewByCurrentUserAndMenu(user.email, item.menu);
		}
	}, [user?.email, item.menu]);

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
					defaultValue={Number(reviewData?.rating) || ""}
					register={register}
					name="rating"
					error={errors?.rating?.message || responseError?.rating}
					helperText={
						errors?.rating?.message ||
						responseError?.rating ||
						"Please type a number between 1 and 5."
					}
				/>
				<Input
					forId={"comment"}
					type="text"
					labelText={"Comment"}
					required
					defaultValue={reviewData?.comment || ""}
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
