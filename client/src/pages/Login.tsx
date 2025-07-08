import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");
		try {
			const response = await axios.post("/api/v1/auth/login", {
				email,
				password,
			});
			const { mosque, token } = response.data;
			localStorage.setItem("mosqueToken", token);
			navigate(`/interstitial/${mosque._id}`);
		} catch (error) {
			console.error("Login error:", error);
			setError("Login failed. Please check your credentials and try again.");
		} finally {
			setIsLoading(false);
			setEmail("");
			setPassword("");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg transform transition-transform duration-200 hover:-translate-y-1">
				<div>
					<h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Welcome Back
					</h1>
				</div>
				{error && (
					<div
						className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
						role="alert"
					>
						{error}
					</div>
				)}
				<form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
					<div className="rounded-md shadow-sm space-y-4">
						<div>
							<label htmlFor="email" className="sr-only">
								Email address
							</label>
							<input
								id="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Email"
								required
								aria-required="true"
								aria-label="Email address"
								className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-colors duration-200"
							/>
						</div>
						<div>
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Password"
								required
								aria-required="true"
								aria-label="Password"
								className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-colors duration-200"
							/>
						</div>
					</div>

					<button
						type="submit"
						disabled={isLoading}
						aria-busy={isLoading}
						className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${
							isLoading
								? "bg-blue-400 cursor-not-allowed"
								: "bg-blue-600 hover:bg-blue-700"
						} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200`}
					>
						{isLoading ? "Signing in..." : "Sign In"}
					</button>
				</form>
				<p className="mt-2 text-center text-sm text-gray-600">
					Don't have an account?{" "}
					<a
						href="/signup"
						className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
					>
						Sign up
					</a>
				</p>
			</div>
		</div>
	);
};

export default Login;
