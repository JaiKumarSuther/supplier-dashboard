import React from 'react';
import revenueIcon from '../../../public/images/revmon icon in overview card.svg';
import bookingIcon from '../../../public/images/Bookings icon in overview cards.svg';
import avgIcon from '../../../public/images/Average booking value icon in overview cards.svg';
import ratingIcon from '../../../public/images/rev icon in overview card.svg';
const stats = [
  {
    label: "This month's revenue",
    value: '2,163,527',
    change: '-10%',
    icon: revenueIcon,
  },
  {
    label: 'Bookings this month',
    value: '320',
    change: '+78',
    icon: bookingIcon,
  },
  {
    label: 'Average booking value',
    value: '48,230 PKR',
    change: '+4,530',
    icon: avgIcon,
  },
  {
    label: 'Your overall ratings',
    value: '4.3',
    change: '+12',
    icon: ratingIcon,
  },
];

const StatsOverview: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((item, idx) => (
        <div
          key={idx}
          className="bg-white rounded-lg border border-gray-300 shadow p-6 flex items-start space-x-4"
        >
          <img src={item.icon} alt="" className="w-6 h-6 mt-1" />
          <div>
            {/* Label in gray */}
            <p className="text-sm text-gray-600">{item.label}</p>

            {/* Main value: bigger and black */}
            <h3 className="text-2xl font-semibold text-black">{item.value}</h3>

            {/* Change: number green, 'this month' black */}
            <p className="text-sm">
              <span className="text-green-600 font-medium">{item.change}</span>{' '}
              <span className="text-black">this month</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;