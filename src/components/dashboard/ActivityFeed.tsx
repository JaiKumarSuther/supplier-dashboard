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

const typeColors: Record<string, { text: string; bg: string }> = {
  'new booking': {
    text: 'text-[#3484e3]',     // slightly faded blue
    bg: 'bg-[#e9f2fe]',         // very light sky-blue
  },
  'booking cancelled': {
    text: 'text-[#f9735a]',     // coral-orange
    bg: 'bg-[#fff1eb]',         // creamy peach background
  },
  'payout processed': {
    text: 'text-[#00c896]',     // aqua green
    bg: 'bg-[#edfcf7]',         // mint background
  },
  'review received': {
    text: 'text-[#9b59f5]',     // soft violet
    bg: 'bg-[#f4eefe]',         // lavender background
  },
};

const boldPhrases = [
  'Day Colors of Hunza Valley Cultural Tour',
  '14 Days K2 Base Camp Trekking Expedition',
  'PKR 456,400',
  'booking# F81237-23478',
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
          <strong key={`${phrase}-${index}`} className="font-semibold text-[#1e2a49]">
            {phrase}
          </strong>,
          split[1] || '',
        ];
      }
      return [part];
    });
  });

  return <>{parts}</>;
};

const ActivityFeed: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border mb-6">
      {/* Header */}
      <h2 className="text-lg font-semibold border-b border-gray-200 p-6 text-[#1e2a49]">Recent Activity</h2>


      {/* List */}
      <ul className="space-y-6 text-sm text-gray-800 p-6">
        {activities.map((activity, idx) => {
          const color = typeColors[activity.type] || {
            text: 'text-gray-600',
            bg: 'bg-gray-100',
          };

          return (
            <li key={idx} className="space-y-2">
              {/* Type + Time */}
              <div className="flex items-center gap-2">
                <div
                  className={`inline-flex items-center px-2 py-[2px] rounded-md ${color.text} ${color.bg} text-xs font-semibold`}
                >
                  {activity.type}
                </div>
                <div className="flex items-center text-gray-400 text-xs gap-1">
                  <ClockIcon className="w-4 h-4" />
                  <span>{activity.time}</span>
                </div>
              </div>

              {/* Message */}
              <p className="text-sm leading-relaxed text-[#1e2a49]">
                {renderBoldMessage(activity.message)}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ActivityFeed;
