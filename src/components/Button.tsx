import { ButtonProps, Button as MuiButton } from "@mui/material";
import { Icons } from ".";

interface CustomButtonProps {
	muted?: boolean;
	isLoading?: boolean;
}

export const Button = <C extends React.ElementType>({
	muted,
	isLoading,
	...props
}: ButtonProps<C, { component?: C }> & CustomButtonProps) => {
	return (
		<MuiButton
			color="primary"
			variant="contained"
			className={`${
				muted
					? "text-base bg-primary-100/5 hover:bg-primary-100/10 text-foreground shadow-none hover:shadow-none"
					: props.disabled || isLoading
					? "text-lg bg-gray-200 font-semibold"
					: "text-lg bg-primary-100 hover:bg-primary-100/80 font-semibold "
			} font-urbanist normal-case rounded-xl p-3`}
			{...props}
			disabled={props.disabled || isLoading}>
			{isLoading ? <Icons.Loading /> : props.children}
		</MuiButton>
	);
};
