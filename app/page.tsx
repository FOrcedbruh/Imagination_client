'use client'
import styles from './page.module.css';
import Link from 'next/link';
import arrowImg from '../images/icons/arrow.svg';
import Image from 'next/image';
import Welcome from '@/components/Welcome/Welcome';
import { useState } from 'react';
import { getCookie } from 'cookies-next';
import { Slider } from '@/components/Slider/Slider';

const HomePage: React.FC = () => {


    const token = getCookie('token');

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
        <section  className={styles.window}>
            {welcome && <Welcome blur={blur}/>}
            <div className={styles.topSector}>
                <div className={styles.getStarted} onClick={renderWelcome}>
                    <p>Just begin typing...</p> <Image src={arrowImg} alt='' width={24} height={24}/>
                </div>
                <div className={`${styles.mainText} ${text ? styles.showText : null}`}>
                    <h5>
                        Familiarize yourself with the templates of possible options for recording imagination or immediately <Link href={'/createImagination'}>start</Link> putting your thoughts on the canvas
                    </h5>
                </div>
            </div>
            <div className={styles.midSector}>
                <Slider width={400} height={200} duration='.5s' borderRadius={20} itemsCount={4}>
                    <h2>Your <span style={{'color': 'blueviolet'}}>Thoughts</span>...</h2>
                    <h2>in one place...</h2>
                    <h2>Imagination...</h2>
                    <h2 style={{'color': 'blueviolet'}}>Welcome</h2>
                </Slider>
            </div>
        </section>
    )
}


export default HomePage;