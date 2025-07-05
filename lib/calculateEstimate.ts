export type EstimateResult = {
  basePrice: number
  designFee: number
  featureFees: { feature: string; price: number }[]
  totalPrice: number
  minPrice: number
  maxPrice: number
}

export function calculateEstimate(
  pageCount: string,
  designLevel: string,
  features: string[]
): EstimateResult {
  // 基本料金（ページ数ベース）
  const basePrices: Record<string, number> = {
    '1': 100000,    // 1ページ（LP）
    '5': 300000,    // 5ページ以内
    '10': 500000,   // 10ページ以内
    '20': 800000,   // 20ページ以内
    '30': 1200000,  // 30ページ以上
  }

  // デザインレベル係数
  const designMultipliers: Record<string, number> = {
    'simple': 1.0,    // シンプル
    'standard': 1.5,  // スタンダード
    'premium': 2.0,   // プレミアム
  }

  // 機能別追加料金
  const featurePrices: Record<string, number> = {
    'contact': 50000,     // お問い合わせフォーム
    'cms': 200000,        // CMS（更新機能）
    'responsive': 100000, // レスポンシブデザイン
    'seo': 80000,         // SEO対策
    'analytics': 30000,   // アクセス解析
    'ssl': 20000,         // SSL対応
  }

  // 計算
  const basePrice = basePrices[pageCount] || 300000
  const designMultiplier = designMultipliers[designLevel] || 1.5
  const designFee = Math.floor(basePrice * (designMultiplier - 1))

  const featureFees = features.map(feature => ({
    feature,
    price: featurePrices[feature] || 0,
  }))

  const totalFeatureFee = featureFees.reduce((sum, f) => sum + f.price, 0)
  const totalPrice = basePrice + designFee + totalFeatureFee

  // 変動幅（±20%）
  const minPrice = Math.floor(totalPrice * 0.8)
  const maxPrice = Math.floor(totalPrice * 1.2)

  return {
    basePrice,
    designFee,
    featureFees,
    totalPrice,
    minPrice,
    maxPrice,
  }
}

export function formatFeatureName(feature: string): string {
  const featureNames: Record<string, string> = {
    'contact': 'お問い合わせフォーム',
    'cms': 'CMS（更新機能）',
    'responsive': 'レスポンシブデザイン',
    'seo': 'SEO対策',
    'analytics': 'アクセス解析',
    'ssl': 'SSL対応',
  }
  return featureNames[feature] || feature
}