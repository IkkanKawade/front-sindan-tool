export type ImprovementSuggestion = {
  issue: string
  title: string
  description: string
  solutions: string[]
  priority: 'high' | 'medium' | 'low'
}

export function getImprovementSuggestions(issues: string[]): ImprovementSuggestion[] {
  const suggestionMap: Record<string, ImprovementSuggestion> = {
    'low-inquiries': {
      issue: 'low-inquiries',
      title: 'お問い合わせ数の改善',
      description: 'コンバージョン率を向上させるための施策が必要です。',
      solutions: [
        'CTAボタンの配置・デザインを最適化',
        'お問い合わせフォームの項目数を削減',
        '信頼性を高める実績・お客様の声を追加',
        'ファーストビューでの価値提案を強化',
      ],
      priority: 'high',
    },
    'mobile-unfriendly': {
      issue: 'mobile-unfriendly',
      title: 'モバイル対応の改善',
      description: 'スマートフォンユーザーの利便性向上が急務です。',
      solutions: [
        'レスポンシブデザインの実装',
        'タップしやすいボタンサイズに調整',
        'モバイル用のナビゲーションメニューの追加',
        '画像・動画の最適化で表示速度改善',
      ],
      priority: 'high',
    },
    'outdated-design': {
      issue: 'outdated-design',
      title: 'デザインの刷新',
      description: '最新のWebデザイントレンドを取り入れた改善が必要です。',
      solutions: [
        'モダンなUIデザインへのリニューアル',
        '適切な余白とタイポグラフィの調整',
        'ブランドカラーの見直しと統一',
        'アニメーション・マイクロインタラクションの追加',
      ],
      priority: 'medium',
    },
    'slow-loading': {
      issue: 'slow-loading',
      title: 'ページ表示速度の改善',
      description: '表示速度の改善はSEOとユーザー体験の両方に効果的です。',
      solutions: [
        '画像の圧縮・WebP形式への変換',
        'CSSとJavaScriptの最適化',
        'CDNの導入',
        '不要なプラグイン・スクリプトの削除',
      ],
      priority: 'high',
    },
    'poor-seo': {
      issue: 'poor-seo',
      title: 'SEO対策の強化',
      description: '検索エンジンからの流入を増やすための施策が必要です。',
      solutions: [
        'タイトルタグ・メタディスクリプションの最適化',
        '構造化データの実装',
        '内部リンク構造の改善',
        'コンテンツの質と量の向上',
      ],
      priority: 'medium',
    },
    'confusing-navigation': {
      issue: 'confusing-navigation',
      title: 'ナビゲーションの改善',
      description: 'ユーザーが迷わずに目的のページに辿り着けるよう改善が必要です。',
      solutions: [
        'メニュー構造の見直しと簡潔化',
        'パンくずリストの追加',
        '検索機能の実装',
        'フッターリンクの充実',
      ],
      priority: 'medium',
    },
    'low-conversion': {
      issue: 'low-conversion',
      title: 'コンバージョン率の改善',
      description: '訪問者を顧客に変換する仕組みの強化が必要です。',
      solutions: [
        'A/Bテストによる最適化',
        'ランディングページの改善',
        'フォーム入力の簡素化',
        '説得力のあるコピーライティング',
      ],
      priority: 'high',
    },
    'no-analytics': {
      issue: 'no-analytics',
      title: 'アクセス解析の導入',
      description: 'データに基づいた改善を行うための基盤構築が必要です。',
      solutions: [
        'Google Analytics 4の導入',
        'コンバージョン設定',
        'ヒートマップツールの導入',
        '定期的なレポート体制の構築',
      ],
      priority: 'low',
    },
  }

  return issues
    .map(issue => suggestionMap[issue])
    .filter(Boolean)
    .sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 }
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    })
}