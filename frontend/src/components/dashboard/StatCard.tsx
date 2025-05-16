import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

type StatCardProps = {
  title: string;
  value: string;
  change: {
    value: string;
    isPositive: boolean;
  };
  icon: React.ReactNode;
  color: string;
};

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, color }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 transition-all duration-300 hover:shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className={`p-3 rounded-full ${color}`}>
            {icon}
          </div>
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">{title}</dt>
            <dd>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">{value}</div>
            </dd>
          </dl>
        </div>
      </div>
      <div className="mt-4">
        <span
          className={`text-sm font-medium ${
            change.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          } inline-flex items-center`}
        >
          {change.isPositive ? '↑' : '↓'} {change.value}
        </span>
        <span className="text-sm text-gray-500 ml-1 dark:text-gray-400">since last month</span>
      </div>
    </div>
  );
};

export default StatCard;