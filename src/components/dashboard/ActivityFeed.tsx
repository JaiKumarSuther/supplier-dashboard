import React from 'react';
import { Clock } from 'lucide-react';

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
    text: 'text-[#3497F7]',
    bg: 'bg-[#F3FBFF]',
  },
  'booking cancelled': {
    text: 'text-[#F98C69]',
    bg: 'bg-[#FFF9F5]',
  },
  'payout processed': {
    text: 'text-[#37CF83]',
    bg: 'bg-[#F6FFFC]',
  },
  'review received': {
    text: 'text-[#7D24FE]',
    bg: 'bg-[#FAF2FF]',
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
          <strong key={`${phrase}-${index}`} className="font-semibold text-[#283456]">
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
    <div className="w-full bg-white rounded-lg border mb-6 max-w-3xl mx-auto">
      {/* Header */}
      <h2 className="text-lg sm:text-[20px] font-semibold border-b border-gray-200 p-4 sm:p-6 text-[#283456]">
        Recent Activity
      </h2>

      {/* List */}
      <ul className="space-y-4 sm:space-y-6 text-gray-800 p-4 sm:p-6">
        {activities.map((activity, idx) => {
          const color = typeColors[activity.type] || {
            text: 'text-gray-600',
            bg: 'bg-gray-100',
          };

          return (
            <li
              key={idx}
              className="space-y-2 rounded-md p-2 sm:p-3 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              {/* Type + Time */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <div
                  className={`inline-flex items-center px-2 py-[2px] rounded-md ${color.text} ${color.bg} text-xs sm:text-[13px] select-none w-fit`}
                >
                  {activity.type}
                </div>
                <div className="flex items-center text-[#AEAEAE] text-[10px] sm:text-[11px] gap-0.5 select-none">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{activity.time}</span>
                </div>
              </div>

              {/* Message */}
              <p className="text-sm sm:text-[15px] leading-relaxed text-[#283456]">
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