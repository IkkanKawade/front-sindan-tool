'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { calculateEstimate, formatFeatureName } from '@/lib/calculateEstimate'

type FormData = {
  companyName: string
  contactName: string
  email: string
  projectType: string
  pageCount: string
  designLevel: string
  features: string[]
  budget: string
}

export default function ShinkiShindanResult() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData | null>(null)
  const [estimate, setEstimate] = useState<ReturnType<typeof calculateEstimate> | null>(null)

  useEffect(() => {
    const savedData = localStorage.getItem('shinkiShindanData')
    if (savedData) {
      const data = JSON.parse(savedData) as FormData
      setFormData(data)
      setEstimate(calculateEstimate(data.pageCount, data.designLevel, data.features))
    } else {
      router.push('/shinki-shindan')
    }
  }, [router])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(price)
  }

  const getPageCountLabel = (count: string) => {
    const labels: Record<string, string> = {
      '1': '1ページ（LP）',
      '5': '5ページ以内',
      '10': '10ページ以内',
      '20': '20ページ以内',
      '30': '30ページ以上',
    }
    return labels[count] || count
  }

  const getDesignLevelLabel = (level: string) => {
    const labels: Record<string, string> = {
      'simple': 'シンプル（テンプレート活用）',
      'standard': 'スタンダード（セミオーダー）',
      'premium': 'プレミアム（フルオーダー）',
    }
    return labels[level] || level
  }

  const handlePrint = () => {
    window.print()
  }

  if (!formData || !estimate) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-light to-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">診断結果</h1>

        {/* 概算見積もり */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-primary">
            概算見積もり金額
          </h2>
          <div className="text-center mb-6">
            <p className="text-5xl font-bold text-primary mb-2">
              {formatPrice(estimate.totalPrice)}
            </p>
            <p className="text-gray-600">
              （{formatPrice(estimate.minPrice)} 〜 {formatPrice(estimate.maxPrice)}）
            </p>
          </div>

          {/* 内訳 */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-bold mb-4">内訳</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>基本料金（{getPageCountLabel(formData.pageCount)}）</span>
                <span className="font-medium">{formatPrice(estimate.basePrice)}</span>
              </div>
              {estimate.designFee > 0 && (
                <div className="flex justify-between">
                  <span>デザイン料金（{getDesignLevelLabel(formData.designLevel)}）</span>
                  <span className="font-medium">{formatPrice(estimate.designFee)}</span>
                </div>
              )}
              {estimate.featureFees.map((feature) => (
                <div key={feature.feature} className="flex justify-between">
                  <span>{formatFeatureName(feature.feature)}</span>
                  <span className="font-medium">{formatPrice(feature.price)}</span>
                </div>
              ))}
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>合計</span>
                <span className="text-primary">{formatPrice(estimate.totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 診断内容のサマリー */}
        <div className="card mb-8">
          <h2 className="text-xl font-bold mb-4">診断内容</h2>
          <div className="space-y-3 text-gray-700">
            <div>
              <span className="font-medium">会社名：</span>
              {formData.companyName}
            </div>
            <div>
              <span className="font-medium">担当者名：</span>
              {formData.contactName}
            </div>
            <div>
              <span className="font-medium">メールアドレス：</span>
              {formData.email}
            </div>
            <div>
              <span className="font-medium">制作タイプ：</span>
              {formData.projectType === 'new' ? '新規制作' : 'リニューアル'}
            </div>
            <div>
              <span className="font-medium">ページ数：</span>
              {getPageCountLabel(formData.pageCount)}
            </div>
            <div>
              <span className="font-medium">デザインレベル：</span>
              {getDesignLevelLabel(formData.designLevel)}
            </div>
            <div>
              <span className="font-medium">必要な機能：</span>
              <div className="mt-1">
                {formData.features.map((feature) => (
                  <span key={feature} className="inline-block bg-gray-100 px-3 py-1 rounded mr-2 mb-2">
                    {formatFeatureName(feature)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 注意事項 */}
        <div className="card mb-8 bg-yellow-50 border-yellow-200">
          <h3 className="text-lg font-bold mb-3">ご注意事項</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li>こちらは概算見積もりです。詳細なお見積もりはヒアリング後にご提示いたします。</li>
            <li>実際の金額は、要件の詳細によって変動する場合があります。</li>
            <li>表示価格は税抜きです。</li>
          </ul>
        </div>

        {/* アクションボタン */}
        <div className="text-center space-y-4">
          <button
            onClick={handlePrint}
            className="btn-primary mr-4"
          >
            印刷・PDF保存
          </button>
          <a
            href="/contact"
            className="btn-secondary inline-block"
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