"use client";

import Link from "next/link";
import {
  audienceProposals,
  demographicProposals,
  signalProposals,
} from "@/data/mockData";

const targetingCategories = [
  {
    id: "audience",
    label: "オーディエンスリスト作成",
    sublabel: "新規オーディエンスの作成 & キャンペーン提案",
    count: audienceProposals.length,
    href: "/optimization/targeting/audience",
    gradient: "from-purple-500 to-violet-600",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    borderColor: "border-purple-200",
    applyType: "別枠テスト",
    applyColor: "text-purple-600 bg-purple-50",
    description:
      "Shopifyの顧客データやGAの流入データを活用して作成した新しいオーディエンスリストと、それを活用した新規キャンペーンの提案です。",
    sources: ["Shopify顧客データ", "GA流入データ"],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: "demographics",
    label: "属性最適化",
    sublabel: "性別・年齢ターゲティングの最適化",
    count: demographicProposals.length,
    href: "/optimization/targeting/demographics",
    gradient: "from-amber-500 to-orange-600",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    borderColor: "border-amber-200",
    applyType: "既存に適用",
    applyColor: "text-emerald-600 bg-emerald-50",
    description:
      "配信データに基づき、パフォーマンスが悪い性別・年齢セグメントの除外や、効率の良いセグメントへの集中配信を提案します。",
    sources: ["配信実績データ", "コンバージョンデータ"],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="19" y1="8" x2="19" y2="14" />
        <line x1="22" y1="11" x2="16" y2="11" />
      </svg>
    ),
  },
  {
    id: "signals",
    label: "シグナル追加",
    sublabel: "各媒体のターゲティングシグナル追加",
    count: signalProposals.length,
    href: "/optimization/targeting/signals",
    gradient: "from-cyan-500 to-blue-600",
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-600",
    borderColor: "border-cyan-200",
    applyType: "既存に適用",
    applyColor: "text-emerald-600 bg-emerald-50",
    description:
      "各媒体が持つシグナル（購買意向、アフィニティ、インタレストなど）の中から、配信データとの相性が良く未追加のものを提案します。",
    sources: ["CV相関分析", "媒体オーディエンスデータ"],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
];

export default function TargetingPage() {
  const totalCount =
    audienceProposals.length +
    demographicProposals.length +
    signalProposals.length;

  return (
    <div className="p-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link
          href="/optimization"
          className="hover:text-primary-600 transition-colors"
        >
          最適化提案
        </Link>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
        <span className="text-gray-900 font-medium">ターゲット最適化</span>
      </nav>

      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              ターゲット最適化
            </h1>
            <p className="text-sm text-gray-500">
              {totalCount}件の最適化提案があります
            </p>
          </div>
        </div>
      </div>

      {/* Platform summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-8">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
          対象媒体
        </p>
        <div className="flex items-center gap-3">
          {["Google", "Yahoo!", "Meta", "TikTok"].map((platform) => (
            <span
              key={platform}
              className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700"
            >
              {platform}
            </span>
          ))}
        </div>
      </div>

      {/* Three CTA Cards */}
      <div className="space-y-5">
        {targetingCategories.map((cat) => (
          <Link key={cat.id} href={cat.href} className="block group">
            <div
              className={`bg-white rounded-xl border ${cat.borderColor} hover:shadow-lg transition-all duration-200 overflow-hidden`}
            >
              <div className="flex items-stretch">
                {/* Left color bar */}
                <div
                  className={`w-1.5 bg-gradient-to-b ${cat.gradient} flex-shrink-0`}
                />

                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div
                        className={`w-14 h-14 rounded-xl ${cat.iconBg} ${cat.iconColor} flex items-center justify-center flex-shrink-0`}
                      >
                        {cat.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                            {cat.label}
                          </h3>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${cat.applyColor}`}
                          >
                            {cat.applyType}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-600 mb-2">
                          {cat.sublabel}
                        </p>
                        <p className="text-sm text-gray-500 leading-relaxed">
                          {cat.description}
                        </p>

                        {/* Data sources */}
                        <div className="flex items-center gap-2 mt-3">
                          <span className="text-xs text-gray-400">
                            データソース:
                          </span>
                          {cat.sources.map((src) => (
                            <span
                              key={src}
                              className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                            >
                              {src}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Count & Arrow */}
                    <div className="flex items-center gap-4 flex-shrink-0 ml-6">
                      <div className="text-center">
                        <span
                          className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${cat.gradient} text-white text-xl font-bold`}
                        >
                          {cat.count}
                        </span>
                        <p className="text-xs text-gray-400 mt-1">件の提案</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                        <svg
                          className="w-4 h-4 text-gray-400 group-hover:text-primary-600 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
