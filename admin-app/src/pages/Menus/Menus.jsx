import { Button, Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import { useGetMenusQuery } from "../../features/menu/menuApi";
import MenuForm from "./components/MenuForm";
import MenuTable from "./components/MenuTable";

export default function Menus() {
	const [openModal, setOpenModal] = useState(false);
	const [params, setParams] = useState("");

	const {
		data: menus,
		isLoading,
		isError,
		error: responseError,
	} = useGetMenusQuery(params);

	const toggleModal = () => setOpenModal((prevState) => !prevState);

	const closeModal = () => setOpenModal(false);

	return (
		<>
			<Stack direction={"row"} justifyContent={"space-between"} mb={2}>
				<Typography variant="h4" gutterBottom>
					Menus
				</Typography>
				<Button variant="contained" color="primary" onClick={toggleModal}>
					Add Menu
				</Button>
			</Stack>
			<Divider />
			<br />

			{isLoading ? <Loader /> : <MenuTable data={menus} />}

			{/* modal */}
			<Modal
				open={openModal}
				toggleModal={toggleModal}
				title="Add New Menu"
				size="md"
			>
				<MenuForm closeModal={closeModal} />
			</Modal>
		</>
	);
}
