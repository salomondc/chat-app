import * as React from "react";
import Fade from "@mui/material/Fade";
import { Modal } from "@mui/material";
import { Button, Icons } from ".";

export interface NotificationModalProps {
	title?: string;
	description: string;
	excerpt?: string;
	onClose: () => void;
	onOpen?: () => void;
	open: boolean;
	indicator?: React.ReactNode;
	actionLabel?: string;
	isLoading?: boolean;
}

export const NotificationModal = ({
	title = "Information",
	description,
	excerpt,
	onClose,
	onOpen = () => {},
	open,
	indicator,
	actionLabel = "Ok",
	isLoading,
}: NotificationModalProps) => {
	const handleClose = () => {
		onClose();
	};

	React.useEffect(() => {
		if (open) {
			onOpen();
		}
	}, [open]);

	return (
		<Modal
			aria-labelledby="error-modal-title"
			aria-describedby="error-modal-description"
			className="fixed z-[1300] inset-0 flex items-center justify-center"
			open={open}
			onClose={handleClose}
			closeAfterTransition
			slots={{ backdrop: Backdrop }}>
			<Fade in={open}>
				<div className="absolute max-w-[500px] min-w-[200px] bg-white border rounded-xl p-4 gap-4 flex flex-col outline-none mx-8">
					<div className="flex items-center">
						<h2
							id="error-modal-title"
							className="font-bold text-xl">
							{title}
						</h2>
						<div className="ml-auto shrink-0">
							{indicator || <Icons.InfoCircle className="text-gray-300" />}
						</div>
					</div>

					<div className="border-t -mx-4" />
					<div className="flex flex-col gap-4 overflow-auto max-h-[400px]">
						<p
							id="error-modal-description"
							className="modal-description">
							{description}
						</p>
						{excerpt && (
							<span className="text-gray-400 italic whitespace-pre-wrap">
								{excerpt}
							</span>
						)}
					</div>
					<div className="ml-auto min-w-24">
						<Button
							isLoading={isLoading}
							fullWidth
							onClick={handleClose}>
							{actionLabel}
						</Button>
					</div>
				</div>
			</Fade>
		</Modal>
	);
};

const Backdrop = React.forwardRef<HTMLDivElement, { open?: boolean }>(
	function BackdropComponent(props, ref) {
		const { open, ...other } = props;
		return (
			<Fade
				in={open}
				className="fixed inset-0 bg-black/50 w-screen h-screen flex">
				<div
					ref={ref}
					{...other}
				/>
			</Fade>
		);
	}
);
