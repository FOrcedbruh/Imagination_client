import Link from "next/link"
import styles from './page.module.css';

const Page: React.FC = () => {


    return (
        <section className={styles.window}>
            <Link href={'/login'}>Do want to <span>Login</span>?</Link>
        </section>
    )
}

export default Page;