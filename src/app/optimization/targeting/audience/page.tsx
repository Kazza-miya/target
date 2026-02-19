"use client";

import { useState } from "react";
import Link from "next/link";
import { audienceProposals, audienceLists } from "@/data/mockData";
import PlatformBadge from "@/components/ui/PlatformBadge";
import PriorityBadge from "@/components/ui/PriorityBadge";
import ApplyTypeBadge from "@/components/ui/ApplyTypeBadge";
import { formatNumber } from "@/lib/utils";
import { AudienceProposal, AudienceList } from "@/types";

function AudienceListCard({ list }: { list: AudienceList }) {
  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              list.status === "ready"
                ? "bg-green-500"
                : list.status === "building"
                  ? "bg-yellow-500 animate-pulse"
                  : "bg-gray-400"
            }`}
          />
          <span className="text-sm font-medium text-gray-900">{list.name}</span>
        </div>
        <span
          className={`text-xs px-2 py-0.5 rounded ${
            list.source === "shopify"
              ? "bg-green-100 text-green-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {list.source === "shopify" ? "Shopify" : "GA"}
        </span>
      </div>
      <p className="text-xs text-gray-500 mb-3">{list.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {list.platforms.map((p) => (
            <PlatformBadge key={p} platform={p} />
          ))}
        </div>
        {list.status === "ready" ? (
          <span className="text-xs text-gray-500">
            推定サイズ: {formatNumber(list.estimatedSize)}
          </span>
        ) : (
          <span className="text-xs text-yellow-600">構築中...</span>
        )}
      </div>
    </div>
  );
}

function ProposalCard({ proposal }: { proposal: AudienceProposal }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <ApplyTypeBadge applyType={proposal.applyType} />
            <PriorityBadge priority={proposal.priority} />
          </div>
          <span className="text-xs text-gray-400">{proposal.createdAt}</span>
        </div>

        <h3 className="text-base font-semibold text-gray-900 mb-2">
          {proposal.title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {proposal.description}
        </p>

        {/* Audience list info */}
        <div className="mt-4">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
            対象オーディエンスリスト
          </p>
          <AudienceListCard list={proposal.audienceList} />
        </div>

        {/* Suggested campaign */}
        {proposal.suggestedCampaign && (
          <div className="mt-4">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              <svg
                className={`w-4 h-4 transition-transform ${expanded ? "rotate-90" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              推奨キャンペーン構成を確認
            </button>

            {expanded && (
              <div className="mt-3 bg-primary-50 rounded-lg border border-primary-200 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">キャンペーン名</p>
                    <p className="text-sm font-medium text-gray-900 mt-0.5">
                      {proposal.suggestedCampaign.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">配信媒体</p>
                    <div className="mt-0.5">
                      <PlatformBadge
                        platform={proposal.suggestedCampaign.platform}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">目的</p>
                    <p className="text-sm font-medium text-gray-900 mt-0.5">
                      {proposal.suggestedCampaign.objective}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">推定リーチ</p>
                    <p className="text-sm font-medium text-gray-900 mt-0.5">
                      {formatNumber(proposal.suggestedCampaign.estimatedReach)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-100">
          <button className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors">
            キャンペーンを作成
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

export default function AudiencePage() {
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
        <span className="text-gray-900 font-medium">
          オーディエンスリスト作成
        </span>
      </nav>

      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              オーディエンスリスト作成提案
            </h1>
            <p className="text-sm text-gray-500">
              新しいオーディエンスリストと、それを活用したキャンペーン提案
            </p>
          </div>
        </div>
      </div>

      {/* Info banner */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-8">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-purple-800">
              オーディエンスリストの自動生成について
            </p>
            <p className="text-xs text-purple-600 mt-1 leading-relaxed">
              Shopifyの顧客データ（購買履歴、LTV、カート放棄等）とGoogle
              Analyticsの流入データ（エンゲージメント、コンバージョン等）を定期的に分析し、新しいオーディエンスリストを自動生成しています。
              十分な母数が集まったリストから順次、新規キャンペーンの作成を提案します。
            </p>
          </div>
        </div>
      </div>

      {/* Created audience lists */}
      <div className="mb-8">
        <h2 className="text-base font-semibold text-gray-900 mb-4">
          作成済みオーディエンスリスト
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {audienceLists.map((list) => (
            <AudienceListCard key={list.id} list={list} />
          ))}
        </div>
      </div>

      {/* Campaign proposals */}
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-4">
          新規キャンペーン提案
          <span className="ml-2 text-sm font-normal text-gray-500">
            ({audienceProposals.length}件)
          </span>
        </h2>
        <div className="space-y-4">
          {audienceProposals.map((proposal) => (
            <ProposalCard key={proposal.id} proposal={proposal} />
          ))}
        </div>
      </div>
    </div>
  );
}
