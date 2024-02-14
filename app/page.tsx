
import styles from './page.module.css';
import Link from 'next/link';
import arrowImg from '../images/icons/arrow.svg';
import Image from 'next/image';


const HomePage: React.FC = () => {

    


    return (
        <section className={styles.window}>
            <div className={styles.getStarted}>
                <Link href={'/createImagination'}><p>Get started</p> <Image src={arrowImg} alt='' width={24} height={24}/></Link>
            </div>
        </section>
    )
}


export default HomePage;