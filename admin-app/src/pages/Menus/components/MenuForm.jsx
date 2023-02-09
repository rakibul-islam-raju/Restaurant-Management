import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, MenuItem, Stack, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { useGetCategoriesQuery } from "../../../features/category/categoryApi";
import { useAddMenuMutation } from "../../../features/menu/menuApi";

const menuSchema = yup
	.object({
		name: yup.string().required().max(100),
		slug: yup.string().optional(),
		price: yup.number().required(),
		offer_price: yup.number().optional(),
		description: yup.string().required(),
		cook_time: yup.number().required(),
		category: yup.number().required(),
	})
	.required();

export default function MenuForm({ closeModal, queryParams }) {
	const dispatch = useDispatch();

	const [addMenu, { isLoading, isError, error: responseError, isSuccess }] =
		useAddMenuMutation();

	const { data: categories } = useGetCategoriesQuery();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(menuSchema),
	});

	const onSubmit = (data) => {
		dispatch(addMenu({ data, params: queryParams }));
	};

	useEffect(() => {
		if (isSuccess) {
			closeModal;

			// TODO: toast alert
		}
	}, [isSuccess]);

	return (
		<Box component={"form"} onSubmit={handleSubmit(onSubmit)} noValidate>
			<TextField
				variant="standard"
				margin="normal"
				required
				fullWidth
				label="Menu Name"
				{...register("name")}
				error={errors.name?.message || responseError?.data?.name}
				helperText={errors.name?.message || responseError?.data?.name}
			/>
			<TextField
				variant="standard"
				margin="normal"
				fullWidth
				label="Slug"
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
