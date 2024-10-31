"use client";
import { LoginForm } from "./LoginForm";

export const LoginContainer = () => {
	return (
		<div className="min-w-[508px] flex flex-col max-lg:mx-auto max-sm:min-w-0 max-sm:w-full">
			<LoginForm />
		</div>
	);
};
