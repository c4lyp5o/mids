import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

import Header from "../components/Header";
import PrayerCards from "../components/PrayerCards";
import ImageCarousel from "../components/ImageCarousel";
import ScrollingNotifications from "../components/ScrollingNotifications";

interface PrayerData {
	day: string;
	hijri: string;
	date: string;
	imsak: string;
	fajr: string;
	syuruk: string;
	dhuhr: string;
	jumaat: string;
	asr: string;
	maghrib: string;
	isha: string;
}

interface NextPrayer {
	hours: number;
	minutes: number;
	seconds: number;
	milliseconds: number;
	name: string;
}

interface MosqueData {
	mosqueName: string;
	zone: string;
	email: string;
	password: string;
	notifications?: {
		id: number;
		text: string;
	}[];
	images?: {
		filename: string;
		path: string;
		uploadedAt: string;
		_id: string;
		url?: string;
	}[];
}

interface PrayerTimesData {
	data: PrayerData[];
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

const Landing = () => {
	const navigate = useNavigate();
	const { mosqueId } = useParams<{ mosqueId: string }>();
	const [mosqueData, setMosqueData] = useState<MosqueData | null>(null);
	const [prayerTimesData, setPrayerTimesData] =
		useState<PrayerTimesData | null>(null);
	const [remainingTime, setRemainingTime] = useState<
		| {
				hours: number;
				minutes: number;
				seconds: number;
		  }
		| undefined
	>(undefined);

	useEffect(() => {
		const token = localStorage.getItem("mosqueToken");

		const fetchMosqueData = async () => {
			// console.log('Fetching mosque data...');
			const response = await axios.get<MosqueData>(
				`/api/v1/mosque/${mosqueId}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				},
			);
			// console.log('Fetched mosque data:', response.data);
			// console.log('Images from response:', response.data.images);
			setMosqueData(response.data);
			return response.data;
		};

		const fetchPrayerTimesData = async (zone: string) => {
			if (!zone) {
				console.error("Zone is undefined, cannot fetch prayer times data.");
				return;
			}
			// console.log('Fetching prayer times...');
			const response = await axios.get<PrayerTimesData>(
				`https://waktusolat.me/api/v1/waktusolat/today/${zone}`,
			);
			// console.log('Fetched prayer times data:', response.data);
			setPrayerTimesData(response.data);
		};

		fetchMosqueData()
			.then((data) => {
				if (data?.zone) {
					fetchPrayerTimesData(data.zone.toLocaleLowerCase());
				}
			})
			.catch((error) => {
				console.error("Error in fetching mosque data:", error);
				navigate("/", {
					state: { from: window.location.pathname },
				});
			});
	}, [mosqueId, navigate]);

	useEffect(() => {
		const calculateRemainingTime = () => {
			if (!prayerTimesData?.nextSolat || !prayerTimesData.data[0])
				return undefined;

			const nextPrayerTime = prayerTimesData.data[0][
				prayerTimesData.nextSolat.name as keyof PrayerData
			] as string;
			const [hours, minutes] = nextPrayerTime.split(":").map(Number);

			const now = new Date();
			const nextPrayer = new Date();
			nextPrayer.setHours(hours, minutes, 0);

			if (nextPrayer < now) {
				nextPrayer.setDate(nextPrayer.getDate() + 1);
			}

			const diff = nextPrayer.getTime() - now.getTime();
			const hours_remaining = Math.floor(diff / (1000 * 60 * 60));
			const minutes_remaining = Math.floor(
				(diff % (1000 * 60 * 60)) / (1000 * 60),
			);
			const seconds_remaining = Math.floor((diff % (1000 * 60)) / 1000);

			// If countdown reaches zero (with 1-minute buffer for preparation)
			if (diff <= 60000) {
				// 60000ms = 1 minute
				navigate(`/prayernow/${mosqueId}`);
				return undefined;
			}

			return {
				hours: hours_remaining,
				minutes: minutes_remaining,
				seconds: seconds_remaining,
			};
		};

		const timer = setInterval(() => {
			setRemainingTime(calculateRemainingTime());
		}, 1000);

		return () => clearInterval(timer);
	}, [prayerTimesData?.data, prayerTimesData?.nextSolat, mosqueId, navigate]);

	// Check if today is Friday to show Jumaat instead of Dhuhr
	const today = new Date();
	const isFriday = today.getDay() === 5;

	const prayerTimesArray =
		prayerTimesData?.nextSolat?.name !== "fajr"
			? [
					{ name: "Fajr", time: prayerTimesData?.data[0]?.fajr },
					{
						name: isFriday ? "Jumaat" : "Dhuhr",
						time: isFriday
							? prayerTimesData?.data[0]?.jumaat
							: prayerTimesData?.data[0]?.dhuhr,
					},
					{ name: "Asr", time: prayerTimesData?.data[0]?.asr },
					{ name: "Maghrib", time: prayerTimesData?.data[0]?.maghrib },
					{ name: "Isha", time: prayerTimesData?.data[0]?.isha },
				]
			: [
					{ name: "Fajr", time: prayerTimesData?.data[1]?.fajr },
					{
						name: isFriday ? "Jumaat" : "Dhuhr",
						time: isFriday
							? prayerTimesData?.data[1]?.jumaat
							: prayerTimesData?.data[1]?.dhuhr,
					},
					{ name: "Asr", time: prayerTimesData?.data[1]?.asr },
					{ name: "Maghrib", time: prayerTimesData?.data[1]?.maghrib },
					{ name: "Isha", time: prayerTimesData?.data[1]?.isha },
				];

	if (!mosqueData || !prayerTimesData) return null;

	return (
		<div className="min-h-screen bg-gradient-to-br from-emerald-200 via-gray-50 to-teal-200">
			{/* Header */}
			<Header mosqueData={mosqueData} prayerTimesData={prayerTimesData} />
			{/* Prayer Times Cards */}
			<PrayerCards
				prayerTimesData={prayerTimesData}
				prayerTimesArray={prayerTimesArray}
				remainingTime={remainingTime}
			/>
			{/* Image Carousel */}
			<ImageCarousel mosqueData={mosqueData} />
			{/* Scrolling Notifications */}
			<ScrollingNotifications
				notifications={mosqueData.notifications?.map((n) => n.text) ?? []}
			/>
		</div>
	);
};

export default Landing;
