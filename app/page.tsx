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
    const [text, setText] = useState<boolean>(false);


    const renderWelcome = () => {
        if (!token) {
            setWelcome(true);
            setTimeout(() => setBlur(true), 700)
        } else if (token) {
            setText(true);
        }
    }

    



    return (
        <section className={styles.window}>
            {welcome && <Welcome blur={blur}/>}
            <div className={styles.topSector}>
                <div className={styles.getStarted} onClick={renderWelcome}>
                    <p>Get started</p> <Image src={arrowImg} alt='' width={24} height={24}/>
                </div>
                <div className={`${styles.mainText} ${text ? styles.showText : null}`}>
                <h5>
                    Familiarize yourself with the templates of possible options for recording imagination or immediately <Link href={'/createImagination'}>start</Link> putting your thoughts on the canvas
                </h5>
            </div>
            </div>
        </section>
    )
}


export default HomePage;