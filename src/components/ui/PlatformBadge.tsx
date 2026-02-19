import { Platform } from "@/types";
import { getPlatformLabel, getPlatformColor } from "@/lib/utils";

export default function PlatformBadge({ platform }: { platform: Platform }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getPlatformColor(platform)}`}
    >
      {getPlatformLabel(platform)}
    </span>
  );
}
