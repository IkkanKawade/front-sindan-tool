import Link from 'next/link'

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-light to-white py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-8">お問い合わせ</h1>
        
        <div className="card">
          <p className="text-center text-lg mb-6">
            診断結果をもとに、無料相談を承っております。
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">お問い合わせ方法</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold mb-2">メール</h3>
                <p className="text-gray-700">info@example.com</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">電話</h3>
                <p className="text-gray-700">03-1234-5678（平日 9:00-18:00）</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              診断結果を保存またはキャプチャして、お問い合わせ時にご共有ください。
            </p>
            <Link
              href="/"
              className="btn-primary inline-block"
            >
              トップページに戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}