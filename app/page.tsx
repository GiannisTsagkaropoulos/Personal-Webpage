'use client'

import { useEffect, useState } from 'react'
import LoadingScreen from '@/components/LoadingScreen'

import WelcomeScreen from '@components/WelcomeScreen'
import Desktop from '@components/Desktop'
import LoginScreen from '@/components/LoginScreen'

const LAYERMAPPING = {
  LOADING_SCREEN: 0,
  LOGIN_SCREEN: 1,
  WELCOME_SCREEN: 2,
  DESKTOP: 3,
}

export default function Home() {
  const [layer, setLayer] = useState(LAYERMAPPING.LOADING_SCREEN)

  useEffect(() => {
    console.log('Current Layer:', layer)
    if (layer === LAYERMAPPING.LOADING_SCREEN) {
      const timer = setTimeout(() => setLayer(LAYERMAPPING.LOGIN_SCREEN), 3000)
      return () => clearTimeout(timer)
    }

    if (layer === LAYERMAPPING.WELCOME_SCREEN) {
      const timer = setTimeout(() => setLayer(LAYERMAPPING.DESKTOP), 2000)
      return () => clearTimeout(timer)
    }
  }, [layer])

  return (
    <div className="relative h-dvh w-full overflow-hidden text-white font-sans">
      {layer === LAYERMAPPING.LOADING_SCREEN && <LoadingScreen />}

      {layer === LAYERMAPPING.LOGIN_SCREEN && (
        <LoginScreen
          handleRestart={() => setLayer(LAYERMAPPING.LOADING_SCREEN)}
          handleLogin={() => setLayer(LAYERMAPPING.WELCOME_SCREEN)}
        />
      )}

      {layer === LAYERMAPPING.WELCOME_SCREEN && <WelcomeScreen />}

      {layer === LAYERMAPPING.DESKTOP && (
        <Desktop onLogout={() => setLayer(LAYERMAPPING.LOGIN_SCREEN)} />
      )}
    </div>
  )
}
