// Copied from: https://codepen.io/duptitung/pen/XMVNyZ
import styles from './LoadingBar.module.css'

export default function LoadingBar() {
  return (
    <div className={styles.container}>
      <div className={styles.box} />
      <div className={styles.box} />
      <div className={styles.box} />
    </div>
  )
}
