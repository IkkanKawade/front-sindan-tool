'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getImprovementSuggestions } from '@/lib/improvementSuggestions'
import { getMarketingSuggestions } from '@/lib/marketingSuggestions'

type ImprovementData = {
  siteUrl: string
  issues: string[]
  competitorUrl: string
  additionalInfo: string
  currentTrafficSources: string[]
  marketingGoals: string[]
}

export default function KaizenShindanResult() {
  const router = useRouter()
  const [formData, setFormData] = useState<ImprovementData | null>(null)
  const [suggestions, setSuggestions] = useState<ReturnType<typeof getImprovementSuggestions>>([])
  const [marketingSuggestions, setMarketingSuggestions] = useState<ReturnType<typeof getMarketingSuggestions>>([])

  useEffect(() => {
    const savedData = localStorage.getItem('kaizenShindanData')
    if (savedData) {
      const data = JSON.parse(savedData) as ImprovementData
      setFormData(data)
      setSuggestions(getImprovementSuggestions(data.issues))
      setMarketingSuggestions(getMarketingSuggestions(
        data.currentTrafficSources || [],
        data.marketingGoals || [],
        data.issues
      ))
    } else {
      router.push('/kaizen-shindan')
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

  const handlePrint = () => {
    window.print()
  }

  if (!formData || !suggestions) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-light to-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">サイト改善診断結果</h1>

        {/* サイト情報 */}
        {formData.siteUrl && (
          <div className="card mb-8">
            <h2 className="text-xl font-bold mb-4">診断対象サイト</h2>
            <p className="text-gray-700">{formData.siteUrl}</p>
          </div>
        )}

        {/* 改善提案 */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-bold text-center">改善提案</h2>
          {suggestions.map((suggestion, index) => (
            <div key={suggestion.issue} className="card">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold">{suggestion.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(suggestion.priority)}`}>
                  {getPriorityLabel(suggestion.priority)}
                </span>
              </div>
              <p className="text-gray-700 mb-4">{suggestion.description}</p>
              <div>
                <h4 className="font-bold mb-2">推奨される改善策</h4>
                <ul className="space-y-2">
                  {suggestion.solutions.map((solution, sIndex) => (
                    <li key={sIndex} className="flex items-start">
                      <svg className="w-5 h-5 text-secondary mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700">{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* 競合サイト情報 */}
        {formData.competitorUrl && (
          <div className="card mb-8">
            <h3 className="text-lg font-bold mb-3">参考競合サイト</h3>
            <p className="text-gray-700">{formData.competitorUrl}</p>
            <p className="text-sm text-gray-500 mt-2">
              競合サイトの良い点を参考にしながら、独自性のあるサイトを構築することが重要です。
            </p>
          </div>
        )}

        {/* Webマーケティング施策提案 */}
        {marketingSuggestions.length > 0 && (
          <div className="space-y-6 mb-8">
            <h2 className="text-2xl font-bold text-center">Webマーケティング施策提案</h2>
            {marketingSuggestions.map((suggestion, index) => (
              <div key={suggestion.strategy} className="card">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold">{suggestion.title}</h3>
                  <div className="flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(suggestion.priority)}`}>
                      {getPriorityLabel(suggestion.priority)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${
                      suggestion.difficulty === 'easy' ? 'text-green-600 bg-green-50 border-green-200' :
                      suggestion.difficulty === 'medium' ? 'text-yellow-600 bg-yellow-50 border-yellow-200' :
                      'text-red-600 bg-red-50 border-red-200'
                    }`}>
                      難易度: {suggestion.difficulty === 'easy' ? '低' : suggestion.difficulty === 'medium' ? '中' : '高'}
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
                  <span className="text-primary font-bold">{suggestion.estimatedCost}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 追加情報 */}
        {formData.additionalInfo && (
          <div className="card mb-8">
            <h3 className="text-lg font-bold mb-3">その他のご要望</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{formData.additionalInfo}</p>
          </div>
        )}

        {/* 次のステップ */}
        <div className="card mb-8 bg-blue-50 border-blue-200">
          <h3 className="text-lg font-bold mb-3">次のステップ</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>この診断結果をもとに、具体的な改善計画を立てましょう</li>
            <li>優先度の高い項目から順に着手することをおすすめします</li>
            <li>専門家のアドバイスが必要な場合は、無料相談をご利用ください</li>
          </ol>
        </div>

        {/* アクションボタン */}
        <div className="text-center space-y-4">
          <button
            onClick={handlePrint}
            className="btn-secondary mr-4"
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
          .btn-primary,
          .btn-secondary {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}