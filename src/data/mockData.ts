import {
  AudienceProposal,
  AudienceList,
  DemographicProposal,
  SignalProposal,
} from "@/types";

export const audienceLists: AudienceList[] = [
  {
    id: "al-001",
    name: "Shopify 高LTV顧客リスト",
    source: "shopify",
    description:
      "過去6ヶ月間で3回以上購入、平均注文額15,000円以上の顧客データから作成した類似オーディエンス",
    estimatedSize: 45000,
    createdAt: "2026-02-18",
    status: "ready",
    platforms: ["google", "meta"],
  },
  {
    id: "al-002",
    name: "GA コンバージョン済みユーザーリスト",
    source: "ga",
    description:
      "Google Analyticsのコンバージョンデータに基づく、購入完了ユーザーのリマーケティングリスト",
    estimatedSize: 28000,
    createdAt: "2026-02-17",
    status: "ready",
    platforms: ["google", "yahoo"],
  },
  {
    id: "al-003",
    name: "Shopify カート放棄ユーザーリスト",
    source: "shopify",
    description:
      "過去30日間でカートに商品を追加したが購入に至らなかったユーザーリスト",
    estimatedSize: 12000,
    createdAt: "2026-02-16",
    status: "ready",
    platforms: ["google", "meta", "tiktok"],
  },
  {
    id: "al-004",
    name: "GA 高エンゲージメントユーザーリスト",
    source: "ga",
    description:
      "セッション時間5分以上、3ページ以上閲覧のエンゲージメントが高い流入ユーザー",
    estimatedSize: 8500,
    createdAt: "2026-02-15",
    status: "ready",
    platforms: ["google", "yahoo", "meta"],
  },
  {
    id: "al-005",
    name: "Shopify リピーター類似リスト",
    source: "shopify",
    description:
      "2回以上購入のリピーター顧客に基づく類似オーディエンス（構築中）",
    estimatedSize: 0,
    createdAt: "2026-02-19",
    status: "building",
    platforms: ["meta", "tiktok"],
  },
];

export const audienceProposals: AudienceProposal[] = [
  {
    id: "ap-001",
    type: "audience_creation",
    applyType: "test_new",
    title: "Shopify高LTV顧客の類似オーディエンスを活用した新規キャンペーン提案",
    description:
      "高LTV顧客データから作成した類似オーディエンスを活用し、新規顧客獲得キャンペーンを作成します。既存キャンペーンとは別枠でテスト配信を推奨します。",
    audienceList: audienceLists[0],
    suggestedCampaign: {
      name: "[テスト] 高LTV類似_新規獲得キャンペーン",
      platform: "meta",
      objective: "コンバージョン（購入）",
      estimatedReach: 320000,
    },
    priority: "high",
    status: "new",
    createdAt: "2026-02-19",
  },
  {
    id: "ap-002",
    type: "audience_creation",
    applyType: "test_new",
    title: "カート放棄ユーザーへのリマーケティングキャンペーン提案",
    description:
      "Shopifyのカート放棄データに基づくリマーケティングリストの母数が十分に集まりました。専用のリマーケティングキャンペーンの作成を提案します。",
    audienceList: audienceLists[2],
    suggestedCampaign: {
      name: "[テスト] カート放棄_リマーケティング",
      platform: "google",
      objective: "コンバージョン（購入完了）",
      estimatedReach: 12000,
    },
    priority: "high",
    status: "new",
    createdAt: "2026-02-18",
  },
  {
    id: "ap-003",
    type: "audience_creation",
    applyType: "test_new",
    title: "高エンゲージメントユーザーの類似拡張によるTikTok新規キャンペーン",
    description:
      "GAの高エンゲージメントユーザーデータを活用し、TikTokでの新規ユーザー獲得テストキャンペーンを提案します。",
    audienceList: audienceLists[3],
    suggestedCampaign: {
      name: "[テスト] 高エンゲージメント類似_TikTok",
      platform: "tiktok",
      objective: "トラフィック",
      estimatedReach: 150000,
    },
    priority: "medium",
    status: "new",
    createdAt: "2026-02-17",
  },
];

