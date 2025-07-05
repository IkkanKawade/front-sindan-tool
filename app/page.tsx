import SwipeCards from '@/components/SwipeCards'

export default function Home() {
  const diagnosisCards = [
    {
      id: 'shinki',
      title: '新規制作診断',
      description: 'Web制作・LP制作の概算見積もりを簡単な質問に答えるだけで算出します',
      icon: (
        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      href: '/shinki-shindan',
      buttonText: '診断を始める',
      buttonClass: 'bg-white text-primary font-bold py-3 px-6 rounded-lg hover:bg-gray-100',
      color: 'bg-gradient-to-br from-primary to-blue-700',
    },
    {
      id: 'kaizen',
      title: 'サイト改善診断',
      description: '既存サイトの課題を診断し、具体的な改善提案をご提示します',
      icon: (
        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      href: '/kaizen-shindan',
      buttonText: '診断を始める',
      buttonClass: 'bg-white text-secondary font-bold py-3 px-6 rounded-lg hover:bg-gray-100',
      color: 'bg-gradient-to-br from-secondary to-red-600',
    },
    {
      id: 'marketing',
      title: 'Webマーケ診断',
      description: '集客経路を分析し、最適なマーケティング施策をご提案します',
      icon: (
        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      href: '/marketing-shindan',
      buttonText: '診断を始める',
      buttonClass: 'bg-white text-accent font-bold py-3 px-6 rounded-lg hover:bg-gray-100',
      color: 'bg-gradient-to-br from-accent to-teal-600',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-light to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-dark mb-6">
            Web制作診断・見積もりツール
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            新規Web制作の概算見積もりや、既存サイトの改善提案を
            <br className="hidden md:block" />
            無料で簡単に診断できるツールです
          </p>
        </div>

        <SwipeCards cards={diagnosisCards} />

        <div className="mt-16 text-center">
          <p className="text-gray-500">
            診断結果をもとに、無料相談も承っております
          </p>
        </div>
      </div>
    </div>
  )
}