import { App } from '@types'

export default function AppIcon({
  app,
  openApp,
}: {
  app: App
  openApp: (app: App) => void
}) {
  return (
    <button
      key={app.id}
      onDoubleClick={() => openApp(app)}
      className="flex flex-col items-center w-24 p-2 rounded hover:bg-white/20 transition-colors"
    >
      <span className="text-4xl mb-1">{app.icon}</span>
      <span className="text-xs text-center drop-shadow-md">{app.title}</span>
    </button>
  )
}
