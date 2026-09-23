export const LAYER_MAPPING = {
  LOADING_SCREEN: 0,
  LOGIN_SCREEN: 1,
  WELCOME_SCREEN: 2,
  DESKTOP: 3
}

export const IMAGE_SIZES = {
  MENU_ICON: 28,
  DESKTOP_ICON: 64
}

export const MENU_ICONS = [
  {
    alt: 'Volume',
    showing: { imageLink: true },
    action: () => {},
    imageLink: '/menuBar/volume.png',
    precedence: 1
  },
  {
    alt: 'Network',
    showing: { imageLink: true },
    action: () => {},
    imageLink: '/menuBar/network.png',
    precedence: 2
  },
  {
    alt: 'Clock',
    showing: {
      text: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    action: () => {
      console.log('Clock clicked')
    },
    precedence: 3
  }
]

export const DOMAIN = 'https://www.giannis.com'