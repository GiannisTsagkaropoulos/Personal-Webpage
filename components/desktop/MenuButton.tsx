import { MenuIcon } from '@types'
import Image from 'next/image'
import { IMAGE_SIZES } from '@constants'

const MenuIconComponent = (menuIcon: MenuIcon) => {
  return (
    <button onClick={menuIcon.action}>
      <Image
        src={menuIcon.imageLink}
        width={IMAGE_SIZES.MENU_ICON}
        height={IMAGE_SIZES.MENU_ICON}
        alt={menuIcon.alt}
      />
    </button>
  )
}

export default MenuIconComponent
