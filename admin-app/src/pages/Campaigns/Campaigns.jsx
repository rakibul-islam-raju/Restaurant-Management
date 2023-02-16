import { Alert, Button, Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import {
	useDeleteCampaignMutation,
	useGetCampaignsQuery,
} from "../../features/campaign/campaignApi";
import CampaignForm from "./components/CampaignForm";
import CampaignTable from "./components/CampaignTable";

export default function Campaigns() {
	const dispatch = useDispatch();

	const [openModal, setOpenModal] = useState(false);
	const [params, setParams] = useState("");
	const [edit, setEdit] = useState(false);
	const [editData, setEditData] = useState(null);

	const {
		data: campaigns,
		isLoading,
		isError,
		error: responseError,
	} = useGetCampaignsQuery(params);

	const [
		deleteCampaign,
		{ isSuccess: deleteSuccess, error: deleteResponseError },
	] = useDeleteCampaignMutation();

	const closeModal = () => {
		setOpenModal(false);
		setEdit(false);
		setEditData(null);
	};

	const editCampaignHandler = (data) => {
		setEdit(true);
		setEditData(data);
		setOpenModal(true);
	};

	const deleteHandler = (id) => {
		const res = window.confirm("Do you want to delete this item?");
		if (res) {
			dispatch(deleteCampaign({ id, params }));
		}
	};

	return (
		<>
			<Stack direction={"row"} justifyContent={"space-between"} mb={2}>
				<Typography variant="h4" gutterBottom>
					Campaigns
				</Typography>
				<Button
					variant="contained"
					color="primary"
					onClick={() => setOpenModal(true)}
				>
					Add Campaign
				</Button>
			</Stack>
			<Divider />
			<br />

			{isLoading ? (
				<Loader />
			) : isError ? (
				<Alert severity="error">
					{responseError?.data?.detail ||
						deleteResponseError?.data?.detail ||
						"Something went wrong!"}
				</Alert>
			) : (
				<CampaignTable
					data={campaigns}
					editCampaignHandler={editCampaignHandler}
					deleteHandler={deleteHandler}
				/>
			)}

			{/* modal */}
			<Modal
				open={openModal}
				closeModal={closeModal}
				title={`${edit ? "Edit Campaign" : "Add New Campaign"}`}
				size="md"
			>
				<CampaignForm
					closeModal={closeModal}
					queryParams={params}
					edit={edit}
					editData={editData}
				/>
			</Modal>
		</>
	);
}
