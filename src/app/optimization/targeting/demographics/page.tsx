"use client";

import { useState } from "react";
import Link from "next/link";
import { demographicProposals } from "@/data/mockData";
import PlatformBadge from "@/components/ui/PlatformBadge";
import PriorityBadge from "@/components/ui/PriorityBadge";
import ApplyTypeBadge from "@/components/ui/ApplyTypeBadge";
import { formatCurrency } from "@/lib/utils";
import { DemographicProposal, Platform } from "@/types";

function MetricChange({
  label,
  current,
  estimated,
  format,
  lowerIsBetter,
}: {
  label: string;
  current: number;
  estimated: number;
  format: "currency" | "percent" | "multiplier";
  lowerIsBetter?: boolean;
}) {
  const improved = lowerIsBetter ? estimated < current : estimated > current;
  const changePercent = (((estimated - current) / current) * 100).toFixed(1);
  const sign = Number(changePercent) > 0 ? "+" : "";

  const formatValue = (v: number) => {
    switch (format) {
      case "currency":
        return formatCurrency(v);
      case "percent":
        return `${v}%`;
      case "multiplier":
        return `${v.toFixed(1)}x`;
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-3">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <div className="flex items-end gap-2">
        <span className="text-sm text-gray-400 line-through">
          {formatValue(current)}
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
        <span className="text-base font-bold text-gray-900">
          {formatValue(estimated)}
        </span>
        <span
          className={`text-xs font-medium ${improved ? "text-green-600" : "text-red-600"}`}
        >
          ({sign}
          {changePercent}%)
        </span>
      </div>
    </div>
  );
}

function GenderDisplay({
  gender,
  isRecommended,
}: {
  gender: { male: boolean; female: boolean; unknown: boolean };
  isRecommended?: boolean;
}) {
  const items = [
    { key: "male", label: "男性", active: gender.male },
    { key: "female", label: "女性", active: gender.female },
    { key: "unknown", label: "不明", active: gender.unknown },
  ];
  return (
    <div className="flex items-center gap-1.5">
      {items.map((item) => (
        <span
          key={item.key}
          className={`text-xs px-2 py-1 rounded ${
            item.active
              ? isRecommended
                ? "bg-emerald-100 text-emerald-700 font-medium"
                : "bg-gray-200 text-gray-700"
              : "bg-gray-100 text-gray-400 line-through"
          }`}
        >
          {item.label}
        </span>
      ))}
    </div>
  );
}

function AgeRangeDisplay({
  ranges,
  allRanges,
  isRecommended,
}: {
  ranges: string[];
  allRanges: string[];
  isRecommended?: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {allRanges.map((range) => {
        const active = ranges.includes(range);
        return (
          <span
            key={range}
            className={`text-xs px-2 py-1 rounded ${
              active
                ? isRecommended
                  ? "bg-emerald-100 text-emerald-700 font-medium"
                  : "bg-gray-200 text-gray-700"
                : "bg-gray-100 text-gray-400 line-through"
            }`}
          >
            {range}
          </span>
        );
      })}
    </div>
  );
}

function DemographicProposalCard({
  proposal,
}: {
  proposal: DemographicProposal;
}) {
  const [expanded, setExpanded] = useState(false);
  const allAgeRanges = [
    "18-24",
    "25-34",
    "35-44",
    "45-54",
    "55-64",
    "65+",
  ];

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

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
          {proposal.metrics.currentCPA != null &&
            proposal.metrics.estimatedCPA != null && (
              <MetricChange
                label="CPA"
                current={proposal.metrics.currentCPA}
                estimated={proposal.metrics.estimatedCPA}
                format="currency"
                lowerIsBetter
              />
            )}
          {proposal.metrics.currentCTR != null &&
            proposal.metrics.estimatedCTR != null && (
              <MetricChange
                label="CTR"
                current={proposal.metrics.currentCTR}
                estimated={proposal.metrics.estimatedCTR}
                format="percent"
              />
            )}
          {proposal.metrics.currentROAS != null &&
            proposal.metrics.estimatedROAS != null && (
              <MetricChange
                label="ROAS"
                current={proposal.metrics.currentROAS}
                estimated={proposal.metrics.estimatedROAS}
                format="multiplier"
              />
            )}
        </div>

        {/* Detail toggle */}
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
          設定変更の詳細を確認
        </button>

        {expanded && (
          <div className="mt-3 bg-gray-50 rounded-lg border border-gray-200 p-4 space-y-4">
            {/* Reason */}
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">根拠</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {proposal.reason}
              </p>
            </div>

            {/* Gender comparison */}
            {proposal.currentSetting.gender &&
              proposal.recommendedSetting.gender && (
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-2">
                    性別設定
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400 w-10">現在</span>
                      <GenderDisplay gender={proposal.currentSetting.gender} />
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-emerald-600 font-medium w-10">
                        推奨
                      </span>
                      <GenderDisplay
                        gender={proposal.recommendedSetting.gender}
                        isRecommended
                      />
                    </div>
                  </div>
                </div>
              )}

            {/* Age range comparison */}
            {proposal.currentSetting.ageRanges &&
              proposal.recommendedSetting.ageRanges && (
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-2">
                    年齢設定
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400 w-10">現在</span>
                      <AgeRangeDisplay
                        ranges={proposal.currentSetting.ageRanges}
                        allRanges={allAgeRanges}
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-emerald-600 font-medium w-10">
                        推奨
                      </span>
                      <AgeRangeDisplay
                        ranges={proposal.recommendedSetting.ageRanges}
                        allRanges={allAgeRanges}
                        isRecommended
                      />
                    </div>
                  </div>
                </div>
              )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-100">
          <button className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors">
            この最適化を適用
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

export default function DemographicsPage() {
  const [platformFilter, setPlatformFilter] = useState<Platform | "all">("all");

  const filteredProposals =
    platformFilter === "all"
      ? demographicProposals
      : demographicProposals.filter((p) => p.platform === platformFilter);

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
        <span className="text-gray-900 font-medium">属性最適化</span>
      </nav>

      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" y1="8" x2="19" y2="14" />
              <line x1="22" y1="11" x2="16" y2="11" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              属性最適化提案
            </h1>
            <p className="text-sm text-gray-500">
              性別・年齢ターゲティングの最適化を既存キャンペーンに適用します
            </p>
          </div>
        </div>
      </div>

      {/* Info banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-amber-800">
              属性最適化について
            </p>
            <p className="text-xs text-amber-600 mt-1 leading-relaxed">
              過去の配信データを分析し、パフォーマンスが悪い性別・年齢セグメントの除外や、効率の良いセグメントへの集中配信を提案しています。
              これらの変更は既存のキャンペーン・広告グループに直接適用されます。
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

      {/* Proposals */}
      <div className="space-y-4">
        {filteredProposals.map((proposal) => (
          <DemographicProposalCard key={proposal.id} proposal={proposal} />
        ))}
      </div>

      {filteredProposals.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500">
            選択した媒体の属性最適化提案はありません
          </p>
        </div>
      )}
    </div>
  );
}
