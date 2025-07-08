import { useNavigate } from "react-router";

const NotFound = () => {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8 text-center">
				<div>
					<h1 className="text-9xl font-extrabold text-blue-600">404</h1>
					<h2 className="mt-4 text-3xl font-bold text-gray-900">
						Page Not Found
					</h2>
					<p className="mt-2 text-gray-600">
						Sorry, we couldn't find the page you're looking for.
					</p>
				</div>
				<div className="mt-8">
					<button
						type="button"
						onClick={() => navigate(-1)}
						className="mr-4 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-lg text-blue-600 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
					>
						Go Back
					</button>
					<button
						type="button"
						onClick={() => navigate("/")}
						className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
					>
						Go Home
					</button>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
