'use client'

import { useEffect, useState } from 'react'
import WaitScreen from '@components/WaitScreen'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  const startLoading = () => {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  useEffect(() => {
    startLoading()
  }, [])

  return (
    <div className="relative h-dvh overflow-hidden">
      {/* Loading Screen */}
      {isLoading && <WaitScreen />}
    </div>
  )
}
