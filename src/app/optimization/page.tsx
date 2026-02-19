"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const optimizationCategories = [
  {
    id: "budget",
    label: "予算最適化",
    count: 3,
    href: "/optimization/budget",
    color: "from-emerald-500 to-teal-600",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    description: "予算配分の最適化提案を確認・適用します",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    id: "keyword",
    label: "キーワード最適化",
    count: 5,
    href: "/optimization/keyword",
    color: "from-blue-500 to-indigo-600",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    description: "検索キーワードの追加・除外提案を確認します",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    id: "creative",
    label: "クリエイティブ最適化",
    count: 2,
    href: "/optimization/creative",
    color: "from-pink-500 to-rose-600",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
    description: "広告クリエイティブの改善提案を確認します",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    id: "targeting",
    label: "ターゲット最適化",
    count: 12,
    href: "/optimization/targeting",
    color: "from-violet-500 to-purple-600",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    description: "オーディエンス・属性・シグナルの最適化提案を確認します",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
];

export default function OptimizationPage() {
  const pathname = usePathname();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">最適化提案</h1>
        <p className="text-sm text-gray-500 mt-1">
          各カテゴリの最適化提案を確認し、広告パフォーマンスを改善します
        </p>
      </div>

      {/* Summary bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">未対応の提案</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">22件</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-600">3</p>
              <p className="text-xs text-gray-500">予算</p>
            </div>
            <div className="h-8 w-px bg-gray-200" />
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">5</p>
              <p className="text-xs text-gray-500">キーワード</p>
            </div>
            <div className="h-8 w-px bg-gray-200" />
            <div className="text-center">
              <p className="text-2xl font-bold text-pink-600">2</p>
              <p className="text-xs text-gray-500">クリエイティブ</p>
            </div>
            <div className="h-8 w-px bg-gray-200" />
            <div className="text-center">
              <p className="text-2xl font-bold text-violet-600">12</p>
              <p className="text-xs text-gray-500">ターゲット</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {optimizationCategories.map((cat) => (
          <Link
            key={cat.id}
            href={cat.href}
            className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-xl ${cat.iconBg} ${cat.iconColor} flex items-center justify-center`}
              >
                {cat.icon}
              </div>
              <span
                className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r ${cat.color} text-white text-sm font-bold`}
              >
                {cat.count}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
              {cat.label}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{cat.description}</p>
            <div className="mt-4 flex items-center text-sm font-medium text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
              提案を確認する
              <svg
                className="ml-1 w-4 h-4"
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
          </Link>
        ))}
      </div>
    </div>
  );
}
