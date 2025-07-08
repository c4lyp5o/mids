import { useState, useEffect } from "react";

interface ScrollingNotificationsProps {
	notifications: string[];
}

const ScrollingNotifications = ({
	notifications,
}: ScrollingNotificationsProps) => {
	const [isPaused, setIsPaused] = useState(false);
	const [animationDuration, setAnimationDuration] = useState(30);

	// Calculate animation duration based on content length for consistent speed
	useEffect(() => {
		const totalLength = notifications.join(" • ").length;
		const baseDuration = Math.max(15, Math.min(60, totalLength * 0.1));
		setAnimationDuration(baseDuration);
	}, [notifications]);

	// Don't render if no notifications
	if (!notifications || notifications.length === 0) {
		return null;
	}

	const scrollingStyle = `
    @keyframes scroll-rtl {
      0% { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
    }
    
    .scrolling-text {
      animation: scroll-rtl ${animationDuration}s linear infinite;
      animation-play-state: ${isPaused ? "paused" : "running"};
      white-space: nowrap;
      transition: all 0.3s ease;
    }
    
    .scrolling-text:hover {
      animation-play-state: paused;
    }
    
    @media (max-width: 768px) {
      .scrolling-text {
        animation-duration: ${animationDuration * 0.8}s;
      }
    }
  `;

	const formatNotifications = () => {
		const joinedNotifications = notifications
			.filter((n) => n.trim() !== "") // Filter empty notifications
			.join(" 🔔 ");

		// Repeat content multiple times for seamless loop
		return `${joinedNotifications} 🔔 ${joinedNotifications} 🔔 ${joinedNotifications}`;
	};

	return (
		<>
			<style>{scrollingStyle}</style>
			<div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 text-white py-4 md:py-6 overflow-hidden shadow-2xl border-t-4 border-emerald-500">
				{/* Background Pattern */}
				<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

				{/* Content Container */}
				<div className="relative">
					{/* Pause Button
          <button
            onClick={() => setIsPaused(!isPaused)}
            className='absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-emerald-600/80 hover:bg-emerald-500 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm border border-white/20'
            title={isPaused ? 'Resume notifications' : 'Pause notifications'}
          >
            {isPaused ? (
              <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z'
                  clipRule='evenodd'
                />
              </svg>
            ) : (
              <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z'
                  clipRule='evenodd'
                />
              </svg>
            )}
          </button> */}

					{/* Scrolling Text */}
					<div className="scrolling-text text-xl md:text-2xl lg:text-3xl font-medium pl-16 pr-4">
						<span className="inline-flex items-center gap-2">
							{formatNotifications()}
						</span>
					</div>

					{/* Fade Effects */}
					<div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-emerald-800 to-transparent pointer-events-none" />
					<div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-emerald-800 to-transparent pointer-events-none" />
				</div>

				{/* Notification Count Badge */}
				{/* {notifications.length > 0 && (
          <div className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium border border-white/30'>
            {notifications.length} notification
            {notifications.length !== 1 ? 's' : ''}
          </div>
        )} */}
			</div>
		</>
	);
};

export default ScrollingNotifications;
