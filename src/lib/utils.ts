import { Platform } from "@/types";

export function getPlatformLabel(platform: Platform): string {
  const labels: Record<Platform, string> = {
    google: "Google",
    yahoo: "Yahoo!",
    meta: "Meta",
    tiktok: "TikTok",
  };
  return labels[platform];
}

export function getPlatformColor(platform: Platform): string {
  const colors: Record<Platform, string> = {
    google: "bg-blue-100 text-blue-700",
    yahoo: "bg-red-100 text-red-700",
    meta: "bg-indigo-100 text-indigo-700",
    tiktok: "bg-gray-900 text-white",
  };
  return colors[platform];
}

export function getPriorityLabel(priority: "high" | "medium" | "low"): string {
  const labels = { high: "高", medium: "中", low: "低" };
  return labels[priority];
}

export function getPriorityColor(priority: "high" | "medium" | "low"): string {
  const colors = {
    high: "bg-red-100 text-red-700",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-gray-100 text-gray-600",
  };
  return colors[priority];
}

export function formatNumber(num: number): string {
  return num.toLocaleString("ja-JP");
}

export function formatCurrency(num: number): string {
  return `¥${num.toLocaleString("ja-JP")}`;
}
