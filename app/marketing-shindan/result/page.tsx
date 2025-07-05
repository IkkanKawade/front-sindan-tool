'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getMarketingSuggestions } from '@/lib/marketingSuggestions'

type MarketingData = {
  companyName: string
  industry: string
  currentTrafficSources: string[]
  marketingGoals: string[]
  budget: string
  targetAudience: string
  currentChallenges: string[]
  websiteUrl: string
  additionalInfo: string
}

export default function MarketingShindanResult() {
  const router = useRouter()
  const [formData, setFormData] = useState<MarketingData | null>(null)
  const [marketingSuggestions, setMarketingSuggestions] = useState<ReturnType<typeof getMarketingSuggestions>>([])

  useEffect(() => {
    const savedData = localStorage.getItem('marketingShindanData')
    if (savedData) {
      const data = JSON.parse(savedData) as MarketingData
      setFormData(data)
      setMarketingSuggestions(getMarketingSuggestions(
        data.currentTrafficSources || [],
        data.marketingGoals || [],
        data.currentChallenges || []
      ))
    } else {
      router.push('/marketing-shindan')
    }
  }, [router])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return '優先度：高'
      case 'medium':
        return '優先度：中'
      case 'low':
        return '優先度：低'
      default:
        return priority
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'hard':
        return 'text-red-600 bg-red-50 border-red-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return '難易度：低'
      case 'medium':
        return '難易度：中'
      case 'hard':
        return '難易度：高'
      default:
        return difficulty
    }
  }

  const formatTrafficSource = (source: string) => {
    const sources: Record<string, string> = {
      'organic-search': 'Google等の検索エンジン',
      'direct': '直接アクセス',
      'social-media': 'SNS',
      'paid-ads': 'Web広告',
      'referral': '他サイトからのリンク',
      'email': 'メールマガジン',
      'offline': 'オフライン',
      'word-of-mouth': '口コミ・紹介',
      'none': '特に集客活動なし',
    }
    return sources[source] || source
  }

  const formatMarketingGoal = (goal: string) => {
    const goals: Record<string, string> = {
      'increase-traffic': 'アクセス数増加',
      'improve-seo': 'SEO改善',
      'local-seo': 'MEO対策',
      'social-growth': 'SNS認知度向上',
      'lead-generation': '見込み客獲得',
      'customer-retention': 'リピーター獲得',
      'brand-awareness': 'ブランド認知度向上',
      'cost-reduction': '集客コスト削減',
      'conversion-improvement': 'コンバージョン率改善',
    }
    return goals[goal] || goal
  }

  const formatChallenge = (challenge: string) => {
    const challenges: Record<string, string> = {
      'low-traffic': 'アクセス数が少ない',
      'poor-conversion': 'コンバージョン率が低い',
      'high-cost': '集客コストが高い',
      'no-strategy': 'マーケティング戦略が不明確',
      'resource-shortage': 'リソース・ノウハウ不足',
      'measurement-difficulty': '効果測定ができていない',
      'target-unclear': 'ターゲット不明確',
      'competitor-pressure': '競合他社に負けている',
    }
    return challenges[challenge] || challenge
  }

  const handlePrint = () => {
    window.print()
  }

  if (!formData || !marketingSuggestions) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-light to-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">Webマーケティング診断結果</h1>

        {/* 診断概要 */}
        <div className="card mb-8">
          <h2 className="text-xl font-bold mb-4">診断概要</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-2">基本情報</h3>
              <div className="space-y-1 text-gray-700">
                <div><strong>会社名：</strong>{formData.companyName}</div>
                <div><strong>業界：</strong>{formData.industry}</div>
                {formData.targetAudience && (
                  <div><strong>ターゲット：</strong>{formData.targetAudience}</div>
                )}
                {formData.budget && (
                  <div><strong>予算：</strong>{formData.budget === 'over' ? '100万円以上' : `${parseInt(formData.budget).toLocaleString()}円以下`}</div>
                )}
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-2">現在の集客経路</h3>
              <div className="flex flex-wrap gap-2">
                {formData.currentTrafficSources.map((source) => (
                  <span key={source} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                    {formatTrafficSource(source)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* マーケティング目標と課題 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {formData.marketingGoals.length > 0 && (
            <div className="card">
              <h3 className="text-lg font-bold mb-3">マーケティング目標</h3>
              <div className="space-y-2">
                {formData.marketingGoals.map((goal) => (
                  <div key={goal} className="flex items-center">
                    <svg className="w-4 h-4 text-accent mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{formatMarketingGoal(goal)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {formData.currentChallenges.length > 0 && (
            <div className="card">
              <h3 className="text-lg font-bold mb-3">現在の課題</h3>
              <div className="space-y-2">
                {formData.currentChallenges.map((challenge) => (
                  <div key={challenge} className="flex items-center">
                    <svg className="w-4 h-4 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <span className="text-gray-700">{formatChallenge(challenge)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Webマーケティング施策提案 */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-bold text-center">おすすめのマーケティング施策</h2>
          {marketingSuggestions.map((suggestion, index) => (
            <div key={suggestion.strategy} className="card">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold">{suggestion.title}</h3>
                <div className="flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(suggestion.priority)}`}>
                    {getPriorityLabel(suggestion.priority)}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(suggestion.difficulty)}`}>
                    {getDifficultyLabel(suggestion.difficulty)}
                  </span>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{suggestion.description}</p>
              <div className="mb-4">
                <h4 className="font-bold mb-2">期待できる効果</h4>
                <ul className="space-y-2">
                  {suggestion.benefits.map((benefit, bIndex) => (
                    <li key={bIndex} className="flex items-start">
                      <svg className="w-5 h-5 text-accent mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="font-medium">概算費用: </span>
                <span className="text-accent font-bold">{suggestion.estimatedCost}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 追加情報 */}
        {formData.additionalInfo && (
          <div className="card mb-8">
            <h3 className="text-lg font-bold mb-3">ご相談内容</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{formData.additionalInfo}</p>
          </div>
        )}

        {/* 次のステップ */}
        <div className="card mb-8 bg-blue-50 border-blue-200">
          <h3 className="text-lg font-bold mb-3">推奨する実行順序</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>優先度の高い施策から着手し、少額予算でテストを開始</li>
            <li>効果測定を行い、ROIの高い施策に予算を集中</li>
            <li>複数施策を組み合わせ、相乗効果を狙う</li>
            <li>定期的に戦略を見直し、市場変化に対応</li>
          </ol>
        </div>

        {/* アクションボタン */}
        <div className="text-center space-y-4">
          <button
            onClick={handlePrint}
            className="bg-accent text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-600 transition-colors duration-300 mr-4"
          >
            印刷・PDF保存
          </button>
          <a
            href="/contact"
            className="btn-primary inline-block"
          >
            無料相談を申し込む
          </a>
          <p className="text-sm text-gray-500 mt-4">
            画面のキャプチャや印刷機能をご利用ください
          </p>
        </div>
      </div>

      {/* 印刷用CSS */}
      <style jsx>{`
        @media print {
          .bg-accent,
          .btn-primary {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}