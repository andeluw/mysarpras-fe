export default function StatusChip({
  status,
}: {
  status: 'approved' | 'waiting' | 'rejected' | 'canceled';
}) {
  const statusMap: Record<string, string[]> = {
    approved: ['Disetujui', 'bg-emerald-100 text-emerald-800'],
    waiting: ['Menunggu Konfirmasi', 'bg-yellow-100 text-yellow-800'],
    rejected: ['Ditolak', 'bg-red-100 text-red-800'],
    canceled: ['Dibatalkan', 'bg-gray-100 text-gray-800'],
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium ${statusMap[status][1]}`}
    >
      {statusMap[status][0]}
    </span>
  );
}
