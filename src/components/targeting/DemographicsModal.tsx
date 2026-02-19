"use client";

import { demographicProposals } from "@/data/mockData";
import { getPlatformLabel, getPlatformColor, formatCurrency } from "@/lib/utils";

export default function DemographicsModal() {
  return (
    <div className="space-y-3">
      {demographicProposals.map((p) => {
        const removedAges =
          p.currentSetting.ageRanges?.filter(
            (a) => !p.recommendedSetting.ageRanges?.includes(a)
          ) ?? [];
        const keptAges = p.recommendedSetting.ageRanges ?? [];

        const genderChanged =
          JSON.stringify(p.currentSetting.gender) !==
          JSON.stringify(p.recommendedSetting.gender);

        return (
          <div
            key={p.id}
            className="border border-gray-200 rounded-xl p-4 hover:border-amber-300 transition-colors"
          >
            {/* Top row: platform + priority */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${getPlatformColor(p.platform)}`}
                >
                  {getPlatformLabel(p.platform)}
                </span>
                <span className="text-xs text-gray-400">
                  {p.campaignName}
                </span>
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

            {/* Title */}
            <p className="text-sm font-medium text-gray-900 mb-2">
              {p.title}
            </p>

            {/* Change summary - compact */}
            <div className="flex flex-wrap items-center gap-1.5 mb-3">
              {removedAges.map((age) => (
                <span
                  key={age}
                  className="text-[11px] px-1.5 py-0.5 rounded bg-red-50 text-red-500 line-through"
                >
                  {age}歳
                </span>
              ))}
              {genderChanged && (
                <>
                  {p.recommendedSetting.gender &&
                    !p.recommendedSetting.gender.male && (
                      <span className="text-[11px] px-1.5 py-0.5 rounded bg-red-50 text-red-500 line-through">
                        男性
                      </span>
                    )}
                  {p.recommendedSetting.gender &&
                    !p.recommendedSetting.gender.female && (
                      <span className="text-[11px] px-1.5 py-0.5 rounded bg-red-50 text-red-500 line-through">
                        女性
                      </span>
                    )}
                </>
              )}
              <span className="text-gray-300 mx-0.5">&rarr;</span>
              {keptAges.map((age) => (
                <span
                  key={age}
                  className="text-[11px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 font-medium"
                >
                  {age}歳
                </span>
              ))}
            </div>

            {/* Metrics + action row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs">
                {p.metrics.currentCPA != null &&
                  p.metrics.estimatedCPA != null && (
                    <span className="text-gray-500">
                      CPA{" "}
                      <span className="text-gray-300 line-through">
                        {formatCurrency(p.metrics.currentCPA)}
                      </span>{" "}
                      <span className="text-emerald-600 font-semibold">
                        {formatCurrency(p.metrics.estimatedCPA)}
                      </span>
                    </span>
                  )}
                {p.metrics.currentROAS != null &&
                  p.metrics.estimatedROAS != null && (
                    <span className="text-gray-500">
                      ROAS{" "}
                      <span className="text-gray-300 line-through">
                        {p.metrics.currentROAS.toFixed(1)}x
                      </span>{" "}
                      <span className="text-emerald-600 font-semibold">
                        {p.metrics.estimatedROAS.toFixed(1)}x
                      </span>
                    </span>
                  )}
              </div>
              <button className="text-xs font-medium text-primary-600 hover:text-primary-700 transition-colors">
                適用する &rarr;
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
