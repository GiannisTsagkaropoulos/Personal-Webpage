import Image from 'next/image'
import { useState, useRef } from 'react'
import AppIcon from '@components/desktop/AppIcon'
import { App } from '@types'

// Extended App state to manage position, size, and minimization
interface WindowState extends App {
  x: number
  y: number
  width: number
  height: number
  isMinimized: boolean
}

const AVAILABLE_APPS: App[] = [
  {
    id: 'about-me',
    title: 'About Me',
    content: 'I am giannis',
    icon: 'internet-explorer.png'
  },
  {
    id: 'resume',
    title: 'Resume',
    content: 'I study...',
    icon: 'pdf.png'
  },
  {
    id: 'projects',
    title: 'Projects',
    content: 'Project 1 etc',
    icon: 'projects.png'
  }
]

export default function Desktop({ onLogout }: { onLogout: () => void }) {
  const [openWindows, setOpenWindows] = useState<WindowState[]>([])
  const [activeWindow, setActiveWindow] = useState<string | null>(null)

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

    const defaultOffset = openWindows.length * 30
    const newWindow: WindowState = {
      ...app,
      x: 200 + defaultOffset,
      y: 100 + defaultOffset,
      width: 384,
      height: 250,
      isMinimized: false
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
    if (!windowObj) return

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
    if (!windowObj) return

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
    <div className="h-screen w-full bg-[#3a6ea5] relative p-4 bg-cover select-none overflow-hidden">
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
            className={`absolute flex flex-col bg-white border-2 border-[#0054e3] rounded-t-lg shadow-2xl overflow-hidden ${
              isActive ? 'z-50' : 'z-10 opacity-90'
            }`}
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
              className="bg-[#0054e3] p-1.5 px-3 flex justify-between items-center cursor-move select-none text-white"
            >
              <span className="font-bold text-sm truncate pr-2">
                {win.title}
              </span>

              {/* Control Buttons */}
              <div className="flex items-center gap-1">
                {/* Minimize Button */}
                <button
                  onClick={(e) => minimizeWindow(win.id, e)}
                  className="bg-[#0054e3] hover:bg-[#27c0ff] text-white w-5 h-5 flex items-center justify-center rounded border border-white/60 text-xs font-bold leading-none"
                  title="Minimize"
                >
                  _
                </button>
                {/* Close Button */}
                <button
                  onClick={(e) => closeWindow(win.id, e)}
                  className="bg-red-500 hover:bg-red-400 text-white w-5 h-5 flex items-center justify-center rounded border border-white/60 text-xs font-bold leading-none"
                  title="Close"
                >
                  X
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-4 text-black bg-white overflow-auto select-text">
              {win.content}
            </div>

            {/* Resize Handle (Bottom-Right Corner) */}
            <div
              onMouseDown={(e) => startResize(win.id, e)}
              className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize flex items-end justify-end p-0.5"
            >
              <div className="w-2 h-2 border-r-2 border-b-2 border-gray-400" />
            </div>
          </div>
        )
      })}

      {/* Taskbar */}
      <footer className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-b from-[#245edb] to-[#3f8cf3] flex items-center justify-between z-50">
        <button
          onClick={onLogout}
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

        <div className="bg-[#1291ed] h-full px-4 flex items-center text-xs text-white border-l border-white/30">
          {new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </footer>
    </div>
  )
}
