import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import kaabaImage from "../assets/images/kaaba-bg.jpg";

const PHASE_DURATION_SECONDS = 600;

const PrayerNow = () => {
	const { mosqueId } = useParams<{ mosqueId: string }>();
	const navigate = useNavigate();
	const [phase, setPhase] = useState<"countdown" | "prayer">("countdown");
	const [timeLeft, setTimeLeft] = useState(PHASE_DURATION_SECONDS);

	useEffect(() => {
		// Only set up the timer if timeLeft > 0
		if (timeLeft > 0) {
			const timer = setInterval(() => {
				setTimeLeft((prev) => prev - 1);
			}, 1000);

			return () => clearInterval(timer);
		} else {
			// Handle phase change when timeLeft reaches 0
			if (phase === "countdown") {
				setPhase("prayer");
				setTimeLeft(PHASE_DURATION_SECONDS);
			} else {
				navigate(`/landing/${mosqueId}`);
			}
		}
	}, [timeLeft, phase, mosqueId, navigate]);

	const formatTime = useCallback((seconds: number): string => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
			.toString()
			.padStart(2, "0")}`;
	}, []);

	if (!mosqueId) {
		navigate("/");
		return;
	}

	return (
		<div
			className="min-h-screen relative flex items-center justify-center"
			style={{
				backgroundImage: `url(${kaabaImage})`,
				backgroundSize: "100% 100%",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}
		>
			{phase === "prayer" && (
				<div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0" />
			)}
			<div className="relative z-10 bottom-75 text-center p-8 rounded-lg bg-black/40 backdrop-blur-sm">
				{phase === "countdown" ? (
					<>
						<h1 className="text-5xl font-bold text-white mb-8 drop-shadow-lg">
							Prayer Time Starting Soon
						</h1>
						<div
							className="text-9xl font-bold text-white font-mono mb-6 drop-shadow-lg"
							role="timer"
							aria-live="polite"
						>
							{formatTime(timeLeft)}
						</div>
						<p className="text-white text-2xl drop-shadow-lg">
							Prepare for prayer
						</p>
					</>
				) : (
					<>
						<h1
							className="text-6xl font-bold text-white mb-8 font-arabic"
							style={{ direction: "rtl" }}
						>
							أَقِيمُواْ الصَّلاَةَ
						</h1>
						<p className="text-emerald-100 text-xl">Prayer in progress</p>
					</>
				)}
			</div>
		</div>
	);
};

export default PrayerNow;
