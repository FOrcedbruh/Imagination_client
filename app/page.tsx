'use client'
import styles from './page.module.css';
import Link from 'next/link';
import arrowImg from '../images/icons/arrow.svg';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { StoreContext } from '@/Store/Store';
import Welcome from '@/components/Welcome/Welcome';


const HomePage: React.FC = () => {


    const { token } = useContext(StoreContext);

    const [welcome, setWelcome] = useState<boolean>(false);
    const [blur, setBlur] = useState<boolean>(false);

    const renderWelcome = () => {
        if (!token) {
            setWelcome(true);
            setTimeout(() => setBlur(true), 700)
        }
    }



    return (
        <section className={styles.window}>
            {welcome && <Welcome blur={blur}/>}
            <div className={styles.getStarted} onClick={renderWelcome}>
                <Link  href={`${token ? '/createImagination' : '/'}`}><p>Get started</p> <Image src={arrowImg} alt='' width={24} height={24}/></Link>
            </div>
        </section>
    )
}


export default HomePage;