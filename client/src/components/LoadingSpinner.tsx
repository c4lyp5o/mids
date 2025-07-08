const LoadingSpinner = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-emerald-50 via-gray-50 to-teal-50 flex items-center justify-center">
			<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-emerald-600" />
		</div>
	);
};

export default LoadingSpinner;
