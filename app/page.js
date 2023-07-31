import styles from './page.module.css'
import { CompCalc } from '../components'

export default function Home() {
  
  return (
    <main className={styles.main}>
      <CompCalc/>
    </main>
  )
}
