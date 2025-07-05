import Link from 'next/link'

export default function Home() {
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

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="card group">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 transition-all">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-dark mb-3">新規制作診断</h2>
              <p className="text-gray-600 mb-6">
                Web制作・LP制作の概算見積もりを<br />
                簡単な質問に答えるだけで算出します
              </p>
            </div>
            <Link href="/shinki-shindan" className="btn-primary block text-center">
              診断を始める
            </Link>
          </div>

          <div className="card group">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-secondary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 transition-all">
                <svg className="w-10 h-10 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-dark mb-3">サイト改善診断</h2>
              <p className="text-gray-600 mb-6">
                既存サイトの課題を診断し<br />
                具体的な改善提案をご提示します
              </p>
            </div>
            <Link href="/kaizen-shindan" className="btn-secondary block text-center">
              診断を始める
            </Link>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500">
            診断結果をもとに、無料相談も承っております
          </p>
        </div>
      </div>
    </div>
  )
}