import { ButtonProps, Button as MuiButton } from "@mui/material";

interface CustomButtonProps {
	muted?: boolean;
}

export const Button = <C extends React.ElementType>(
	props: ButtonProps<C, { component?: C }> & CustomButtonProps
) => {
	return (
		<MuiButton
			color="primary"
			variant="contained"
			className={`${
				props.muted
					? "text-base bg-primary-100/5 hover:bg-primary-100/10 text-foreground shadow-none hover:shadow-none"
					: "text-lg bg-primary-100 hover:bg-primary-100/80 font-semibold "
			} font-urbanist normal-case rounded-xl p-3`}
			{...props}
		/>
	);
};
