import { App } from '@types'
import Image from 'next/image'

export default function AppIcon({
  app,
  openApp
}: {
  app: App
  openApp: (app: App) => void
}) {
  return (
    <button
      key={app.id}
      onDoubleClick={() => openApp(app)}
      className="flex w-24 flex-col items-center rounded p-2 text-white hover:bg-white/20 transition-colors"
    >
      <Image
        src={`/${app.icon}`}
        width={48}
        height={48}
        alt=""
        className="mb-1 object-contain drop-shadow-md"
      />
      <span className="text-xs text-center drop-shadow-md">{app.title}</span>
    </button>
  )
}
