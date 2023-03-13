import { yupResolver } from "@hookform/resolvers/yup";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	MenuItem,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useGetCategoriesQuery } from "../../../features/category/categoryApi";
import {
	useAddMenuMutation,
	useEditMenuMutation,
} from "../../../features/menu/menuApi";
import { getFormData } from "../../../utils/getFormData";
import { slugify } from "../../../utils/slugify";

const menuSchema = yup
	.object({
		name: yup.string().required().max(100),
		slug: yup.string().optional(),
		image: yup.mixed().required("Image is required"),
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

	const [slug, setSlug] = useState("");
	const [image, setImage] = useState(null);
	const [previewImage, setPreviewImage] = useState(null);

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
		watch,
	} = useForm({
		resolver: yupResolver(menuSchema),
	});

	const onSubmit = (data) => {
		if (edit) {
			const newData = { ...data, slug };
			if (image) {
				newData.image = image;
			} else {
				delete newData.image;
			}
			const formData = getFormData(newData);
			dispatch(
				editMenu({ data: formData, params: queryParams, id: editData.id })
			);
		} else {
			const newData = { ...data, image };
			const formData = getFormData(newData);
			dispatch(addMenu({ data: formData, params: queryParams }));
		}
	};

	useEffect(() => {
		if (isSuccess || editSuccess) {
			closeModal();

			if (edit) {
				toast.success("New menu updated successfully");
			} else {
				toast.success("New menu added successfully");
			}
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
				value={slug}
				{...register("slug")}
				onChange={(e) => setSlug(e.target.value)}
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
					defaultValue={edit ? editData.offer_price : 0}
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
			<Box mt={2}>
				{(previewImage || editData?.image) && (
					<img
						style={{ width: "100%", marginBottom: "5px" }}
						src={previewImage ? previewImage : editData?.image}
						alt="image preview"
					/>
				)}

				<Button variant="contained" fullWidth color="primary" component="label">
					<CameraAltIcon sx={{ mr: 2 }} />
					Upload Image
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
				</Button>

				{(errors?.image?.message || responseError?.data?.image) && (
					<Typography color="error">
						{errors?.image?.message || responseError?.data?.image}
					</Typography>
				)}
			</Box>

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
