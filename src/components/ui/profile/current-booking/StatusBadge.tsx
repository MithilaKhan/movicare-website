interface StatusBadgeProps {
  status: 'Confirmed' | 'Pending' | 'Canceled';
}

const statusStyles: Record<StatusBadgeProps['status'], string> = {
  Confirmed: 'text-[#079A00] bg-[#ddeedc]',
  Pending: 'text-[#454545] bg-[#e3e6e3]',
  Canceled: 'text-[#FF2F2F] bg-[#f5e4e1]',
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const baseStyles = 'px-3 py-1 text-sm font-medium rounded-full';
  const statusClass = statusStyles[status] || 'text-gray-700 bg-gray-100';

  return (
    <span className={`${baseStyles} ${statusClass}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
