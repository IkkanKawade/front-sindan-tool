export type MarketingSuggestion = {
  strategy: string
  title: string
  description: string
  benefits: string[]
  estimatedCost: string
  difficulty: 'easy' | 'medium' | 'hard'
  priority: 'high' | 'medium' | 'low'
}

export function getMarketingSuggestions(
  currentTrafficSources: string[],
  marketingGoals: string[],
  issues: string[]
): MarketingSuggestion[] {
  const suggestions: MarketingSuggestion[] = []

  // SEO対策の提案
  if (
    marketingGoals.includes('improve-seo') ||
    marketingGoals.includes('increase-traffic') ||
    issues.includes('poor-seo') ||
    issues.includes('low-traffic') ||
    !currentTrafficSources.includes('organic-search')
  ) {
    suggestions.push({
      strategy: 'seo',
      title: 'SEO対策（検索エンジン最適化）',
      description: 'Google等の検索結果で上位表示を目指し、自然検索からの流入を増やします。',
      benefits: [
        '長期的に安定した集客が期待できる',
        '広告費をかけずに集客可能',
        'ブランド信頼性の向上',
        '購買意欲の高いユーザーを獲得',
      ],
      estimatedCost: '月額5万円〜',
      difficulty: 'medium',
      priority: 'high',
    })
  }

  // MEO対策の提案
  if (
    marketingGoals.includes('local-seo') ||
    (marketingGoals.includes('increase-traffic') && !currentTrafficSources.includes('organic-search'))
  ) {
    suggestions.push({
      strategy: 'meo',
      title: 'MEO対策（Googleマップ最適化）',
      description: '地域検索やGoogleマップでの表示順位を改善し、地域の顧客を獲得します。',
      benefits: [
        '地域の顧客に効率的にリーチ',
        '来店や問い合わせの増加',
        '競合他社との差別化',
        'クチコミによる信頼性向上',
      ],
      estimatedCost: '月額3万円〜',
      difficulty: 'easy',
      priority: marketingGoals.includes('local-seo') ? 'high' : 'medium',
    })
  }

  // SNS運用の提案
  if (
    marketingGoals.includes('social-growth') ||
    marketingGoals.includes('brand-awareness') ||
    !currentTrafficSources.includes('social-media')
  ) {
    suggestions.push({
      strategy: 'sns',
      title: 'SNS運用（Instagram、X、Facebook等）',
      description: 'ターゲット層に合わせたSNS運用で、ブランド認知度向上と顧客エンゲージメントを高めます。',
      benefits: [
        'ブランド認知度の向上',
        '顧客との直接的なコミュニケーション',
        'バズによる急速な拡散の可能性',
        '若年層へのアプローチ',
      ],
      estimatedCost: '月額3万円〜（運用代行の場合）',
      difficulty: 'medium',
      priority: marketingGoals.includes('social-growth') ? 'high' : 'medium',
    })
  }

  // Web広告の提案
  if (
    marketingGoals.includes('increase-traffic') ||
    marketingGoals.includes('lead-generation') ||
    issues.includes('low-traffic') ||
    (!currentTrafficSources.includes('paid-ads') && marketingGoals.length > 0)
  ) {
    suggestions.push({
      strategy: 'web-ads',
      title: 'Web広告（Google広告、Yahoo広告、SNS広告）',
      description: '即効性のある集客手段として、ターゲットを絞った広告配信を行います。',
      benefits: [
        '即効性のある集客が可能',
        '詳細なターゲティング設定',
        '効果測定が容易',
        '予算に応じた柔軟な運用',
      ],
      estimatedCost: '月額10万円〜（広告費込み）',
      difficulty: 'easy',
      priority: issues.includes('low-traffic') ? 'high' : 'medium',
    })
  }

  // LINE公式アカウントの提案
  if (
    marketingGoals.includes('customer-retention') ||
    marketingGoals.includes('lead-generation') ||
    !currentTrafficSources.includes('email')
  ) {
    suggestions.push({
      strategy: 'line',
      title: 'LINE公式アカウント構築・運用',
      description: 'LINE公式アカウントを活用し、顧客との継続的な関係構築とリピート促進を行います。',
      benefits: [
        'プッシュ通知で高い開封率',
        'リピーター獲得に効果的',
        'クーポンやキャンペーンの配信',
        '顧客データの蓄積と活用',
      ],
      estimatedCost: '月額5,500円〜（運用費別）',
      difficulty: 'easy',
      priority: marketingGoals.includes('customer-retention') ? 'high' : 'medium',
    })
  }

  // 口コミマーケティングの提案
  if (
    marketingGoals.includes('brand-awareness') ||
    marketingGoals.includes('increase-traffic') ||
    !currentTrafficSources.includes('word-of-mouth')
  ) {
    suggestions.push({
      strategy: 'word-of-mouth',
      title: '口コミ・レビュー促進施策',
      description: 'Googleビジネスプロフィールやポータルサイトでの口コミ獲得を促進します。',
      benefits: [
        '信頼性の向上',
        '新規顧客の獲得',
        'SEO/MEO効果の向上',
        '顧客満足度の可視化',
      ],
      estimatedCost: '月額2万円〜',
      difficulty: 'easy',
      priority: 'medium',
    })
  }

  // コンテンツマーケティングの提案
  if (
    marketingGoals.includes('improve-seo') ||
    marketingGoals.includes('brand-awareness') ||
    issues.includes('low-traffic')
  ) {
    suggestions.push({
      strategy: 'content-marketing',
      title: 'コンテンツマーケティング（ブログ・動画）',
      description: '価値あるコンテンツを継続的に発信し、顧客との信頼関係を構築します。',
      benefits: [
        'SEO効果による長期的な集客',
        '専門性・信頼性の向上',
        'ソーシャルシェアによる拡散',
        'リード獲得の自動化',
      ],
      estimatedCost: '月額5万円〜',
      difficulty: 'medium',
      priority: 'medium',
    })
  }

  // メールマーケティングの提案
  if (
    marketingGoals.includes('customer-retention') ||
    marketingGoals.includes('lead-generation') ||
    !currentTrafficSources.includes('email')
  ) {
    suggestions.push({
      strategy: 'email-marketing',
      title: 'メールマーケティング',
      description: 'メルマガやステップメールで顧客との関係を深め、リピート購入を促進します。',
      benefits: [
        '低コストで高いROI',
        'パーソナライズされたコミュニケーション',
        '顧客ライフサイクルに応じた施策',
        '詳細な効果測定',
      ],
      estimatedCost: '月額1万円〜',
      difficulty: 'easy',
      priority: 'low',
    })
  }

  // 優先度でソート
  return suggestions.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })
}