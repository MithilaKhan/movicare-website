interface StatusBadgeProps {
  status: 'confirmed' | 'pending' | 'canceled';
}

const statusStyles: Record<StatusBadgeProps['status'], string> = {
  confirmed: 'text-[#079A00] bg-[#ddeedc]',
  pending: 'text-[#454545] bg-[#e3e6e3]',
  canceled: 'text-[#FF2F2F] bg-[#f5e4e1]',
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const baseStyles = 'lg:px-3 px-2 py-1 lg:text-sm text-xs font-medium rounded-full';
  const statusClass = statusStyles[status] || 'text-gray-700 bg-gray-100';

  return (
    <span className={`${baseStyles} ${statusClass}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
