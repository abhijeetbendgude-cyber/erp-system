import React from 'react';
import { Activity, ArrowRight } from 'lucide-react';

type ActivityItem = {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  target: string;
  time: string;
};

type ActivityFeedProps = {
  activities: ActivityItem[];
};

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center dark:text-white">
          <Activity size={20} className="mr-2" />
          Recent Activity
        </h3>
        <button className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center dark:text-indigo-400 dark:hover:text-indigo-300">
          View all
          <ArrowRight size={16} className="ml-1" />
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start">
            <div className="mr-4 flex-shrink-0">
              <div className="relative">
                {activity.user.avatar ? (
                  <img
                    src={activity.user.avatar}
                    alt={activity.user.name}
                    className="h-10 w-10 rounded-full"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 text-sm font-medium dark:bg-indigo-900 dark:text-indigo-300">
                    {activity.user.name.charAt(0)}
                  </div>
                )}
                <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-400 ring-2 ring-white dark:ring-gray-800"></span>
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium text-gray-900 dark:text-white">{activity.user.name}</span>{' '}
                {activity.action}{' '}
                <span className="font-medium text-gray-900 dark:text-white">{activity.target}</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;