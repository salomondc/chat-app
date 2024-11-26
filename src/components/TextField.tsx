import {
	FormControl,
	FormHelperText,
	InputLabel,
	OutlinedInput,
	OutlinedInputProps,
} from "@mui/material";

interface TextFieldProps {
	helpertext?: string;
}

export const TextField = ({
	required,
	ref,
	...props
}: OutlinedInputProps & TextFieldProps) => {
	return (
		<FormControl required={required}>
			<InputLabel
				className="font-urbanist"
				error={props.error}>
				{props.label}
			</InputLabel>
			<OutlinedInput
				autoComplete="new-password"
				className={`rounded-xl pr-6 font-urbanist bg-white`}
				slotProps={{
					input: {
						className: props.type == "password" ? "font-sans" : "",
					},
				}}
				{...props}
			/>
			<FormHelperText error={props.error}>{props.helpertext}</FormHelperText>
		</FormControl>
	);
};
