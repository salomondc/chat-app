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

export const TextField = (props: OutlinedInputProps & TextFieldProps) => {
	return (
		<FormControl>
			<InputLabel
				className="font-urbanist"
				error={props.error}>
				{props.label}
			</InputLabel>
			<OutlinedInput
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
