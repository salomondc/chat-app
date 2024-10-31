"use client";
import { FormHelperText, IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button, Icons, TextField } from "..";
import { focusInputOnEmpty } from "@/utils/focusInputOnEmpty";
import { useRouter } from "next/navigation";
import HCaptcha from "@hcaptcha/react-hcaptcha";

export const LoginForm = () => {
	const [hidePassword, setHidePassword] = useState(true);
	const router = useRouter();

	const validationSchema = yup.object({
		user: yup.string().required("Phone or email is required"),
		password: yup.string().required("Password is required"),
		captcha: yup.string().required("Captcha is required"),
	});

	const handleVerify = (token: string) => {
		setFieldValue("captcha", token);
	};

	const {
		values,
		handleChange,
		handleBlur,
		touched,
		errors,
		handleSubmit,
		setFieldValue,
	} = useFormik({
		initialValues: {
			user: "",
			password: "",
			captcha: "",
		},
		validationSchema: validationSchema,
		onSubmit: () => {
			// alert(JSON.stringify(values, null, 2));
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
				label="Phone number or email"
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
				<span className="ml-auto text-primary-100 hover:underline cursor-pointer active:opacity-50 select-none">
					Forgot password?
				</span>
			</div>

			<Button
				onClick={() => focusInputOnEmpty("#login-form")}
				type="submit">
				Sign in
			</Button>
			<div className="mx-auto">
				<HCaptcha
					sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_KEY!}
					onVerify={handleVerify}
				/>

				<FormHelperText error={touched.captcha && Boolean(errors.captcha)}>
					{touched.captcha && errors.captcha}
				</FormHelperText>
			</div>
			<div className="flex items-center my-2">
				<div className="flex-grow border-t" />
				<span className="text-dark-secondary mx-4">Or</span>
				<div className="flex-grow border-t" />
			</div>
			<Button muted>
				<Icons.Apple className="ml-2 mr-4" />
				Sign in with Apple ID
			</Button>
			<Button muted>
				<Icons.Google className="mr-4" />
				Sign in with Google
			</Button>
			<Button muted>
				<Icons.Facebook className="ml-4 mr-4" />
				Sign in with Facebook
			</Button>
			<span className="text-lg font-medium mx-auto mt-2">
				Don’t you have an account?{" "}
				<span className="ml-auto text-primary-100 hover:underline cursor-pointer active:opacity-50 select-none">
					Sign up
				</span>
			</span>
		</form>
	);
};
