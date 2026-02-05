'use client'
import Image from 'next/image'

export default function RestartButton() {
  function handleClick() {
    console.log('clicked')
    window.location.reload()
  }

  return (
    <button onClick={handleClick}>
      <Image
        src="/restart.png"
        width={28}
        height={28}
        alt="Profile"
        className="rounded-sm border-[0.2px] border-white hover:cursor-pointer"
      ></Image>
    </button>
  )
}
