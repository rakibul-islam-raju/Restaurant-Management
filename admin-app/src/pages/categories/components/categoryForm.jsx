import { yupResolver } from "@hookform/resolvers/yup";
import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	Stack,
	TextField,
} from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import {
	useAddCategoryMutation,
	useEditCategoryMutation,
} from "../../../features/category/categoryApi";

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
	} = useForm({
		resolver: yupResolver(categorySchema),
	});

	const onSubmit = (data) => {
		if (edit) {
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

	return (
		<Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
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
				{...register("slug")}
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
					disabled={isLoading}
					type="button"
					color="inherit"
					onClick={closeModal}
				>
					Cancel
				</Button>
				<Button disabled={isLoading} type="submit" color="primary">
					Submit
				</Button>
			</Stack>
		</Box>
	);
}
