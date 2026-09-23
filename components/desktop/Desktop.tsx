import Image from 'next/image'
import { useState, useRef } from 'react'
import { App } from '@types'
import AppIcon from '@components/desktop/AppIcon'
import AboutMe from '@/components/apps/AboutMe'
import Resume from '@/components/apps/Resume'
import Projects from '@/components/apps/Projects'
import { LINKEDIN_PROFILE, GITHUB_PROFILE } from '@/constants'

// Extended App state to manage position, size, and minimization
interface WindowState extends App {
  x: number
  y: number
  width: number
  height: number
  isMinimized: boolean
  isMaximized: boolean
  restoreBounds?: { x: number; y: number; width: number; height: number }
}

const AVAILABLE_APPS: App[] = [
  {
    id: 'about-me',
    title: 'About Me',
    icon: 'internet-explorer.png'
  },
  {
    id: 'resume',
    title: 'Resume',
    icon: 'pdf-2.png'
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: 'projects.png'
  }
]

export default function Desktop({
  onLogout,
  onShutdown
}: {
  onLogout: () => void
  onShutdown: () => void
}) {
  const [openWindows, setOpenWindows] = useState<WindowState[]>([])
  const [activeWindow, setActiveWindow] = useState<string | null>(null)
  const [showWelcomeTip, setShowWelcomeTip] = useState(true)
  const [showStartMenu, setShowStartMenu] = useState(false)

  // Dragging state tracking
  const dragRef = useRef<{
    id: string
    startX: number
    startY: number
    initialX: number
    initialY: number
  } | null>(null)

  // Resizing state tracking
  const resizeRef = useRef<{
    id: string
    startX: number
    startY: number
    initialW: number
    initialH: number
  } | null>(null)

  // Open App or restore if minimized
  const openApp = (app: App) => {
    const existing = openWindows.find((w) => w.id === app.id)
    if (existing) {
      if (existing.isMinimized) {
        setOpenWindows((prev) =>
          prev.map((w) => (w.id === app.id ? { ...w, isMinimized: false } : w))
        )
      }
      setActiveWindow(app.id)
      return
    }

    const width = Math.round(window.innerWidth * 0.5)
    const maximumX = Math.max(0, window.innerWidth - width)
    const minimumX = Math.min(160, maximumX)
    const randomX = Math.round(
      minimumX + Math.random() * Math.max(0, maximumX - minimumX)
    )
    const newWindow: WindowState = {
      ...app,
      x: randomX,
      y: 0,
      width,
      height: 0.9 * window.innerHeight,
      isMinimized: false,
      isMaximized: false
    }

    setOpenWindows((prev) => [...prev, newWindow])
    setActiveWindow(app.id)
  }

  // Close Window
  const closeWindow = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    setOpenWindows((prev) => prev.filter((w) => w.id !== id))
    if (activeWindow === id) {
      const remaining = openWindows.filter((w) => w.id !== id && !w.isMinimized)
      setActiveWindow(remaining[remaining.length - 1]?.id || null)
    }
  }

  const minimizeWindow = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    )
    if (activeWindow === id) {
      const remaining = openWindows.filter((w) => w.id !== id && !w.isMinimized)
      setActiveWindow(remaining[remaining.length - 1]?.id || null)
    }
  }

  const toggleMaximizeWindow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveWindow(id)
    setOpenWindows((prev) =>
      prev.map((windowState) => {
        if (windowState.id !== id) return windowState
        if (windowState.isMaximized && windowState.restoreBounds) {
          return {
            ...windowState,
            ...windowState.restoreBounds,
            isMaximized: false,
            restoreBounds: undefined
          }
        }
        return {
          ...windowState,
          x: 0,
          y: 0,
          width: window.innerWidth,
          height: Math.max(140, window.innerHeight - 40),
          isMaximized: true,
          restoreBounds: {
            x: windowState.x,
            y: windowState.y,
            width: windowState.width,
            height: windowState.height
          }
        }
      })
    )
  }

  // Toggle Window state from Taskbar
  const handleTaskbarClick = (id: string) => {
    const target = openWindows.find((w) => w.id === id)
    if (!target) return

    if (target.isMinimized) {
      setOpenWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, isMinimized: false } : w))
      )
      setActiveWindow(id)
    } else if (activeWindow === id) {
      minimizeWindow(id)
    } else {
      setActiveWindow(id)
    }
  }

  // Dragging logic (Title bar)
  const startDrag = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    setActiveWindow(id)
    const windowObj = openWindows.find((w) => w.id === id)
    if (!windowObj || windowObj.isMaximized) return

    dragRef.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      initialX: windowObj.x,
      initialY: windowObj.y
    }

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!dragRef.current) return
      const dx = moveEvent.clientX - dragRef.current.startX
      const dy = moveEvent.clientY - dragRef.current.startY

      const newX = Math.max(0, dragRef.current.initialX + dx)
      const newY = Math.max(0, dragRef.current.initialY + dy)

      setOpenWindows((prev) =>
        prev.map((w) =>
          w.id === dragRef.current?.id ? { ...w, x: newX, y: newY } : w
        )
      )
    }

    const handleMouseUp = () => {
      dragRef.current = null
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  // Resizing logic (Bottom-Right Handle)
  const startResize = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setActiveWindow(id)

    const windowObj = openWindows.find((w) => w.id === id)
    if (!windowObj || windowObj.isMaximized) return

    resizeRef.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      initialW: windowObj.width,
      initialH: windowObj.height
    }

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!resizeRef.current) return
      const dw = moveEvent.clientX - resizeRef.current.startX
      const dh = moveEvent.clientY - resizeRef.current.startY

      const newW = Math.max(220, resizeRef.current.initialW + dw)
      const newH = Math.max(140, resizeRef.current.initialH + dh)

      setOpenWindows((prev) =>
        prev.map((w) =>
          w.id === resizeRef.current?.id
            ? { ...w, width: newW, height: newH }
            : w
        )
      )
    }

    const handleMouseUp = () => {
      resizeRef.current = null
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-cover bg-center bg-no-repeat p-4 select-none"
      style={{ backgroundImage: "url('/giannis-xp.png')" }}
    >
      {/* Desktop Icons */}
      {AVAILABLE_APPS.map((app) => (
        <AppIcon app={app} key={app.id} openApp={openApp} />
      ))}

      {/* Windows Layer */}
      {openWindows.map((win) => {
        if (win.isMinimized) return null

        const isActive = activeWindow === win.id

        return (
          <div
            key={win.id}
            onClick={() => setActiveWindow(win.id)}
            className={`absolute flex flex-col bg-white border-2 rounded-t-lg shadow-2xl overflow-hidden ${
              isActive ? 'border-[#0054e3]' : 'border-[#7f9db9]'
            } ${isActive ? 'z-50' : 'z-10 opacity-90'}`}
            style={{
              top: win.y,
              left: win.x,
              width: win.width,
              height: win.height
            }}
          >
            {/* Title Bar (Draggable) */}
            <div
              onMouseDown={(e) => startDrag(win.id, e)}
              className={`p-1.5 flex justify-between items-center cursor-move select-none text-white ${
                isActive ? 'bg-[#0054e3]' : 'bg-[#7f9db9]'
              }`}
            >
              <span className="flex gap-1 font-bold text-sm truncate pr-2">
                <Image src={`/${win.icon}`} width={16} height={16} alt="" />
                {win.title}
              </span>

              {/* Control Buttons */}
              <div className="flex items-center gap-1">
                {/* Minimize Button */}
                <button
                  onClick={(e) => minimizeWindow(win.id, e)}
                  className="h-5 w-5 cursor-pointer transition duration-150 hover:brightness-130 focus-visible:brightness-150"
                  title="Minimize"
                >
                  <Image
                    src="/navigation/minimize.png"
                    width={22}
                    height={22}
                    alt=""
                  />
                </button>
                {/* Maximize / Restore Button */}
                <button
                  onClick={(e) => toggleMaximizeWindow(win.id, e)}
                  className="h-5 w-5 cursor-pointer transition duration-150 hover:brightness-130 focus-visible:brightness-150"
                  title={win.isMaximized ? 'Restore' : 'Maximize'}
                  aria-label={
                    win.isMaximized ? 'Restore window' : 'Maximize window'
                  }
                >
                  <Image
                    src={`/navigation/${win.isMaximized ? 'restore.png' : 'maximize.png'}`}
                    width={22}
                    height={22}
                    alt=""
                  />
                </button>
                {/* Close Button */}
                <button
                  onClick={(e) => closeWindow(win.id, e)}
                  className="h-5 w-5 cursor-pointer transition duration-150 hover:brightness-130 focus-visible:brightness-150"
                  title="Close"
                >
                  <Image
                    src="/navigation/exit.png"
                    width={22}
                    height={22}
                    alt=""
                  />
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto select-text">
              {win.id === 'about-me' && <AboutMe />}
              {win.id === 'resume' && <Resume />}
              {win.id === 'projects' && <Projects />}
            </div>

            {/* Resize Handle (Bottom-Right Corner) */}
            <div
              onMouseDown={(e) => startResize(win.id, e)}
              className={`absolute bottom-0 right-0 flex h-4 w-4 items-end justify-end p-0.5 ${win.isMaximized ? 'hidden' : 'cursor-se-resize'}`}
            >
              <div className="w-2 h-2 border-r-2 border-b-2 border-gray-400" />
            </div>
          </div>
        )
      })}

      {showStartMenu && (
        <div className="absolute bottom-10 left-0 z-[70] w-[min(92vw,560px)] overflow-hidden rounded-t-lg border-2 border-[#245edb] bg-white text-black shadow-2xl">
          <div className="flex items-center gap-3 bg-gradient-to-b from-[#3f8cf3] to-[#245edb] p-3 text-white">
            <Image
              src="/profile.png"
              width={44}
              height={44}
              alt="Giannis"
              className="rounded border-2 border-white object-cover"
            />
            <span className="text-xl font-bold">Giannis XP</span>
          </div>
          <div className="grid grid-cols-2 divide-x divide-[#aaa]">
            <div className="bg-white p-2">
              <button
                onClick={() => {
                  openApp(AVAILABLE_APPS[0])
                  setShowStartMenu(false)
                }}
                className="flex w-full items-center gap-3 p-2 text-left hover:bg-[#dbe8f5] hover:cursor-pointer"
              >
                <Image
                  src="/internet-explorer.png"
                  width={36}
                  height={36}
                  alt=""
                />
                <span className="font-bold">About Me</span>
              </button>
              <button
                onClick={() => {
                  openApp(AVAILABLE_APPS[1])
                  setShowStartMenu(false)
                }}
                className="flex w-full items-center gap-3 p-2 text-left hover:bg-[#dbe8f5] hover:cursor-pointer"
              >
                <Image src="/pdf.png" width={36} height={36} alt="" />
                <span className="font-bold">My Resume</span>
              </button>
              <button
                onClick={() => {
                  openApp(AVAILABLE_APPS[2])
                  setShowStartMenu(false)
                }}
                className="flex w-full items-center gap-3 p-2 text-left hover:bg-[#dbe8f5] hover:cursor-pointer"
              >
                <Image src="/projects.png" width={36} height={36} alt="" />
                <span className="font-bold">My Projects</span>
              </button>
            </div>
            <div className="bg-[#e8f2ff] p-2">
              <a
                href={LINKEDIN_PROFILE}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-2 font-bold hover:bg-[#cfe4ff]"
              >
                <Image
                  src="/start-menu/linkedin.png"
                  width={36}
                  height={36}
                  alt=""
                />
                LinkedIn
              </a>
              <a
                href={GITHUB_PROFILE}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-2 font-bold hover:bg-[#cfe4ff]"
              >
                <Image
                  src="/start-menu/github.png"
                  width={36}
                  height={36}
                  alt=""
                />
                GitHub
              </a>
            </div>
          </div>
          <div className="flex justify-end gap-2 bg-gradient-to-b from-[#3f8cf3] to-[#245edb] p-2 text-white">
            <button
              onClick={onLogout}
              className="flex items-center gap-2 rounded px-3 py-1 hover:bg-white/20"
            >
              <Image
                src="/start-menu/logout.png"
                width={24}
                height={24}
                alt=""
              />
              Log Off
            </button>
            <button
              onClick={onShutdown}
              className="flex items-center gap-2 rounded px-3 py-1 hover:bg-white/20"
            >
              <Image
                src="/start-menu/shut-down.png"
                width={24}
                height={24}
                alt=""
              />
              Shut Down
            </button>
          </div>
        </div>
      )}

      {showWelcomeTip && (
        <aside className="absolute bottom-14 right-4 z-[60] max-w-[350px] rounded-xl border border-[#333] bg-[#ffffe1] p-3 text-black shadow-xl">
          <button
            onClick={() => setShowWelcomeTip(false)}
            className="absolute right-2 top-2 h-6 w-6 shrink-0 items-center justify-center rounded border border-[#d6d3b8] bg-[#ffffe1] text-lg font-bold leading-none text-[#777] hover:bg-[#f0edcf] hover:text-black"
            aria-label="Close welcome tip"
          >
            x
          </button>

          <div className="flex items-start gap-3">
            <Image
              src="/info.png"
              width={20}
              height={20}
              alt="Information"
              className="shrink-0"
            />
            <h2 className="text-sm font-bold leading-tight">
              Welcome to Giannis XP
            </h2>
          </div>

          <div className="min-w-0 flex-1">
            <p className="mt-2 text-xs leading-5">
              My portfolio, built as a Windows XP desktop.
            </p>
            <p className="text-xs leading-5">
              - Double-click an icon to get started
            </p>
          </div>
          <div className="absolute -bottom-3 right-14 h-0 w-0 border-l-[13px] border-r-[13px] border-t-[13px] border-l-transparent border-r-transparent border-t-[#333]" />
          <div className="absolute -bottom-[10px] right-[58px] h-0 w-0 border-l-[11px] border-r-[11px] border-t-[11px] border-l-transparent border-r-transparent border-t-[#ffffe1]" />
        </aside>
      )}

      {/* Taskbar */}
      <footer className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-b from-[#245edb] to-[#3f8cf3] flex items-center justify-between z-50">
        <button
          onClick={() => setShowStartMenu((showing) => !showing)}
          className="bg-green-600 hover:bg-green-500 italic font-bold px-4 h-full rounded-r-xl border-r-2 border-yellow-400 flex items-center gap-2 text-white"
        >
          <Image src="/xp.png" width={28} height={28} alt="Start" />
          <span className="text-2xl tracking-wide">start</span>
        </button>

        <div className="flex-1 flex gap-1 px-2 overflow-x-auto">
          {openWindows.map((w) => (
            <button
              key={w.id}
              onClick={() => handleTaskbarClick(w.id)}
              className={`px-3 py-1 text-xs text-white rounded border flex items-center gap-1.5 max-w-[150px] truncate ${
                activeWindow === w.id && !w.isMinimized
                  ? 'bg-[#194090] border-blue-900 shadow-inner'
                  : 'bg-[#3c81f3] hover:bg-[#5293f5] border-blue-400'
              }`}
            >
              <span className="truncate">{w.title}</span>
            </button>
          ))}
        </div>

        <div className="flex h-full items-center gap-2 border-l border-white/30 bg-[#1291ed] px-3 text-xs text-white">
          <button
            onClick={() => setShowWelcomeTip(true)}
            className="flex h-7 w-7 items-center justify-center rounded hover:bg-white/20"
            title="Open welcome tip"
            aria-label="Open welcome tip"
          >
            <Image src="/info.png" width={22} height={22} alt="Information" />
          </button>
          {new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </footer>
    </div>
  )
}
