import type React from "react";
import { useNavigate } from "react-router";
import Info from "../components/Info";

const InfoDemo: React.FC = () => {
	const navigate = useNavigate();
	// Mock data for demonstration
	const mockMosqueData = {
		mosqueName: "Masjid Al-Nur",
		details: "Community Islamic Center",
		zone: "KUL01",
	};

	const mockPrayerTimesData = {
		negeri: "Selangor",
		nextSolat: {
			hours: 2,
			minutes: 30,
			seconds: 0,
			milliseconds: 0,
			name: "Asr",
		},
		today: {
			day: "Monday",
			hijri: "15 Ramadan 1445",
			date: "March 25, 2024",
			time: "10:30:00",
		},
		zone: "Kuala Lumpur & Putrajaya",
	};

	return (
		<div className="container mx-auto p-6 max-w-5xl">
			<button
				type="button"
				onClick={() => navigate(-1)}
				className="absolute left-0 top-0 flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 group"
			>
				<svg
					className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<title>Back</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M15 19l-7-7 7-7"
					/>
				</svg>
				<span className="font-medium">Back</span>
			</button>
			<h1 className="text-4xl font-bold text-center mb-8 text-emerald-800">
				Info Component Styles
			</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
				{/* Default Style */}
				<div className="bg-white/80 p-6 rounded-xl shadow-md">
					<h2 className="text-2xl font-bold mb-4 text-emerald-700">
						Default Style
					</h2>
					<div className="bg-gray-50 p-4 rounded-lg">
						<Info
							mosqueData={mockMosqueData}
							prayerTimesData={mockPrayerTimesData}
							style="default"
						/>
					</div>
					<div className="mt-4 text-gray-700">
						<p>
							The default style maintains the original design with large, bold
							mosque name and clean typography.
						</p>
					</div>
				</div>

				{/* Compact Style */}
				<div className="bg-white/80 p-6 rounded-xl shadow-md">
					<h2 className="text-2xl font-bold mb-4 text-emerald-700">
						Compact Style
					</h2>
					<div className="bg-gray-50 p-4 rounded-lg">
						<Info
							mosqueData={mockMosqueData}
							prayerTimesData={mockPrayerTimesData}
							style="compact"
						/>
					</div>
					<div className="mt-4 text-gray-700">
						<p>
							A more compact version with reduced spacing and font sizes, ideal
							for smaller displays or when space is limited.
						</p>
					</div>
				</div>

				{/* Modern Style */}
				<div className="bg-white/80 p-6 rounded-xl shadow-md">
					<h2 className="text-2xl font-bold mb-4 text-emerald-700">
						Modern Style
					</h2>
					<div className="bg-gray-50 p-4 rounded-lg">
						<Info
							mosqueData={mockMosqueData}
							prayerTimesData={mockPrayerTimesData}
							style="modern"
						/>
					</div>
					<div className="mt-4 text-gray-700">
						<p>
							A fresh, modern design with teal gradients and a pill-shaped zone
							indicator for a contemporary look.
						</p>
					</div>
				</div>

				{/* Elegant Style */}
				<div className="bg-white/80 p-6 rounded-xl shadow-md">
					<h2 className="text-2xl font-bold mb-4 text-emerald-700">
						Elegant Style
					</h2>
					<div className="bg-gray-50 p-4 rounded-lg">
						<Info
							mosqueData={mockMosqueData}
							prayerTimesData={mockPrayerTimesData}
							style="elegant"
						/>
					</div>
					<div className="mt-4 text-gray-700">
						<p>
							A sophisticated design with serif fonts, amber color scheme, and
							subtle border details for a refined appearance.
						</p>
					</div>
				</div>
			</div>

			<div className="mt-12 text-center">
				<h2 className="text-2xl font-semibold mb-4">How to Use</h2>
				<div className="bg-gray-800 text-gray-100 p-4 rounded-lg inline-block text-left">
					<pre className="font-mono">
						{`// Import the component
import Info from "../components/Info";

// Use with default style
<Info />

// Or specify a style
<Info style="compact" />
<Info style="modern" />
<Info style="elegant" />

// In your component
<Info 
  mosqueData={mosqueData} 
  prayerTimesData={prayerTimesData} 
  style="modern" 
/>`}
					</pre>
				</div>
			</div>
		</div>
	);
};

export default InfoDemo;
