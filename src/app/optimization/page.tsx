"use client";

import Link from "next/link";

const categories = [
  {
    id: "budget",
    label: "予算最適化",
    count: 3,
    href: "/optimization/budget",
    color: "bg-emerald-500",
    lightBg: "bg-emerald-50",
    lightText: "text-emerald-600",
  },
  {
    id: "keyword",
    label: "キーワード最適化",
    count: 5,
    href: "/optimization/keyword",
    color: "bg-blue-500",
    lightBg: "bg-blue-50",
    lightText: "text-blue-600",
  },
  {
    id: "creative",
    label: "クリエイティブ最適化",
    count: 2,
    href: "/optimization/creative",
    color: "bg-pink-500",
    lightBg: "bg-pink-50",
    lightText: "text-pink-600",
  },
  {
    id: "targeting",
    label: "ターゲット最適化",
    count: 12,
    href: "/optimization/targeting",
    color: "bg-violet-500",
    lightBg: "bg-violet-50",
    lightText: "text-violet-600",
  },
];

export default function OptimizationPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">最適化提案</h1>
        <p className="text-sm text-gray-500 mt-1">
          各カテゴリの最適化提案を確認し、広告パフォーマンスを改善します
        </p>
      </div>

      {/* 最適化を実行する */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              最適化を実行する
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              提案をクリックして内容を確認・適用
            </p>
          </div>
          <div className="flex items-center gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={cat.href}
                className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-xl ${cat.lightBg} hover:shadow-md transition-all duration-200 border border-transparent hover:border-gray-200`}
              >
                <span className={`w-2 h-2 rounded-full ${cat.color}`} />
                <span className={`text-sm font-medium ${cat.lightText}`}>
                  {cat.label}
                </span>
                <span
                  className={`text-xs font-bold ${cat.lightText} px-1.5 py-0.5 rounded-full`}
                >
                  {cat.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
