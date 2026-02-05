'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import RestartButton from '@components/RestartButton'
import WaitScreen from '@components/WaitScreen'
import GiannisXP from '@components/GiannisXP'

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
    <div className="relative h-dvh overflow-hidden text-white">
      {/* Loading Screen */}
      {isLoading && <WaitScreen />}

      {/* Login Screen */}
      <div id="log-in" className="flex flex-col h-screen bg-blue-dark">
        <header className="h-32" />

        <main className="bg-blue-light h-full flex gap-8 flex-col lg:flex-row items-center justify-center">
          <div className="flex flex-col gap-12 br-2 items-end">
            <GiannisXP />
            <p className="text-2xl tracking-wide">
              To begin, click my user name
            </p>
          </div>

          <div className="h-0 w-[50%] lg:h-[50%] lg:w-0 border-1 border-white" />

          <button className="group flex gap-4 items-center p-4 rounded-md transition-all duration-500 hover:bg-gradient-to-r hover:from-blue-700 hover:to-transparent">
            <Image
              src="/profile.png"
              width={70}
              height={70}
              alt="Profile"
              className="rounded-md border-2 border-white group-hover:border-yellow-400"
            />

            <div>
              <p className="text-2xl font-semibold tracking-lighter text-left">
                Giannis Tsagkaropoulos
              </p>
              <p className="text-md text-left font-bold text-blue-800 group-hover:text-yellow-400">
                Software Engineer
              </p>
            </div>
          </button>
        </main>

        <footer className="bg-blue-dark flex items-center justify-between h-32 px-8 lg:px-16 font-thin">
          <div className="flex items-center gap-2 cursor-pointer">
            <div onClick={startLoading} className="h-[28px] w-[28px]">
              <RestartButton />
            </div>
            <p className="hover:cursor-auto ">Restart GiannisXP</p>
          </div>
          <p>
            After log on, you can not add or change accounts. <br />
            Just go to Control Panel and click User Accounts. Gotcha.
          </p>
        </footer>
      </div>
    </div>
  )
}
