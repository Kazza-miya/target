"use client";

import { useState } from "react";
import Link from "next/link";
import Modal from "@/components/ui/Modal";
import AudienceModal from "@/components/targeting/AudienceModal";
import DemographicsModal from "@/components/targeting/DemographicsModal";
import SignalsModal from "@/components/targeting/SignalsModal";
import {
  audienceProposals,
  demographicProposals,
  signalProposals,
} from "@/data/mockData";

type ModalType = "audience" | "demographics" | "signals" | null;

const targetingActions = [
  {
    id: "audience" as const,
    label: "オーディエンスリスト",
    count: audienceProposals.length,
    color: "bg-purple-500",
    lightBg: "bg-purple-50",
    lightText: "text-purple-600",
    hoverBorder: "hover:border-purple-300",
    accentColor: "bg-purple-500",
    modalTitle: "オーディエンスリスト作成",
    modalSubtitle: "Shopify・GAデータから作成したリストと新規キャンペーン提案",
  },
  {
    id: "demographics" as const,
    label: "属性最適化",
    count: demographicProposals.length,
    color: "bg-amber-500",
    lightBg: "bg-amber-50",
    lightText: "text-amber-600",
    hoverBorder: "hover:border-amber-300",
    accentColor: "bg-amber-500",
    modalTitle: "属性最適化",
    modalSubtitle: "性別・年齢ターゲティングの最適化提案",
  },
  {
    id: "signals" as const,
    label: "シグナル追加",
    count: signalProposals.length,
    color: "bg-cyan-500",
    lightBg: "bg-cyan-50",
    lightText: "text-cyan-600",
    hoverBorder: "hover:border-cyan-300",
    accentColor: "bg-cyan-500",
    modalTitle: "シグナル追加",
    modalSubtitle: "各媒体のターゲティングシグナル追加提案",
  },
];

export default function TargetingPage() {
  const [openModal, setOpenModal] = useState<ModalType>(null);
  const totalCount =
    audienceProposals.length +
    demographicProposals.length +
    signalProposals.length;

  const activeAction = targetingActions.find((a) => a.id === openModal);

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
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
        <span className="text-gray-900 font-medium">ターゲット最適化</span>
      </nav>

      {/* Header row with CTAs on right */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">
              ターゲット最適化
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              {totalCount}件の提案 ・ Google, Yahoo!, Meta, TikTok
            </p>
          </div>
          <div className="flex items-center gap-3">
            {targetingActions.map((action) => (
              <button
                key={action.id}
                onClick={() => setOpenModal(action.id)}
                className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-xl ${action.lightBg} hover:shadow-md transition-all duration-200 border border-transparent ${action.hoverBorder}`}
              >
                <span className={`w-2 h-2 rounded-full ${action.color}`} />
                <span className={`text-sm font-medium ${action.lightText}`}>
                  {action.label}
                </span>
                <span
                  className={`text-xs font-bold ${action.lightText} px-1.5 py-0.5 rounded-full`}
                >
                  {action.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {activeAction && (
        <Modal
          open={openModal !== null}
          onClose={() => setOpenModal(null)}
          title={activeAction.modalTitle}
          subtitle={activeAction.modalSubtitle}
          accentColor={activeAction.accentColor}
        >
          {openModal === "audience" && <AudienceModal />}
          {openModal === "demographics" && <DemographicsModal />}
          {openModal === "signals" && <SignalsModal />}
        </Modal>
      )}
    </div>
  );
}
