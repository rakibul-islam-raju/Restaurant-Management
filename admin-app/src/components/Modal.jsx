import CloseIcon from "@mui/icons-material/Close";
import { Divider, IconButton, Stack, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function Modal({
	children,
	open,
	closeModal,
	title = "",
	size = "md",
}) {
	return (
		<Dialog
			open={open}
			onClose={closeModal}
			maxWidth={size}
			fullWidth
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			{title && (
				<DialogTitle id={title}>
					<Stack
						direction={"row"}
						justifyContent={"space-between"}
						alignItems={"center"}
						width="100%"
					>
						<Typography variant="h5">{title}</Typography>
						<IconButton onClick={closeModal}>
							<CloseIcon />
						</IconButton>
					</Stack>
				</DialogTitle>
			)}
			<Divider />

			<DialogContent>{children}</DialogContent>
		</Dialog>
	);
}
