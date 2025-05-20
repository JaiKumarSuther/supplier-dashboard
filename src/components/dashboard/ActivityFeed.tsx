import React from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';

const activities = [
  {
    type: 'new booking',
    time: '1 min ago',
    message:
      'You have a new booking for Day Colors of Hunza Valley Cultural Tour on 26th Aug 2025.',
  },
  {
    type: 'booking cancelled',
    time: '28 min ago',
    message:
      'Wamiq Ahmed has canceled their booking for 14 Days K2 Base Camp Trekking Expedition.',
  },
  {
    type: 'payout processed',
    time: '1 hr ago',
    message:
      'Your payout of PKR 456,400 for booking# F81237-23478 has been processed.',
  },
  {
    type: 'review received',
    time: '2 hr ago',
    message: 'Wamiq Ahmed has left a 4-star review on your listing.',
  },
];

const typeColors: Record<
  string,
  { text: string; bg: string; hoverBg: string }
> = {
  'new booking': {
    text: 'text-blue-600',
    bg: 'bg-blue-100',
    hoverBg: 'bg-blue-200',
  },
  'booking cancelled': {
    text: 'text-orange-600',
    bg: 'bg-orange-100',
    hoverBg: 'bg-orange-200',
  },
  'payout processed': {
    text: 'text-green-600',
    bg: 'bg-green-100',
    hoverBg: 'bg-green-200',
  },
  'review received': {
    text: 'text-purple-600',
    bg: 'bg-purple-100',
    hoverBg: 'bg-purple-200',
  },
};

const boldPhrases = [
  'Day Colors of Hunza Valley Cultural Tour',
  '14 Days K2 Base Camp Trekking Expedition',
  'PKR 456,400 for booking# F81237-23478',
  'Wamiq Ahmed',
  '4-star',
];

const renderBoldMessage = (message: string): React.ReactNode => {
  let parts: React.ReactNode[] = [message];

  boldPhrases.forEach((phrase, index) => {
    parts = parts.flatMap((part): React.ReactNode[] => {
      if (typeof part === 'string' && part.includes(phrase)) {
        const split = part.split(phrase);
        return [
          split[0],
          <strong key={`${phrase}-${index}`}>{phrase}</strong>,
          split[1] || '',
        ] as React.ReactNode[];
      }
      return [part];
    });
  });

  return <>{parts}</>;
};

const ActivityFeed: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
      <div className="w-full border-b border-gray-300 mb-6"></div>

      <ul className="space-y-6 text-sm text-gray-700">
        {activities.map((activity, idx) => {
          const color =
            typeColors[activity.type] || {
              text: 'text-gray-600',
              bg: 'bg-gray-100',
              hoverBg: 'bg-gray-200',
            };

          return (
            <li key={idx} className="flex flex-col space-y-2">
              <div className="flex items-center gap-2">
                {/* Type label */}
                <div
                  className={`inline-flex items-center gap-2 px-2 py-1 rounded ${color.text} ${color.bg} hover:${color.hoverBg} transition-colors duration-200 text-xs font-semibold cursor-pointer`}
                >
                  {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                </div>

                {/* Time next to it */}
                <div className="flex items-center text-gray-400 text-xs gap-1 cursor-default">
                  <ClockIcon className="w-4 h-4" />
                  <span>{activity.time}</span>
                </div>
              </div>

              <p className="text-sm">{renderBoldMessage(activity.message)}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ActivityFeed;
