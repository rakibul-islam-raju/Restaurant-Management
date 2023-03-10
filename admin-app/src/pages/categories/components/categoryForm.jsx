import { yupResolver } from "@hookform/resolvers/yup";
import {
	Alert,
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	Stack,
	TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import {
	useAddCategoryMutation,
	useEditCategoryMutation,
} from "../../../features/category/categoryApi";
import { slugify } from "../../../utils/slugify";

const categorySchema = yup
	.object({
		name: yup.string().required().min(4).max(100),
		slug: yup.string().optional(),
		is_active: yup.boolean().optional(),
	})
	.required();

export default function categoryForm({
	closeModal,
	queryParams,
	edit,
	editData,
}) {
	const dispatch = useDispatch();

	const [slug, setSlug] = useState("");

	const [addCategory, { isLoading, isError, error: responseError, isSuccess }] =
		useAddCategoryMutation();

	const [
		editCategory,
		{
			isLoading: editLoading,
			isSuccess: editSuccess,
			error: editResponseError,
		},
	] = useEditCategoryMutation();

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm({
		resolver: yupResolver(categorySchema),
	});

	const onSubmit = (data) => {
		if (edit && editData.id) {
			dispatch(editCategory({ data, params: queryParams, id: editData.id }));
		} else {
			dispatch(addCategory({ data, params: queryParams }));
		}
	};

	useEffect(() => {
		if (isSuccess || editSuccess) {
			closeModal();

			// TODO: toast alert
		}
	}, [isSuccess, editSuccess]);

	const name = watch("name");

	useEffect(() => {
		if (name) {
			setSlug(slugify(name));
		} else {
			setSlug("");
		}
	}, [name]);

	useEffect(() => {
		if (editData?.slug) {
			setSlug(slugify(editData.slug));
		}
	}, []);

	return (
		<Box component={"form"} onSubmit={handleSubmit(onSubmit)} noValidate>
			{(responseError?.data?.detail || editResponseError?.data?.detail) && (
				<Alert severity="error">
					{responseError?.data?.detail ||
						editResponseError.data?.detail ||
						"Something went wrong!"}
				</Alert>
			)}

			<TextField
				variant="standard"
				margin="normal"
				required
				fullWidth
				label="Category Name"
				defaultValue={edit ? editData.name : ""}
				{...register("name")}
				error={errors.name?.message || responseError?.data?.name}
				helperText={errors.name?.message || responseError?.data?.name}
			/>
			<TextField
				variant="standard"
				margin="normal"
				fullWidth
				label="Slug"
				defaultValue={edit ? editData.slug : ""}
				value={slug}
				{...register("slug")}
				onChange={(e) => setSlug(e.target.value)}
				error={errors.slug?.message || responseError?.data?.slug}
				helperText={errors.slug?.message || responseError?.data?.slug}
			/>

			{edit && (
				<FormControlLabel
					control={
						<Checkbox
							{...register("is_active")}
							defaultChecked={editData.is_active}
							color="primary"
						/>
					}
					label="Active Status"
				/>
			)}

			<Stack direction={"row"} justifyContent="end" gap={2} mt={3}>
				<Button
					disabled={isLoading || editLoading}
					type="button"
					color="inherit"
					onClick={closeModal}
				>
					Cancel
				</Button>
				<Button
					disabled={isLoading || editLoading}
					type="submit"
					color="primary"
				>
					Submit
				</Button>
			</Stack>
		</Box>
	);
}
