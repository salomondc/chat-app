"use client";
import { IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button, Icons, TextField } from "..";
import { focusInputOnEmpty } from "@/utils/focusInputIfEmpty";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
	const [hidePassword, setHidePassword] = useState(true);
	const router = useRouter();

	const validationSchema = yup.object({
		user: yup.string().required("Username is required"),
		password: yup.string().required("Password is required"),
	});

	const { values, handleChange, handleBlur, touched, errors, handleSubmit } =
		useFormik({
			initialValues: {
				user: "",
				password: "",
			},
			validationSchema: validationSchema,
			onSubmit: () => {
				// console.log(values)
				router.push("/chat");
			},
		});

	return (
		<form
			id="login-form"
			onSubmit={handleSubmit}
			className="flex flex-col m-20 flex-grow justify-center gap-4 max-sm:m-4">
			<h1 className="text-2.5xl font-medium mx-auto">
				Sign in to your account
			</h1>
			<TextField
				id="user"
				value={values.user}
				onChange={handleChange}
				onBlur={handleBlur}
				error={touched.user && Boolean(errors.user)}
				helpertext={(touched.user && errors.user) || ""}
				label="Username"
			/>
			<div className="flex flex-col">
				<TextField
					id="password"
					value={values.password}
					onChange={handleChange}
					onBlur={handleBlur}
					error={touched.password && Boolean(errors.password)}
					label="Password"
					type={hidePassword ? "password" : "text"}
					helpertext={(touched.password && errors.password) || ""}
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={() => setHidePassword((x) => !x)}
								edge="end">
								{hidePassword ? <Icons.VisibilityOff /> : <Icons.Visibility />}
							</IconButton>
						</InputAdornment>
					}
				/>
			</div>

			<Button
				onClick={() => focusInputOnEmpty("#login-form")}
				type="submit">
				Sign in
			</Button>
		</form>
	);
};
