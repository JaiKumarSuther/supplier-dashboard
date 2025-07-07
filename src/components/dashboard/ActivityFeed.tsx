"use client";

import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

const typeColors: Record<string, { text: string; bg: string }> = {
  booking: {
    text: 'text-[#3497F7]',
    bg: 'bg-[#F3FBFF]',
  },
  payout: {
    text: 'text-[#37CF83]',
    bg: 'bg-[#F6FFFC]',
  },
  review: {
    text: 'text-[#7D24FE]',
    bg: 'bg-[#FAF2FF]',
  },
};

const boldPhrases = ['booking', 'payout', 'review', 'PKR', 'star', 'customer'];

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

interface Activity {
  type: 'booking' | 'payout' | 'review';
  date: string;
  details: any;
}

const ActivityFeed: React.FC<{ supplierId: string }> = ({ supplierId }) => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!supplierId || !token) return;

    fetch(`http://localhost:9000/api/v1/suppliers/${supplierId}/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setActivities(data.recentActivity || []);
      })
      .catch(err => {
        console.error('Error loading activity feed:', err);
      });
  }, [supplierId]);

  const formatMessage = (activity: Activity): string => {
    switch (activity.type) {
      case 'booking':
        return `${activity.details.customer} booked ${activity.details.listing}`;
      case 'payout':
        return `Payout of PKR ${activity.details.amount?.toLocaleString()} (${activity.details.status}) processed.`;
      case 'review':
        return `${activity.details.customer} left a ${activity.details.rating}-star review.`;
      default:
        return 'Activity recorded.';
    }
  };

  return (
    <div className="w-full bg-white min-h-[500px] rounded-lg border mb-6 max-w-3xl mx-auto">
      <h2 className="text-lg sm:text-[20px] font-semibold border-b border-gray-200 p-4 sm:p-6 text-[#283456]">
        Recent Activity
      </h2>

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
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <div
                  className={`inline-flex items-center px-2 py-[2px] rounded-md ${color.text} ${color.bg} text-xs sm:text-[13px] select-none w-fit`}
                >
                  {activity.type}
                </div>
                <div className="flex items-center text-[#AEAEAE] text-[10px] sm:text-[11px] gap-0.5 select-none">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{new Date(activity.date).toLocaleString()}</span>
                </div>
              </div>

              <p className="text-sm sm:text-[15px] leading-relaxed text-[#283456]">
                {renderBoldMessage(formatMessage(activity))}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ActivityFeed;
