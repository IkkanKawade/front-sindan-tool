'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

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

export default function MarketingShindan() {
  const router = useRouter()
  const [formData, setFormData] = useState<MarketingData>({
    companyName: '',
    industry: '',
    currentTrafficSources: [],
    marketingGoals: [],
    budget: '',
    targetAudience: '',
    currentChallenges: [],
    websiteUrl: '',
    additionalInfo: '',
  })

  const trafficSourceOptions = [
    { value: 'organic-search', label: 'Google等の検索エンジン' },
    { value: 'direct', label: '直接アクセス（URL入力・ブックマーク）' },
    { value: 'social-media', label: 'SNS（Instagram、X、Facebook等）' },
    { value: 'paid-ads', label: 'Web広告（Google広告、Yahoo広告等）' },
    { value: 'referral', label: '他サイトからのリンク' },
    { value: 'email', label: 'メールマガジン' },
    { value: 'offline', label: 'オフライン（チラシ、看板等）' },
    { value: 'word-of-mouth', label: '口コミ・紹介' },
    { value: 'none', label: '特に集客活動はしていない' },
  ]

  const marketingGoalOptions = [
    { value: 'increase-traffic', label: 'サイトのアクセス数を増やしたい' },
    { value: 'improve-seo', label: '検索順位を上げたい' },
    { value: 'local-seo', label: '地域での検索順位を上げたい（MEO）' },
    { value: 'social-growth', label: 'SNSでの認知度を高めたい' },
    { value: 'lead-generation', label: '見込み客を増やしたい' },
    { value: 'customer-retention', label: 'リピーターを増やしたい' },
    { value: 'brand-awareness', label: 'ブランド認知度を向上させたい' },
    { value: 'cost-reduction', label: '集客コストを削減したい' },
    { value: 'conversion-improvement', label: 'コンバージョン率を改善したい' },
  ]

  const challengeOptions = [
    { value: 'low-traffic', label: 'アクセス数が少ない' },
    { value: 'poor-conversion', label: 'コンバージョン率が低い' },
    { value: 'high-cost', label: '集客コストが高い' },
    { value: 'no-strategy', label: 'マーケティング戦略が不明確' },
    { value: 'resource-shortage', label: 'リソース・ノウハウが不足' },
    { value: 'measurement-difficulty', label: '効果測定ができていない' },
    { value: 'target-unclear', label: 'ターゲットが明確でない' },
    { value: 'competitor-pressure', label: '競合他社に負けている' },
  ]

  const industryOptions = [
    'IT・Web',
    '製造業',
    '小売・EC',
    '飲食店',
    '美容・エステ',
    '医療・歯科',
    '不動産',
    '教育・スクール',
    '士業（弁護士・税理士等）',
    'コンサルティング',
    'その他',
  ]

  const handleTrafficSourceToggle = (source: string) => {
    const updatedSources = formData.currentTrafficSources.includes(source)
      ? formData.currentTrafficSources.filter(s => s !== source)
      : [...formData.currentTrafficSources, source]
    setFormData({ ...formData, currentTrafficSources: updatedSources })
  }

  const handleMarketingGoalToggle = (goal: string) => {
    const updatedGoals = formData.marketingGoals.includes(goal)
      ? formData.marketingGoals.filter(g => g !== goal)
      : [...formData.marketingGoals, goal]
    setFormData({ ...formData, marketingGoals: updatedGoals })
  }

  const handleChallengeToggle = (challenge: string) => {
    const updatedChallenges = formData.currentChallenges.includes(challenge)
      ? formData.currentChallenges.filter(c => c !== challenge)
      : [...formData.currentChallenges, challenge]
    setFormData({ ...formData, currentChallenges: updatedChallenges })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 診断結果を保存して結果ページへ遷移
    localStorage.setItem('marketingShindanData', JSON.stringify(formData))
    router.push('/marketing-shindan/result')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-light to-white py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-8">Webマーケティング診断</h1>
        
        <form onSubmit={handleSubmit} className="card">
          <div className="space-y-6">
            {/* 基本情報 */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-bold mb-4">基本情報</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">会社名</label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="株式会社サンプル"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">業界</label>
                  <select
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    required
                  >
                    <option value="">選択してください</option>
                    {industryOptions.map((industry) => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 現在の集客経路 */}
            <div>
              <label className="block text-sm font-medium mb-3">
                現在の主な集客経路（複数選択可）
              </label>
              <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                {trafficSourceOptions.map((source) => (
                  <label key={source.value} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.currentTrafficSources.includes(source.value)}
                      onChange={() => handleTrafficSourceToggle(source.value)}
                      className="mr-3 w-4 h-4 text-accent"
                    />
                    <span className="text-gray-700">{source.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* マーケティング目標 */}
            <div>
              <label className="block text-sm font-medium mb-3">
                マーケティングの目標（複数選択可）
              </label>
              <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                {marketingGoalOptions.map((goal) => (
                  <label key={goal.value} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.marketingGoals.includes(goal.value)}
                      onChange={() => handleMarketingGoalToggle(goal.value)}
                      className="mr-3 w-4 h-4 text-accent"
                    />
                    <span className="text-gray-700">{goal.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 現在の課題 */}
            <div>
              <label className="block text-sm font-medium mb-3">
                現在の課題・困りごと（複数選択可）
              </label>
              <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                {challengeOptions.map((challenge) => (
                  <label key={challenge.value} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.currentChallenges.includes(challenge.value)}
                      onChange={() => handleChallengeToggle(challenge.value)}
                      className="mr-3 w-4 h-4 text-accent"
                    />
                    <span className="text-gray-700">{challenge.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 追加情報 */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">月間マーケティング予算</label>
                <select
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                >
                  <option value="">選択してください</option>
                  <option value="50000">5万円以下</option>
                  <option value="100000">10万円以下</option>
                  <option value="300000">30万円以下</option>
                  <option value="500000">50万円以下</option>
                  <option value="1000000">100万円以下</option>
                  <option value="over">100万円以上</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Webサイト URL（任意）</label>
                <input
                  type="url"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent"
                  value={formData.websiteUrl}
                  onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">ターゲット顧客</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent"
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                placeholder="30代女性、個人事業主、地域の企業経営者など"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">その他ご相談内容（任意）</label>
              <textarea
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent"
                rows={4}
                value={formData.additionalInfo}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                placeholder="具体的な課題や要望があればご記入ください"
              />
            </div>

            {/* 送信ボタン */}
            <div className="text-center pt-4">
              <button
                type="submit"
                className="bg-accent text-white font-bold py-4 px-8 text-lg rounded-lg hover:bg-teal-600 transition-colors duration-300"
                disabled={!formData.companyName || !formData.industry}
              >
                マーケティング診断結果を見る
              </button>
              {(!formData.companyName || !formData.industry) && (
                <p className="text-red-500 text-sm mt-2">
                  ※会社名と業界を入力してください
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}