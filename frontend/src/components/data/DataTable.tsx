// DataTable.tsx
import React from 'react';

interface Column {
  key: string;
  title: string;
  sortable?: boolean;
  render?: (value: any, row?: any) => React.ReactNode;
}

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange?: (page: number) => void;
}

interface DataTableProps {
  title: string;
  columns: Column[];
  data: any[];
  pagination?: PaginationProps;
  onSortChange?: (sortConfig: { key: string; direction: 'asc' | 'desc' }) => void;
  sortConfig?: { key: string; direction: 'asc' | 'desc' } | null;
}

const DataTable: React.FC<DataTableProps> = ({
  title,
  columns,
  data,
  pagination,
  onSortChange,
  sortConfig,
}) => {
  const handleSort = (key: string) => {
    if (!onSortChange) return;
    const direction = sortConfig?.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    onSortChange({ key, direction });
  };

  const totalPages = pagination ? Math.ceil(pagination.totalItems / pagination.itemsPerPage) : 1;

  return (
    <div className="bg-gray-900 text-white p-4 rounded-xl">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-700 text-gray-300">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={`px-4 py-2 cursor-pointer select-none ${col.sortable ? 'hover:underline' : ''}`}
                >
                  {col.title}
                  {sortConfig?.key === col.key ? (sortConfig.direction === 'asc' ? ' ▲' : ' ▼') : ''}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
  {data.map((row, rowIndex) => (
    <tr key={rowIndex} className="border-b">
      {columns.map((col, colIndex) => (
        <td key={colIndex} className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
          {col.render
            ? col.render(row[col.key], rowIndex) // Only render using custom renderer
            : row[col.key]}
        </td>
      ))}
    </tr>
  ))}
</tbody>

        </table>
      </div>
      {pagination && (
        <div className="flex justify-end items-center gap-2 mt-4">
          <button
            onClick={() => pagination.onPageChange?.(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm">
            Page {pagination.currentPage} of {totalPages}
          </span>
          <button
            onClick={() => pagination.onPageChange?.(pagination.currentPage + 1)}
            disabled={pagination.currentPage === totalPages}
            className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DataTable;
