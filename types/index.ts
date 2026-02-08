export type App = {
  id: string
  title: string
  icon: string
  topLeft?: [number, number]
  height?: number
  width?: number
  menuItems?: { label: string; action: () => void }[]
  navItems?: { label: string; content: React.ReactNode }[]
  content?: any
  footerText?: string
}

export type MenuIcon = {
  alt: string
  showing: {
    imageLink?: boolean
    text?: string
  }
  action: () => void
  imageLink: string
}
