"use client";

import { audienceProposals, audienceLists } from "@/data/mockData";
import { formatNumber } from "@/lib/utils";
import { getPlatformLabel } from "@/lib/utils";

export default function AudienceModal() {
  return (
    <div className="space-y-6">
      {/* Audience lists summary */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          作成済みリスト
        </p>
        <div className="space-y-2">
          {audienceLists.map((list) => (
            <div
              key={list.id}
              className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                    list.status === "ready"
                      ? "bg-green-500"
                      : list.status === "building"
                        ? "bg-yellow-400 animate-pulse"
                        : "bg-gray-300"
                  }`}
                />
                <span className="text-sm text-gray-800 truncate">
                  {list.name}
                </span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded flex-shrink-0 ${
                    list.source === "shopify"
                      ? "bg-green-100 text-green-600"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {list.source === "shopify" ? "Shopify" : "GA"}
                </span>
              </div>
              <span className="text-xs text-gray-400 flex-shrink-0 ml-3">
                {list.status === "ready"
                  ? `${formatNumber(list.estimatedSize)}人`
                  : "構築中"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Campaign proposals */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          新規キャンペーン提案
        </p>
        <div className="space-y-3">
          {audienceProposals.map((p) => (
            <div
              key={p.id}
              className="border border-gray-200 rounded-xl p-4 hover:border-purple-300 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <p className="text-sm font-medium text-gray-900 leading-snug">
                  {p.title}
                </p>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded flex-shrink-0 ${
                    p.priority === "high"
                      ? "bg-red-50 text-red-600"
                      : "bg-yellow-50 text-yellow-600"
                  }`}
                >
                  {p.priority === "high" ? "高" : "中"}
                </span>
              </div>

              {p.suggestedCampaign && (
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span>{getPlatformLabel(p.suggestedCampaign.platform)}</span>
                  <span className="text-gray-300">|</span>
                  <span>{p.suggestedCampaign.objective}</span>
                  <span className="text-gray-300">|</span>
                  <span>
                    リーチ {formatNumber(p.suggestedCampaign.estimatedReach)}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-600">
                  別枠テスト
                </span>
                <button className="text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors">
                  キャンペーンを作成 &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
