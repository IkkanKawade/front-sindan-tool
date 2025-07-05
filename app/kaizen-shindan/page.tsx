'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type ImprovementData = {
  siteUrl: string
  issues: string[]
  competitorUrl: string
  additionalInfo: string
  currentTrafficSources: string[]
  marketingGoals: string[]
}

export default function KaizenShindan() {
  const router = useRouter()
  const [formData, setFormData] = useState<ImprovementData>({
    siteUrl: '',
    issues: [],
    competitorUrl: '',
    additionalInfo: '',
    currentTrafficSources: [],
    marketingGoals: [],
  })

  const issueOptions = [
    { value: 'low-inquiries', label: 'お問い合わせが少ない' },
    { value: 'mobile-unfriendly', label: 'スマホで見づらい' },
    { value: 'outdated-design', label: 'デザインが古い' },
    { value: 'slow-loading', label: '表示速度が遅い' },
    { value: 'poor-seo', label: '検索順位が低い' },
    { value: 'confusing-navigation', label: 'ナビゲーションがわかりにくい' },
    { value: 'low-conversion', label: 'コンバージョン率が低い' },
    { value: 'no-analytics', label: 'アクセス解析ができていない' },
    { value: 'low-traffic', label: 'アクセス数が少ない' },
    { value: 'no-marketing', label: '集客施策が不足している' },
  ]

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
  ]

  const handleIssueToggle = (issue: string) => {
    const updatedIssues = formData.issues.includes(issue)
      ? formData.issues.filter(i => i !== issue)
      : [...formData.issues, issue]
    setFormData({ ...formData, issues: updatedIssues })
  }

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 診断結果を保存して結果ページへ遷移
    localStorage.setItem('kaizenShindanData', JSON.stringify(formData))
    router.push('/kaizen-shindan/result')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-light to-white py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-8">サイト改善診断</h1>
        
        <form onSubmit={handleSubmit} className="card">
          <div className="space-y-6">
            {/* 既存サイトURL */}
            <div>
              <label className="block text-sm font-medium mb-1">
                既存サイトURL（任意）
              </label>
              <input
                type="url"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-secondary"
                value={formData.siteUrl}
                onChange={(e) => setFormData({ ...formData, siteUrl: e.target.value })}
                placeholder="https://example.com"
              />
            </div>

            {/* 課題チェックリスト */}
            <div>
              <label className="block text-sm font-medium mb-3">
                現在の課題（複数選択可）
              </label>
              <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                {issueOptions.map((issue) => (
                  <label key={issue.value} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.issues.includes(issue.value)}
                      onChange={() => handleIssueToggle(issue.value)}
                      className="mr-3 w-4 h-4 text-secondary"
                    />
                    <span className="text-gray-700">{issue.label}</span>
                  </label>
                ))}
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
                      className="mr-3 w-4 h-4 text-secondary"
                    />
                    <span className="text-gray-700">{source.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* マーケティング目標 */}
            <div>
              <label className="block text-sm font-medium mb-3">
                集客・マーケティングの目標（複数選択可）
              </label>
              <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                {marketingGoalOptions.map((goal) => (
                  <label key={goal.value} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.marketingGoals.includes(goal.value)}
                      onChange={() => handleMarketingGoalToggle(goal.value)}
                      className="mr-3 w-4 h-4 text-secondary"
                    />
                    <span className="text-gray-700">{goal.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 競合サイトURL */}
            <div>
              <label className="block text-sm font-medium mb-1">
                参考にしたい競合サイトURL（任意）
              </label>
              <input
                type="url"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-secondary"
                value={formData.competitorUrl}
                onChange={(e) => setFormData({ ...formData, competitorUrl: e.target.value })}
                placeholder="https://competitor.com"
              />
            </div>

            {/* 追加情報 */}
            <div>
              <label className="block text-sm font-medium mb-1">
                その他お困りのこと（任意）
              </label>
              <textarea
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-secondary"
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
                className="btn-secondary px-8 py-4 text-lg"
                disabled={formData.issues.length === 0}
              >
                診断結果を見る
              </button>
              {formData.issues.length === 0 && (
                <p className="text-red-500 text-sm mt-2">
                  ※課題を1つ以上選択してください
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}