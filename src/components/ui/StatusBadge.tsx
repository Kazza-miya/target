import { ProposalStatus } from "@/types";

const statusConfig: Record<
  ProposalStatus,
  { label: string; className: string }
> = {
  new: { label: "新規", className: "bg-blue-100 text-blue-700" },
  reviewed: { label: "確認済", className: "bg-gray-100 text-gray-700" },
  applied: { label: "適用済", className: "bg-green-100 text-green-700" },
  dismissed: { label: "却下", className: "bg-gray-100 text-gray-400" },
};

export default function StatusBadge({ status }: { status: ProposalStatus }) {
  const config = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}
