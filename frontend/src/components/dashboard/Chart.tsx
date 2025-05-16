import React, { useEffect, useRef } from 'react';

type ChartProps = {
  title: string;
  type: 'line' | 'bar' | 'pie';
  data: any; // In a real app, we'd use proper typing from a chart library
  height?: string;
};

const Chart: React.FC<ChartProps> = ({ title, type, data, height = 'h-80' }) => {
  // This is a placeholder for actual chart rendering
  // In a real app, you'd use a library like Chart.js, Recharts, or ApexCharts
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
        <div className="flex items-center space-x-2">
          <button className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
            Weekly
          </button>
          <button className="text-sm text-indigo-600 font-medium dark:text-indigo-400">
            Monthly
          </button>
          <button className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
            Yearly
          </button>
        </div>
      </div>
      
      <div className={`${height} bg-gray-50 rounded dark:bg-gray-700 flex items-center justify-center p-4`}>
        {/* Chart placeholder - in a real app, you'd render an actual chart here */}
        <div className="w-full h-full flex flex-col">
          {type === 'bar' && (
            <div className="flex-1 flex items-end justify-between gap-2">
              {[35, 60, 30, 70, 40, 80, 50].map((value, index) => (
                <div key={index} className="relative w-full group">
                  <div 
                    className="w-full bg-indigo-500 rounded-t transition-all duration-700 ease-out dark:bg-indigo-600 group-hover:bg-indigo-600"
                    style={{ height: `${value}%` }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-medium text-white">{value}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {type === 'line' && (
            <div className="flex-1 flex items-end justify-between">
              <svg className="w-full h-full" viewBox="0 0 700 300">
                <path 
                  d="M0,300 L100,250 L200,210 L300,240 L400,190 L500,140 L600,180 L700,120" 
                  fill="none" 
                  stroke="#4f46e5" 
                  strokeWidth="3"
                />
                <path 
                  d="M0,300 L100,250 L200,210 L300,240 L400,190 L500,140 L600,180 L700,120 L700,300 L0,300" 
                  fill="url(#gradient)" 
                  opacity="0.2"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity="0"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}
          
          {type === 'pie' && (
            <div className="flex-1 flex items-center justify-center">
              <div className="w-40 h-40 rounded-full border-8 border-indigo-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-emerald-500" style={{clipPath: 'polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 0)'}}></div>
                <div className="absolute inset-0 bg-amber-500" style={{clipPath: 'polygon(50% 50%, 100% 0, 100% 50%, 50% 50%)'}}></div>
                <div className="absolute inset-0 bg-rose-500" style={{clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)'}}></div>
              </div>
            </div>
          )}
          
          <div className="flex justify-between mt-4">
            <span className="text-xs text-gray-500 dark:text-gray-400">Jan</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Feb</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Mar</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Apr</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">May</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Jun</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Jul</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;