import { useNavigate } from "react-router";

import ModernClock from "../components/Clock";

const ClockDemo = () => {
	const navigate = useNavigate();

	return (
		<div className="p-8 bg-gray-100 min-h-screen">
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
			<h1 className="text-4xl font-bold text-center mb-8">
				Clock Style Showcase
			</h1>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				<div className="bg-white p-6 rounded-xl shadow-lg">
					<h2 className="text-2xl font-semibold mb-4 text-center">
						Default Style
					</h2>
					<div className="flex justify-center">
						<ModernClock style="default" />
					</div>
					<p className="mt-6 text-gray-600 text-center">
						The original blue/purple gradient design with animated elements.
					</p>
				</div>

				<div className="bg-white p-6 rounded-xl shadow-lg">
					<h2 className="text-2xl font-semibold mb-4 text-center">
						Minimal Style
					</h2>
					<div className="flex justify-center">
						<ModernClock style="minimal" />
					</div>
					<p className="mt-6 text-gray-600 text-center">
						A clean, minimalist design with simple typography and layout.
					</p>
				</div>

				<div className="bg-white p-6 rounded-xl shadow-lg">
					<h2 className="text-2xl font-semibold mb-4 text-center">
						Elegant Style
					</h2>
					<div className="flex justify-center">
						<ModernClock style="elegant" />
					</div>
					<p className="mt-6 text-gray-600 text-center">
						A warm amber-themed design with serif typography for a classic look.
					</p>
				</div>

				<div className="bg-white p-6 rounded-xl shadow-lg">
					<h2 className="text-2xl font-semibold mb-4 text-center">
						Dark Style
					</h2>
					<div className="flex justify-center">
						<ModernClock style="dark" />
					</div>
					<p className="mt-6 text-gray-600 text-center">
						A sleek dark mode design with emerald accents for night viewing.
					</p>
				</div>

				<div className="bg-white p-6 rounded-xl shadow-lg">
					<h2 className="text-2xl font-semibold mb-4 text-center">
						Retro Style
					</h2>
					<div className="flex justify-center">
						<ModernClock style="retro" />
					</div>
					<p className="mt-6 text-gray-600 text-center">
						A vintage-inspired design with textured background and bold
						typography.
					</p>
				</div>

				<div className="bg-white p-6 rounded-xl shadow-lg">
					<h2 className="text-2xl font-semibold mb-4 text-center">
						Digital Style
					</h2>
					<div className="flex justify-center">
						<ModernClock style="digital" />
					</div>
					<p className="mt-6 text-gray-600 text-center">
						A classic LED digital clock with glowing red display on black
						background.
					</p>
				</div>
			</div>

			<div className="mt-12 text-center">
				<h2 className="text-2xl font-semibold mb-4">How to Use</h2>
				<div className="bg-gray-800 text-gray-100 p-4 rounded-lg inline-block text-left">
					<pre className="font-mono">
						{`// Import the component
import ModernClock from "../components/ModernClock";

// Use with default style
<ModernClock />

// Or specify a style
<ModernClock style="minimal" />
<ModernClock style="elegant" />
<ModernClock style="dark" />
<ModernClock style="retro" />
<ModernClock style="digital" />

// Pass prayer times data
<ModernClock 
  prayerTimesData={prayerTimesData} 
  style="default" 
/>`}
					</pre>
				</div>
			</div>
		</div>
	);
};

export default ClockDemo;
