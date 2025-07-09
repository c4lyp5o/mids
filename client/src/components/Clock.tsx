import { useEffect, useState } from "react";

interface PrayerTimesData {
	today?: {
		date?: string;
		hijri?: string;
	};
}

interface ClockProps {
	prayerTimesData?: PrayerTimesData | null;
	className?: string;
	style?: "default" | "minimal" | "elegant" | "dark" | "retro" | "digital";
}

const Clock: React.FC<ClockProps> = ({
	prayerTimesData,
	style = "default",
}) => {
	const [modernTime, setModernTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			setModernTime(new Date());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const formatTime = (time: Date) => {
		return time.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			hour12: false,
		});
	};

	const formatDate = (time: Date) => {
		return time.toLocaleDateString("en-US", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	// Different style variants
	const renderClockStyle = () => {
		switch (style) {
			case "minimal":
				return (
					<div className="relative p-2 rounded-lg bg-white/80">
						<div className="relative z-10">
							<div className="font-mono text-6xl font-bold text-gray-800 mb-2">
								{formatTime(modernTime)}
							</div>
							<div className="text-xl font-medium text-gray-600">
								{prayerTimesData?.today?.date || formatDate(modernTime)}
							</div>
							{prayerTimesData?.today?.hijri && (
								<div className="text-lg text-gray-500 font-medium">
									{prayerTimesData.today.hijri}
								</div>
							)}
						</div>
					</div>
				);
			case "elegant":
				return (
					<div className="relative p-3 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200">
						<div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 to-amber-200/50 rounded-xl" />
						<div className="relative z-10">
							<div className="font-serif text-7xl font-bold text-amber-800 mb-3">
								{formatTime(modernTime)}
							</div>
							<div className="text-2xl font-medium text-amber-700/90 mb-1">
								{prayerTimesData?.today?.date || formatDate(modernTime)}
							</div>
							{prayerTimesData?.today?.hijri && (
								<div className="text-xl text-amber-600/80 font-medium mb-2">
									{prayerTimesData.today.hijri}
								</div>
							)}
							<div className="flex justify-center mt-3">
								<div className="w-1 h-6 bg-amber-400/70 rounded-full mx-1" />
								<div className="w-1 h-6 bg-amber-500/70 rounded-full mx-1" />
								<div className="w-1 h-6 bg-amber-600/70 rounded-full mx-1" />
							</div>
						</div>
					</div>
				);
			case "dark":
				return (
					<div className="relative p-3 rounded-xl bg-gray-900 border border-gray-700 shadow-2xl">
						<div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl" />
						<div className="relative z-10">
							<div className="font-mono text-7xl font-bold text-emerald-400 mb-3">
								{formatTime(modernTime)}
							</div>
							<div className="text-xl font-medium text-gray-300 mb-1">
								{prayerTimesData?.today?.date || formatDate(modernTime)}
							</div>
							{prayerTimesData?.today?.hijri && (
								<div className="text-lg text-emerald-500/80 font-medium mb-2">
									{prayerTimesData.today.hijri}
								</div>
							)}
							<div className="flex justify-center mt-3 space-x-2">
								<div className="w-8 h-1 bg-emerald-500/70 rounded-full" />
								<div className="w-8 h-1 bg-emerald-400/70 rounded-full" />
								<div className="w-8 h-1 bg-emerald-300/70 rounded-full" />
							</div>
						</div>
					</div>
				);
			case "retro":
				return (
					<div className="relative p-4 bg-yellow-100 border-4 border-orange-900">
						<div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmNGUwIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmNWQwYTkiPjwvcmVjdD4KPC9zdmc+')] opacity-30" />
						<div className="relative z-10">
							<div className="font-['Courier_New'] text-6xl font-bold text-orange-800 mb-2 text-center tracking-widest">
								{formatTime(modernTime)}
							</div>
							<div className="text-xl font-bold text-orange-900 mb-1 text-center uppercase tracking-wide">
								{prayerTimesData?.today?.date || formatDate(modernTime)}
							</div>
							{prayerTimesData?.today?.hijri && (
								<div className="text-lg text-orange-700 font-bold mb-2 text-center">
									{prayerTimesData.today.hijri}
								</div>
							)}
							<div className="flex justify-center mt-3">
								<div className="w-full h-2 bg-orange-800 rounded-none border border-orange-900" />
							</div>
						</div>
					</div>
				);
			case "digital":
				return (
					<div className="relative p-3 rounded-md bg-black border-2 border-gray-800">
						<div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black rounded-md" />
						<div className="relative z-10">
							<div
								className="font-mono text-7xl font-bold text-red-500 mb-3 text-center"
								style={{ textShadow: "0 0 10px rgba(239, 68, 68, 0.7)" }}
							>
								{formatTime(modernTime)}
							</div>
							<div className="text-xl font-medium text-red-400 mb-1 text-center">
								{prayerTimesData?.today?.date || formatDate(modernTime)}
							</div>
							{prayerTimesData?.today?.hijri && (
								<div className="text-lg text-red-300 font-medium mb-2 text-center">
									{prayerTimesData.today.hijri}
								</div>
							)}
							<div className="grid grid-cols-7 gap-1 mt-3">
								{Array.from({ length: 7 }).map((_, i) => (
									<div
										key={`segment-${i}-${modernTime.getTime()}`}
										className="h-1 bg-red-500 rounded-none opacity-70"
									/>
								))}
							</div>
						</div>
					</div>
				);
			default: // "default" style - the original blue/purple gradient design
				return (
					<div className="relative p-2 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/30">
						{/* Decorative background elements */}
						<div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-xl" />
						<div className="absolute top-2 right-2 w-12 h-12 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-md" />
						<div className="absolute bottom-2 left-2 w-10 h-10 bg-gradient-to-tr from-purple-400/20 to-blue-400/20 rounded-full blur-md" />

						{/* Content */}
						<div className="relative z-10">
							{/* Digital Time Display */}
							<div className="font-mono text-8xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-wider mb-4 animate-pulse">
								{formatTime(modernTime)}
							</div>

							{/* Date Display */}
							<div className="text-2xl font-medium text-gray-700/90 mb-2">
								{prayerTimesData?.today?.date || formatDate(modernTime)}
							</div>

							{/* Hijri Date */}
							{prayerTimesData?.today?.hijri && (
								<div className="text-xl text-purple-600/80 font-medium mb-3">
									{prayerTimesData.today.hijri}
								</div>
							)}

							{/* Animated seconds indicator */}
							<div className="flex justify-center mt-4">
								<div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
								<div
									className="w-2 h-2 bg-purple-500 rounded-full animate-ping mx-2"
									style={{ animationDelay: "0.5s" }}
								/>
								<div
									className="w-2 h-2 bg-blue-500 rounded-full animate-ping"
									style={{ animationDelay: "1s" }}
								/>
							</div>
						</div>
					</div>
				);
		}
	};

	return renderClockStyle();
};

export default Clock;
