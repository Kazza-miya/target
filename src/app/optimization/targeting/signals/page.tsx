"use client";

import { useState } from "react";
import Link from "next/link";
import { signalProposals } from "@/data/mockData";
import PlatformBadge from "@/components/ui/PlatformBadge";
import PriorityBadge from "@/components/ui/PriorityBadge";
import ApplyTypeBadge from "@/components/ui/ApplyTypeBadge";
import { SignalProposal, Platform } from "@/types";

function CompatibilityMeter({ score }: { score: number }) {
  const getColor = (s: number) => {
    if (s >= 90) return "bg-emerald-500";
    if (s >= 80) return "bg-green-500";
    if (s >= 70) return "bg-yellow-500";
    return "bg-orange-500";
  };

  const getLabel = (s: number) => {
    if (s >= 90) return "非常に高い";
    if (s >= 80) return "高い";
    if (s >= 70) return "やや高い";
    return "普通";
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${getColor(score)} transition-all duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-sm font-bold text-gray-900 w-10 text-right">
        {score}%
      </span>
      <span className="text-xs text-gray-500 w-20">{getLabel(score)}</span>
    </div>
  );
}

function SignalProposalCard({ proposal }: { proposal: SignalProposal }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <PlatformBadge platform={proposal.platform} />
            <ApplyTypeBadge applyType={proposal.applyType} />
            <PriorityBadge priority={proposal.priority} />
          </div>
          <span className="text-xs text-gray-400">{proposal.createdAt}</span>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-gray-900 mb-1">
          {proposal.title}
        </h3>
        <p className="text-xs text-gray-500 mb-3">
          キャンペーン: {proposal.campaignName}
          {proposal.adGroupName && ` > ${proposal.adGroupName}`}
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          {proposal.description}
        </p>

        {/* Signal info */}
        <div className="mt-4 bg-cyan-50 border border-cyan-200 rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <p className="text-xs text-gray-500">シグナルカテゴリ</p>
              <p className="text-sm font-medium text-gray-900 mt-0.5">
                {proposal.signalCategory}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">シグナル名</p>
              <p className="text-sm font-medium text-gray-900 mt-0.5">
                {proposal.signalName}
              </p>
            </div>
          </div>
          <div className="mb-3">
            <p className="text-xs text-gray-500">説明</p>
            <p className="text-sm text-gray-700 mt-0.5">
              {proposal.signalDescription}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1.5">相性スコア</p>
            <CompatibilityMeter score={proposal.compatibilityScore} />
          </div>
        </div>

        {/* Expand reason */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors mt-4"
        >
          <svg
            className={`w-4 h-4 transition-transform ${expanded ? "rotate-90" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          分析の根拠を確認
        </button>

        {expanded && (
          <div className="mt-3 bg-gray-50 rounded-lg border border-gray-200 p-4">
            <p className="text-xs font-medium text-gray-500 mb-1">
              分析根拠
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              {proposal.reason}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-100">
          <button className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors">
            シグナルを追加
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
            詳細を確認
          </button>
          <button className="ml-auto text-sm text-gray-400 hover:text-gray-600 transition-colors">
            スキップ
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SignalsPage() {
  const [platformFilter, setPlatformFilter] = useState<Platform | "all">("all");

  const filteredProposals =
    platformFilter === "all"
      ? signalProposals
      : signalProposals.filter((p) => p.platform === platformFilter);

  const platforms: { value: Platform | "all"; label: string }[] = [
    { value: "all", label: "すべて" },
    { value: "google", label: "Google" },
    { value: "yahoo", label: "Yahoo!" },
    { value: "meta", label: "Meta" },
    { value: "tiktok", label: "TikTok" },
  ];

  return (
    <div className="p-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/optimization" className="hover:text-primary-600 transition-colors">
          最適化提案
        </Link>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
        <Link href="/optimization/targeting" className="hover:text-primary-600 transition-colors">
          ターゲット最適化
        </Link>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
        <span className="text-gray-900 font-medium">シグナル追加</span>
      </nav>

      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              シグナル追加提案
            </h1>
            <p className="text-sm text-gray-500">
              各媒体のターゲティングシグナルを既存キャンペーンに追加します
            </p>
          </div>
        </div>
      </div>

      {/* Info banner */}
      <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4 mb-8">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-cyan-800">
              シグナル追加について
            </p>
            <p className="text-xs text-cyan-600 mt-1 leading-relaxed">
              各媒体が提供するターゲティングシグナル（Googleの購買意向オーディエンス、アフィニティカテゴリ、Metaのインタレストなど）の中から、
              コンバージョンデータとの相関分析に基づき、相性が良くまだ配信に追加されていないシグナルを提案しています。
              既存のキャンペーン・広告グループに直接追加されます。
            </p>
          </div>
        </div>
      </div>

      {/* Platform filter */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm text-gray-500">媒体:</span>
        {platforms.map((p) => (
          <button
            key={p.value}
            onClick={() => setPlatformFilter(p.value)}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              platformFilter === p.value
                ? "bg-primary-600 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Signal proposals list */}
      <div className="space-y-4">
        {filteredProposals.map((proposal) => (
          <SignalProposalCard key={proposal.id} proposal={proposal} />
        ))}
      </div>

      {filteredProposals.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500">
            選択した媒体のシグナル追加提案はありません
          </p>
        </div>
      )}
    </div>
  );
}
