import { getPriorityLabel, getPriorityColor } from "@/lib/utils";

export default function PriorityBadge({
  priority,
}: {
  priority: "high" | "medium" | "low";
}) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(priority)}`}
    >
      優先度: {getPriorityLabel(priority)}
    </span>
  );
}
