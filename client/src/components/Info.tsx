import { useNavigate, useParams } from "react-router";

interface PrayerTimesData {
	negeri: string;
	nextSolat: NextPrayer;
	today: {
		day: string;
		hijri: string;
		date: string;
		time: string;
	};
	zone: string;
}

interface MosqueData {
	mosqueName: string;
	details?: string;
	zone: string;
}

interface NextPrayer {
	hours: number;
	minutes: number;
	seconds: number;
	milliseconds: number;
	name: string;
}

interface InfoProps {
	mosqueData: MosqueData | null;
	prayerTimesData: PrayerTimesData | null;
	style?: "default" | "compact" | "modern" | "elegant";
}

const Info: React.FC<InfoProps> = ({
	mosqueData,
	prayerTimesData,
	style = "default",
}) => {
	const navigate = useNavigate();
	const { mosqueId } = useParams<{ mosqueId: string }>();

	const renderInfoStyle = () => {
		switch (style) {
			case "compact":
				return (
					<div className="p-3 bg-white/80 rounded-lg">
						<div className="text-4xl font-bold text-emerald-700 group relative mb-1">
							{mosqueData?.mosqueName || "Mosque Name"}
							{renderSettingsButton()}
						</div>
						<div className="text-2xl text-gray-600 mb-1">
							{mosqueData?.details || "No details available"}
						</div>
						<div className="text-lg font-medium text-gray-700">
							{prayerTimesData?.zone || "Loading..."}
						</div>
					</div>
				);
			case "modern":
				return (
					<div className="p-4 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl">
						<div className="text-6xl font-bold text-teal-700 group relative mb-2">
							{mosqueData?.mosqueName || "Mosque Name"}
							{renderSettingsButton("teal")}
						</div>
						<div className="text-3xl text-teal-600/80 mb-2">
							{mosqueData?.details}
						</div>
						<div className="inline-block px-3 py-1 bg-teal-100 rounded-full text-lg font-medium text-teal-700">
							{prayerTimesData?.zone || "Loading..."}
						</div>
					</div>
				);
			case "elegant":
				return (
					<div className="p-5 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl">
						<div className="text-6xl font-serif font-bold text-amber-800 group relative mb-3">
							{mosqueData?.mosqueName || "Mosque Name"}
							{renderSettingsButton("amber")}
						</div>
						<div className="text-3xl font-serif text-amber-700/90 mb-3">
							{mosqueData?.details}
						</div>
						<div className="text-xl font-medium text-amber-600/90 border-t border-amber-200 pt-2">
							{prayerTimesData?.zone || "Loading..."}
						</div>
					</div>
				);
			default: // "default" style
				return (
					<div>
						<div className="text-7xl font-bold text-emerald-800 group relative">
							{mosqueData?.mosqueName || "Mosque Name"}
							{renderSettingsButton()}
						</div>
						<div className="text-4xl text-gray-600 mb-3">
							{mosqueData?.details}
						</div>
						<div className="text-xl font-bold text-gray-800 mb-2">
							{prayerTimesData?.zone || "Loading..."}
						</div>
					</div>
				);
		}
	};

	const renderSettingsButton = (color = "emerald") => {
		const colorClasses = {
			emerald: "text-emerald-600 hover:text-emerald-700",
			amber: "text-amber-600 hover:text-amber-700",
			teal: "text-teal-600 hover:text-teal-700",
		};

		const buttonColor =
			colorClasses[color as keyof typeof colorClasses] || colorClasses.emerald;

		return (
			<button
				type="button"
				onClick={() => {
					navigate(`/settings/${mosqueId}`);
				}}
				className={`absolute top-0 right-[-2rem] opacity-0 group-hover:opacity-100 transition-opacity`}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className={`h-8 w-8 ${buttonColor}`}
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<title>Settings</title>
					<path
						fillRule="evenodd"
						d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
						clipRule="evenodd"
					/>
				</svg>
			</button>
		);
	};

	return renderInfoStyle();
};

export default Info;
