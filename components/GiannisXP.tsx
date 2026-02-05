import Image from 'next/image'
import styles from './GiannisXP.module.css'

export default function GiannisXP() {
  return (
    <div className="text-white w-[300px]">
      <div className="flex flex-row justify-between items-end">
        <p className={`${styles.top}`}>Tsagkaropoulos</p>
        <Image src="/xp.png" width={150} height={150} alt="XP logo" />
      </div>
      <p className={`${styles.mid}`}>
        Giannis<span>XP</span>
      </p>
      <p className={`${styles.bottom}`}>Software Engineer</p>
    </div>
  )
}
