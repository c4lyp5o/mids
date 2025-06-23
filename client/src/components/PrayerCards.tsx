type Prayer = {
  name: string;
  time?: string;
};

type RemainingTime = {
  hours: number;
  minutes: number;
  seconds: number;
};

type PrayerTimesData = {
  nextSolat?: {
    name: string;
  };
};

interface PrayerCardsProps {
  prayerTimesData: PrayerTimesData;
  prayerTimesArray: Prayer[];
  remainingTime?: RemainingTime;
}

const PrayerCards: React.FC<PrayerCardsProps> = ({
  prayerTimesData,
  prayerTimesArray,
  remainingTime,
}) => {
  return (
    <div className='grid grid-cols-5 gap-8 mb-2'>
      {prayerTimesArray.map((prayer) => (
        <div
          key={prayer.name}
          className={`px-6 py-2 rounded-xl shadow-lg ${
            prayerTimesData?.nextSolat?.name === prayer.name.toLowerCase()
              ? 'bg-gradient-to-br from-emerald-600 to-emerald-700 text-white'
              : 'bg-white/80 backdrop-blur-sm text-gray-800'
          } transform transition-all duration-300`}
        >
          <h3
            className={`text-3xl font-bold mb-1 ${
              prayerTimesData?.nextSolat?.name === prayer.name.toLowerCase()
                ? 'text-white'
                : 'text-gray-800'
            }`}
          >
            {prayer.name}
          </h3>
          <p className='text-6xl font-semibold mb-1'>
            {prayer.time?.split(':00')[0] || '...'}
          </p>
          {prayerTimesData?.nextSolat?.name === prayer.name.toLowerCase() &&
            remainingTime && (
              <div className='text-emerald-100'>
                <p className='text-lg font-medium mb-1'>Next Prayer</p>
                <p className='text-lg'>
                  In {remainingTime.hours}h {remainingTime.minutes}m{' '}
                  {remainingTime.seconds}s
                </p>
              </div>
            )}
        </div>
      ))}
    </div>
  );
};

export default PrayerCards;
