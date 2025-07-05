'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

type CardData = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  href: string
  buttonText: string
  buttonClass: string
  color: string
}

type SwipeCardsProps = {
  cards: CardData[]
}

export default function SwipeCards({ cards }: SwipeCardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    
    const currentX = e.touches[0].clientX
    const diff = currentX - startX
    setTranslateX(diff)
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    
    const threshold = 100
    
    if (translateX > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else if (translateX < -threshold && currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
    
    setIsDragging(false)
    setTranslateX(0)
    setStartX(0)
  }

  const handleMouseStart = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    
    const currentX = e.clientX
    const diff = currentX - startX
    setTranslateX(diff)
  }

  const handleMouseEnd = () => {
    if (!isDragging) return
    
    const threshold = 100
    
    if (translateX > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else if (translateX < -threshold && currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
    
    setIsDragging(false)
    setTranslateX(0)
    setStartX(0)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length)
  }

  // 自動スライド（オプション）
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setCurrentIndex((prev) => (prev + 1) % cards.length)
      }
    }, 5000) // 5秒ごと

    return () => clearInterval(interval)
  }, [isDragging, cards.length])

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* スワイプコンテナ */}
      <div 
        ref={containerRef}
        className="overflow-hidden rounded-xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseStart}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseEnd}
        onMouseLeave={handleMouseEnd}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div 
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% + ${isDragging ? translateX : 0}px))`,
          }}
        >
          {cards.map((card, index) => (
            <div
              key={card.id}
              className="w-full flex-shrink-0 px-4"
            >
              <div className={`card group min-h-[500px] ${card.color} relative overflow-hidden`}>
                {/* 背景グラデーション */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                
                <div className="text-center mb-8 relative z-10">
                  <div className="w-24 h-24 mx-auto mb-6 relative">
                    <div className="w-full h-full bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {card.icon}
                    </div>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
                    {card.title}
                  </h2>
                  <p className="text-white/90 text-lg mb-8 leading-relaxed drop-shadow">
                    {card.description}
                  </p>
                </div>
                
                <div className="text-center relative z-10">
                  <Link href={card.href} className={`${card.buttonClass} inline-block text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}>
                    {card.buttonText}
                  </Link>
                </div>

                {/* 装飾的な要素 */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl" />
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ナビゲーション矢印 */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-10"
        disabled={currentIndex === 0}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-10"
        disabled={currentIndex === cards.length - 1}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* ドットインジケーター */}
      <div className="flex justify-center mt-6 space-x-2">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-primary scale-125' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* スワイプヒント */}
      <div className="text-center mt-4">
        <p className="text-gray-500 text-sm">
          ← スワイプして診断を選択 →
        </p>
      </div>
    </div>
  )
}