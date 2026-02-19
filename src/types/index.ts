export type Platform = "google" | "yahoo" | "meta" | "tiktok";

export type ProposalStatus = "new" | "reviewed" | "applied" | "dismissed";

export type ProposalType =
  | "audience_creation"
  | "demographic_optimization"
  | "signal_addition";

export type ProposalApplyType = "apply_existing" | "test_new";

export interface AudienceList {
  id: string;
  name: string;
  source: "shopify" | "ga";
  description: string;
  estimatedSize: number;
  createdAt: string;
  status: "ready" | "building" | "insufficient_data";
  platforms: Platform[];
}

export interface AudienceProposal {
  id: string;
  type: "audience_creation";
  applyType: "test_new";
  title: string;
  description: string;
  audienceList: AudienceList;
  suggestedCampaign?: {
    name: string;
    platform: Platform;
    objective: string;
    estimatedReach: number;
  };
  priority: "high" | "medium" | "low";
  status: ProposalStatus;
  createdAt: string;
}

export interface DemographicProposal {
  id: string;
  type: "demographic_optimization";
  applyType: "apply_existing";
  title: string;
  description: string;
  platform: Platform;
  campaignName: string;
  adGroupName?: string;
  currentSetting: {
    gender?: { male: boolean; female: boolean; unknown: boolean };
    ageRanges?: string[];
  };
  recommendedSetting: {
    gender?: { male: boolean; female: boolean; unknown: boolean };
    ageRanges?: string[];
  };
  reason: string;
  metrics: {
    currentCPA?: number;
    estimatedCPA?: number;
    currentCTR?: number;
    estimatedCTR?: number;
    currentROAS?: number;
    estimatedROAS?: number;
  };
  priority: "high" | "medium" | "low";
  status: ProposalStatus;
  createdAt: string;
}

export interface SignalProposal {
  id: string;
  type: "signal_addition";
  applyType: "apply_existing";
  title: string;
  description: string;
  platform: Platform;
  campaignName: string;
  adGroupName?: string;
  signalCategory: string;
  signalName: string;
  signalDescription: string;
  compatibilityScore: number;
  reason: string;
  priority: "high" | "medium" | "low";
  status: ProposalStatus;
  createdAt: string;
}

export type Proposal =
  | AudienceProposal
  | DemographicProposal
  | SignalProposal;

export interface OptimizationCategory {
  id: string;
  label: string;
  icon: string;
  count: number;
  href: string;
  color: string;
}