export const demographicProposals: DemographicProposal[] = [
  {
    id: "dp-001",
    type: "demographic_optimization",
    applyType: "apply_existing",
    title: "Google検索キャンペーン：男性18-24歳の除外推奨",
    description:
      "過去30日間のデータ分析により、男性18-24歳セグメントのCPAが平均の3.2倍と非効率であることを検知しました。",
    platform: "google",
    campaignName: "ブランド_検索_全国",
    adGroupName: "一般キーワード",
    currentSetting: {
      gender: { male: true, female: true, unknown: true },
      ageRanges: ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"],
    },
    recommendedSetting: {
      gender: { male: true, female: true, unknown: true },
      ageRanges: ["25-34", "35-44", "45-54", "55-64", "65+"],
    },
    reason:
      "男性18-24歳のCPAが¥12,800に対し、他セグメント平均は¥4,000。CTRも0.8%と低く、コンバージョン率は0.2%です。除外することで全体CPAを約15%改善できる見込みです。",
    metrics: {
      currentCPA: 4800,
      estimatedCPA: 4080,
      currentCTR: 2.1,
      estimatedCTR: 2.5,
    },
    priority: "high",
    status: "new",
    createdAt: "2026-02-19",
  },
  {
    id: "dp-002",
    type: "demographic_optimization",
    applyType: "apply_existing",
    title: "Meta広告：女性35-54歳への配信強化推奨",
    description:
      "女性35-54歳セグメントのROASが全体平均の2.1倍と高パフォーマンスを記録しています。入札調整による配信強化を提案します。",
    platform: "meta",
    campaignName: "商品_コンバージョン_全国",
    currentSetting: {
      gender: { male: true, female: true, unknown: true },
      ageRanges: ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"],
    },
    recommendedSetting: {
      gender: { male: false, female: true, unknown: false },
      ageRanges: ["35-44", "45-54"],
    },
    reason:
      "女性35-54歳のROASが850%に対し、全体平均は400%。このセグメントに絞ることで、ROAS全体を約40%改善できる見込みです。",
    metrics: {
      currentROAS: 4.0,
      estimatedROAS: 5.6,
      currentCPA: 3200,
      estimatedCPA: 2400,
    },
    priority: "high",
    status: "new",
    createdAt: "2026-02-18",
  },
  {
    id: "dp-003",
    type: "demographic_optimization",
    applyType: "apply_existing",
    title: "Yahoo!広告：65歳以上の除外推奨",
    description:
      "65歳以上のセグメントでクリックは発生しているもののコンバージョンが0件です。予算効率化のため除外を推奨します。",
    platform: "yahoo",
    campaignName: "検索_一般KW_全国配信",
    currentSetting: {
      gender: { male: true, female: true, unknown: true },
      ageRanges: ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"],
    },
    recommendedSetting: {
      gender: { male: true, female: true, unknown: true },
      ageRanges: ["18-24", "25-34", "35-44", "45-54", "55-64"],
    },
    reason:
      "過去60日間で65歳以上からのクリック数は142回（費用¥28,400）に対しCV0件。このセグメント除外により月間約¥14,200の費用削減が見込めます。",
    metrics: {
      currentCPA: 5600,
      estimatedCPA: 5100,
    },
    priority: "medium",
    status: "new",
    createdAt: "2026-02-17",
  },
  {
    id: "dp-004",
    type: "demographic_optimization",
    applyType: "apply_existing",
    title: "TikTok広告：男性25-34歳の配信比率引き上げ",
    description:
      "TikTok広告において男性25-34歳のエンゲージメント率とCVRが突出しています。配信比率の引き上げを推奨します。",
    platform: "tiktok",
    campaignName: "動画_認知拡大_全国",
    currentSetting: {
      gender: { male: true, female: true, unknown: true },
      ageRanges: ["18-24", "25-34", "35-44", "45-54"],
    },
    recommendedSetting: {
      gender: { male: true, female: false, unknown: false },
      ageRanges: ["25-34"],
    },
    reason:
      "男性25-34歳のCVRは4.2%（全体平均1.8%）、CPAは¥2,100（全体平均¥4,500）。このセグメントに集中配信することでCPA改善が見込めます。",
    metrics: {
      currentCPA: 4500,
      estimatedCPA: 2500,
      currentCTR: 1.2,
      estimatedCTR: 2.8,
    },
    priority: "high",
    status: "new",
    createdAt: "2026-02-16",
  },
];

