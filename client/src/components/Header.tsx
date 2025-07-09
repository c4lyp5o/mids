import type React from "react";
import Clock from "./Clock";
import Info from "./Info";

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

interface HeaderProps {
	mosqueData: MosqueData | null;
	prayerTimesData: PrayerTimesData | null;
}

const Header: React.FC<HeaderProps> = ({ mosqueData, prayerTimesData }) => {
	return (
		<div className="flex justify-between items-center px-2 mb-2 bg-white/60 rounded-xl backdrop-blur-sm shadow-lg">
			<Info
				mosqueData={mosqueData}
				prayerTimesData={prayerTimesData}
				style="modern"
			/>
			<div className="text-right relative">
				<Clock prayerTimesData={prayerTimesData} style="minimal" />
			</div>
		</div>
	);
};

export default Header;
