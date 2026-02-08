import Image from 'next/image'
import { useState } from 'react'
import AppIcon from '@components/desktop/AppIcon'
import { App } from '@types'

const AVAILABLE_APPS: App[] = [
  {
    id: 'about-me',
    title: 'About Me  ',
    content: 'I am giannis',
    icon: '🌐'
  },
  {
    id: 'resume',
    title: 'Resume',
    content: 'I study...',
    icon: '📂'
  },
  {
    id: 'projects',
    title: 'Projects',
    content: 'Project 1 etc',
    icon: '⚙️'
  }
]

export default function Desktop({ onLogout }: { onLogout: () => void }) {
  const [openWindows, setOpenWindows] = useState<App[]>([])
  const [activeWindow, setActiveWindow] = useState<string | null>(null)

  const openApp = (app: App) => {
    if (!openWindows.find((w) => w.id === app.id)) {
      setOpenWindows([...openWindows, app])
    }
    setActiveWindow(app.id)
  }

  const closeWindow = (id: string) => {
    setOpenWindows(openWindows.filter((w) => w.id !== id))
    setActiveWindow(openWindows[0]?.id || null)
  }

  return (
    <div className="h-screen w-full bg-[#3a6ea5] relative p-4 bg-cover">
      {/* Desktop Icons */}
      {AVAILABLE_APPS.map((app) => (
        <AppIcon app={app} key={app.id} openApp={openApp} />
      ))}

      {/* Windows Layer */}
      {openWindows.map((window, index) => (
        <div
          key={window.id}
          onClick={() => setActiveWindow(window.id)}
          className={`absolute w-96 bg-red-200 border-2 border-[#0054e3] rounded-t-lg shadow-2xl overflow-hidden
            ${activeWindow === window.id ? 'z-50' : 'z-10 opacity-80'}`}
          style={{ top: 100 + index * 30, left: 200 + index * 30 }}
        >
          <div className="bg-gradient-to-r from-[#0054e3] to-[#27c0ff] p-2 flex justify-between items-center">
            <span className="font-bold text-sm">{window.title}</span>
            <button
              onClick={() => closeWindow(window.id)}
              className="bg-red-500 hover:bg-red-400 px-2 rounded border border-white text-xs"
            >
              X
            </button>
          </div>
          <div className="p-8 text-black h-48 bg-white">{window.content}</div>
        </div>
      ))}

      {/* Taskbar */}
      <footer className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-b from-[#245edb] to-[#3f8cf3] flex items-center justify-between">
        <button
          onClick={onLogout}
          className="bg-green-600 hover:bg-green-500 italic font-bold px-4 h-full rounded-r-xl border-r-2 border-yellow-400 flex items-center gap-2"
        >
          <Image src="/xp.png" width={28} height={28} alt="Start" />
          <span className="text-2xl tracking-wide">start</span>
        </button>

        <div className="flex-1 flex gap-1 px-2">
          {openWindows.map((w) => (
            <div
              key={w.id}
              onClick={() => setActiveWindow(w.id)}
              className={`px-4 py-1 text-xs border rounded ${activeWindow === w.id ? 'bg-blue-800' : 'bg-blue-500'}`}
            >
              {w.title}
            </div>
          ))}
        </div>

        <div className="bg-[#1291ed] h-full px-4 flex items-center text-xs border-l border-white/30">
          {new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </footer>
    </div>
  )
}
