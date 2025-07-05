'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

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

export default function ShinkiShindan() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    contactName: '',
    email: '',
    projectType: 'new',
    pageCount: '5',
    designLevel: 'standard',
    features: [],
    budget: '500000',
  })

  const totalSteps = 4

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleFeatureToggle = (feature: string) => {
    const updatedFeatures = formData.features.includes(feature)
      ? formData.features.filter(f => f !== feature)
      : [...formData.features, feature]
    setFormData({ ...formData, features: updatedFeatures })
  }

  const handleSubmit = () => {
    // 診断結果を保存して結果ページへ遷移
    localStorage.setItem('shinkiShindanData', JSON.stringify(formData))
    router.push('/shinki-shindan/result')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-light to-white py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-8">新規制作診断</h1>
        
        {/* プログレスバー */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`flex-1 text-center text-sm ${
                  step <= currentStep ? 'text-primary font-bold' : 'text-gray-400'
                }`}
              >
                STEP {step}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* フォーム */}
        <div className="card">
          {currentStep === 1 && (
            <div>
              <h2 className="text-xl font-bold mb-6">基本情報</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">会社名</label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="株式会社サンプル"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">担当者名</label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange('contactName', e.target.value)}
                    placeholder="山田太郎"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">メールアドレス</label>
                  <input
                    type="email"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="sample@example.com"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-xl font-bold mb-6">制作内容</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-3">制作タイプ</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="projectType"
                        value="new"
                        checked={formData.projectType === 'new'}
                        onChange={(e) => handleInputChange('projectType', e.target.value)}
                        className="mr-2"
                      />
                      <span>新規制作</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="projectType"
                        value="renewal"
                        checked={formData.projectType === 'renewal'}
                        onChange={(e) => handleInputChange('projectType', e.target.value)}
                        className="mr-2"
                      />
                      <span>リニューアル</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">ページ数</label>
                  <select
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
                    value={formData.pageCount}
                    onChange={(e) => handleInputChange('pageCount', e.target.value)}
                  >
                    <option value="1">1ページ（LP）</option>
                    <option value="5">5ページ以内</option>
                    <option value="10">10ページ以内</option>
                    <option value="20">20ページ以内</option>
                    <option value="30">30ページ以上</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-xl font-bold mb-6">デザイン・機能</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-3">デザインレベル</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="designLevel"
                        value="simple"
                        checked={formData.designLevel === 'simple'}
                        onChange={(e) => handleInputChange('designLevel', e.target.value)}
                        className="mr-2"
                      />
                      <span>シンプル（テンプレート活用）</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="designLevel"
                        value="standard"
                        checked={formData.designLevel === 'standard'}
                        onChange={(e) => handleInputChange('designLevel', e.target.value)}
                        className="mr-2"
                      />
                      <span>スタンダード（セミオーダー）</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="designLevel"
                        value="premium"
                        checked={formData.designLevel === 'premium'}
                        onChange={(e) => handleInputChange('designLevel', e.target.value)}
                        className="mr-2"
                      />
                      <span>プレミアム（フルオーダー）</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-3">必要な機能</label>
                  <div className="space-y-2">
                    {[
                      { value: 'contact', label: 'お問い合わせフォーム' },
                      { value: 'cms', label: 'CMS（更新機能）' },
                      { value: 'responsive', label: 'レスポンシブデザイン' },
                      { value: 'seo', label: 'SEO対策' },
                      { value: 'analytics', label: 'アクセス解析' },
                      { value: 'ssl', label: 'SSL対応' },
                    ].map((feature) => (
                      <label key={feature.value} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.features.includes(feature.value)}
                          onChange={() => handleFeatureToggle(feature.value)}
                          className="mr-2"
                        />
                        <span>{feature.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h2 className="text-xl font-bold mb-6">予算</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-3">ご予算</label>
                  <select
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                  >
                    <option value="300000">30万円以下</option>
                    <option value="500000">50万円以下</option>
                    <option value="1000000">100万円以下</option>
                    <option value="2000000">200万円以下</option>
                    <option value="3000000">300万円以上</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* ボタン */}
          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <button
                onClick={handlePrev}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                戻る
              </button>
            )}
            {currentStep < totalSteps ? (
              <button
                onClick={handleNext}
                className="btn-primary ml-auto"
              >
                次へ
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="btn-primary ml-auto"
              >
                診断結果を見る
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}