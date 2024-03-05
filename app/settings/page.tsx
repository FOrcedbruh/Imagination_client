import shareImg from './../../images/icons/share.svg';
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';





const Settings: React.FC = () => {


    return (
        <section className={styles.window}>
            <ul>
                <li><Link href={'/Profile'}>Profile <Image src={shareImg} alt='' height={24} width={24}/></Link></li>
                <li><p>Log out</p></li>
            </ul>
        </section>  
    )
}


export default Settings;