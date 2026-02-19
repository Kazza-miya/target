"use client";

import { signalProposals } from "@/data/mockData";
import { getPlatformLabel, getPlatformColor } from "@/lib/utils";

export default function SignalsModal() {
  return (
    <div className="space-y-3">
      {signalProposals.map((p) => (
        <div
          key={p.id}
          className="border border-gray-200 rounded-xl p-4 hover:border-cyan-300 transition-colors"
        >
          {/* Top row */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${getPlatformColor(p.platform)}`}
              >
                {getPlatformLabel(p.platform)}
              </span>
              <span className="text-xs text-gray-400">{p.campaignName}</span>
            </div>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded ${
                p.priority === "high"
                  ? "bg-red-50 text-red-600"
                  : "bg-yellow-50 text-yellow-600"
              }`}
            >
              {p.priority === "high" ? "高" : "中"}
            </span>
          </div>

          {/* Signal name + category */}
          <p className="text-sm font-medium text-gray-900 mb-1">
            {p.signalName}
          </p>
          <p className="text-xs text-gray-500 mb-3">{p.signalCategory}</p>

          {/* Compatibility + action */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">相性</span>
              <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    p.compatibilityScore >= 90
                      ? "bg-emerald-500"
                      : p.compatibilityScore >= 80
                        ? "bg-green-500"
                        : "bg-yellow-500"
                  }`}
                  style={{ width: `${p.compatibilityScore}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-gray-700">
                {p.compatibilityScore}%
              </span>
            </div>
            <button className="text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors">
              追加する &rarr;
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