export const signalProposals: SignalProposal[] = [
  {
    id: "sp-001",
    type: "signal_addition",
    applyType: "apply_existing",
    title: "Google：「美容・パーソナルケア」購買意向シグナル追加",
    description:
      "既存のコンバージョンデータとの相関分析により、「美容・パーソナルケア」の購買意向オーディエンスとの相性が高いことが判明しました。",
    platform: "google",
    campaignName: "P-MAX_コンバージョン最大化",
    signalCategory: "購買意向の強いオーディエンス",
    signalName: "美容・パーソナルケア",
    signalDescription:
      "美容製品やパーソナルケア商品を積極的に調査・購入検討しているユーザー",
    compatibilityScore: 92,
    reason:
      "既存コンバージョンユーザーの67%がこのカテゴリに該当。現在のオーディエンスシグナルに追加することで、P-MAXのシグナル精度向上が見込めます。",
    priority: "high",
    status: "new",
    createdAt: "2026-02-19",
  },
  {
    id: "sp-002",
    type: "signal_addition",
    applyType: "apply_existing",
    title: "Google：「健康・フィットネス」アフィニティカテゴリ追加",
    description:
      "コンバージョンユーザーの興味関心分析により、「健康・フィットネス」アフィニティとの相関が確認されました。",
    platform: "google",
    campaignName: "ディスプレイ_リーチ拡大",
    adGroupName: "興味関心ターゲティング",
    signalCategory: "アフィニティカテゴリ",
    signalName: "健康、フィットネス / 健康志向",
    signalDescription: "健康的なライフスタイルに関心を持つユーザー層",
    compatibilityScore: 85,
    reason:
      "既存CVユーザーの52%がこのアフィニティに該当しますが、現在未設定です。追加によりリーチを約25%拡大しつつ、CVR維持が期待できます。",
    priority: "medium",
    status: "new",
    createdAt: "2026-02-18",
  },
  {
    id: "sp-003",
    type: "signal_addition",
    applyType: "apply_existing",
    title: "Meta：「オーガニック食品」インタレスト追加",
    description:
      "Meta広告のCV分析により、「オーガニック食品」に関心を持つユーザー層との高い親和性が確認されました。",
    platform: "meta",
    campaignName: "コンバージョン_詳細ターゲティング",
    signalCategory: "興味・関心",
    signalName: "オーガニック食品",
    signalDescription: "オーガニック食品や自然食品に関心があるユーザー",
    compatibilityScore: 88,
    reason:
      "類似商品購入者の分析で、オーガニック食品への関心との相関係数が0.72。現在のターゲティングに追加することで、CVRの10-15%改善が期待できます。",
    priority: "high",
    status: "new",
    createdAt: "2026-02-17",
  },
  {
    id: "sp-004",
    type: "signal_addition",
    applyType: "apply_existing",
    title: "Yahoo!：「ライフスタイル > 美容・コスメ」インタレスト追加",
    description:
      "Yahoo!広告のサーチターゲティングデータ分析により、美容・コスメカテゴリとの高い相関が確認されました。",
    platform: "yahoo",
    campaignName: "ディスプレイ_コンバージョン_全国",
    signalCategory: "インタレストカテゴリ",
    signalName: "ライフスタイル > 美容・コスメ",
    signalDescription: "美容やコスメに関連する情報を閲覧しているユーザー",
    compatibilityScore: 79,
    reason:
      "Yahoo!のオーディエンス分析で、CVユーザーの45%が美容・コスメカテゴリを閲覧。追加によるリーチ拡大と効率改善の両立が見込めます。",
    priority: "medium",
    status: "new",
    createdAt: "2026-02-16",
  },
  {
    id: "sp-005",
    type: "signal_addition",
    applyType: "apply_existing",
    title: "TikTok：「Beauty & Personal Care」インタレスト追加",
    description:
      "TikTok広告のエンゲージメントデータ分析により、Beauty & Personal Careインタレストとの高い親和性を検知しました。",
    platform: "tiktok",
    campaignName: "動画_コンバージョン_最適化",
    signalCategory: "Interest Category",
    signalName: "Beauty & Personal Care",
    signalDescription:
      "美容・パーソナルケアに関するコンテンツに高いエンゲージメントを示すユーザー",
    compatibilityScore: 91,
    reason:
      "TikTokの動画視聴データとCVデータの相関分析で、当該インタレストカテゴリのCVRが平均の2.3倍。追加することでCPA改善が期待できます。",
    priority: "high",
    status: "new",
    createdAt: "2026-02-15",
  },
];
