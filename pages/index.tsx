import Head from 'next/head'
import Simulation from '../components/Simulation'
import styles from '../styles/pages/index.module.scss'

export default function Home() {
    return (
        <div className={styles.container}>
            <div className={styles.nav}>
                <h1>Slime</h1>
            </div>
            <Simulation />
        </div>
    )
}
