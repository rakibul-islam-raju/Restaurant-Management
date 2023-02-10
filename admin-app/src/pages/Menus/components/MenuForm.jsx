import { yupResolver } from "@hookform/resolvers/yup";
import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	MenuItem,
	Stack,
	TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { useGetCategoriesQuery } from "../../../features/category/categoryApi";
import {
	useAddMenuMutation,
	useEditMenuMutation,
} from "../../../features/menu/menuApi";

const menuSchema = yup
	.object({
		name: yup.string().required().max(100),
		slug: yup.string().optional(),
		price: yup.number().required(),
		offer_price: yup.number().optional(),
		description: yup.string().required(),
		cook_time: yup.number().required(),
		category: yup.number().required(),
		is_active: yup.boolean().optional(),
	})
	.required();

export default function MenuForm({ closeModal, queryParams, edit, editData }) {
	const dispatch = useDispatch();

	const [addMenu, { isLoading, error: responseError, isSuccess }] =
		useAddMenuMutation();

	const [
		editMenu,
		{
			isLoading: editLoading,
			isSuccess: editSuccess,
			error: editResponseError,
		},
	] = useEditMenuMutation();

	const { data: categories } = useGetCategoriesQuery();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(menuSchema),
	});

	const onSubmit = (data) => {
		if (edit) {
			dispatch(editMenu({ data, params: queryParams, id: editData.id }));
		} else {
			dispatch(addMenu({ data, params: queryParams }));
		}
	};

	useEffect(() => {
		if (isSuccess || editSuccess) {
			closeModal();

			// TODO: toast alert
		}
	}, [isSuccess, editSuccess]);

	return (
		<Box component={"form"} onSubmit={handleSubmit(onSubmit)} noValidate>
			<TextField
				variant="standard"
				margin="normal"
				required
				fullWidth
				label="Menu Name"
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
			<Stack
				direction={"row"}
				justifyContent="space-between"
				alignItems={"center"}
				gap={3}
			>
				<TextField
					variant="standard"
					margin="normal"
					type="number"
					fullWidth
					required
					label="Price"
					defaultValue={edit ? editData.price : ""}
					{...register("price")}
					error={errors.price?.message || responseError?.data?.price}
					helperText={errors.price?.message || responseError?.data?.price}
				/>
				<TextField
					variant="standard"
					margin="normal"
					type="number"
					fullWidth
					label="Discount Price"
					defaultValue={edit ? editData.offer_price : ""}
					{...register("offer_price")}
					error={
						errors.offer_price?.message || responseError?.data?.offer_price
					}
					helperText={
						errors.offer_price?.message || responseError?.data?.offer_price
					}
				/>
			</Stack>
			<TextField
				variant="standard"
				margin="normal"
				required
				type="text"
				fullWidth
				label="Description"
				multiline
				rows={3}
				defaultValue={edit ? editData.description : ""}
				{...register("description")}
				error={errors.description?.message || responseError?.data?.description}
				helperText={
					errors.description?.message || responseError?.data?.description
				}
			/>
			<Stack
				direction={"row"}
				justifyContent="space-between"
				alignItems={"center"}
				gap={3}
			>
				<TextField
					variant="standard"
					margin="normal"
					type="number"
					fullWidth
					required
					label="Est. Cooking Time"
					defaultValue={edit ? editData.cook_time : ""}
					{...register("cook_time")}
					error={errors.cook_time?.message || responseError?.data?.cook_time}
					helperText={
						errors.cook_time?.message || responseError?.data?.cook_time
					}
				/>
				<TextField
					select
					variant="standard"
					margin="normal"
					fullWidth
					required
					label="Category"
					defaultValue={edit ? editData.category.id : ""}
					{...register("category")}
					error={errors.category?.message || responseError?.data?.category}
					helperText={errors.category?.message || responseError?.data?.category}
				>
					{categories?.results.length > 0 &&
						categories.results.map((option) => (
							<MenuItem key={option.id} value={option.id}>
								{option.name}
							</MenuItem>
						))}
				</TextField>
			</Stack>

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
