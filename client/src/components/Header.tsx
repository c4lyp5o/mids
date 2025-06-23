import React, { useState, useEffect } from 'react';

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
  const [modernTime, setModernTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setModernTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  const formatDate = (time: Date) => {
    return time.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className='flex justify-between items-center px-2 mb-2 bg-white/60 rounded-xl backdrop-blur-sm shadow-lg'>
      <div>
        <div className='text-7xl font-bold text-emerald-800'>
          {mosqueData?.mosqueName || 'Mosque Name'}
        </div>
        <div className='text-4xl text-gray-600 mb-3'>{mosqueData?.details}</div>
        <div className='text-xl font-bold text-gray-800 mb-2'>
          {prayerTimesData?.zone || 'Loading...'}
        </div>
      </div>
      <div className='text-right relative'>
        {/* Modern Clock Container */}
        <div className='relative p-2 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/30 shadow-xl'>
          {/* Decorative background elements */}
          <div className='absolute inset-0 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-xl'></div>
          <div className='absolute top-2 right-2 w-12 h-12 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-md'></div>
          <div className='absolute bottom-2 left-2 w-10 h-10 bg-gradient-to-tr from-purple-400/20 to-blue-400/20 rounded-full blur-md'></div>

          {/* Content */}
          <div className='relative z-10'>
            {/* Digital Time Display */}
            <div className='font-mono text-8xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-wider mb-4 animate-pulse'>
              {formatTime(modernTime)}
            </div>

            {/* Date Display */}
            <div className='text-2xl font-medium text-gray-700/90 mb-2'>
              {prayerTimesData?.today?.date || formatDate(modernTime)}
            </div>

            {/* Hijri Date */}
            {prayerTimesData?.today?.hijri && (
              <div className='text-xl text-purple-600/80 font-medium mb-3'>
                {prayerTimesData.today.hijri}
              </div>
            )}

            {/* Animated seconds indicator */}
            <div className='flex justify-center mt-4'>
              <div className='w-2 h-2 bg-blue-500 rounded-full animate-ping'></div>
              <div
                className='w-2 h-2 bg-purple-500 rounded-full animate-ping mx-2'
                style={{ animationDelay: '0.5s' }}
              ></div>
              <div
                className='w-2 h-2 bg-blue-500 rounded-full animate-ping'
                style={{ animationDelay: '1s' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
