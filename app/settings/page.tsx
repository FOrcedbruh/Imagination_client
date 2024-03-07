'use client'
import shareImg from './../../images/icons/share.svg';
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';
import logutImg from './../../images/icons/logoutImg.svg';
import { useState } from 'react';
import qr from './../../images/icons/qr.svg';
import { useRouter } from 'next/navigation';

const Settings: React.FC = () => {

    const router = useRouter();

    const [voiceOn, setVoiceOn] = useState<boolean>(false);

    const logOutHandler = () => {
        localStorage.clear();
        setTimeout(() => router.push('/'), 1000);
        setTimeout(() => window.location.reload(), 2000);
    }


    return (
        <section className={styles.window}>
            <ul>
                <li><Link href={'/profile'}>Profile </Link> <Image src={shareImg} alt='' height={24} width={24}/></li>
                <li onClick={logOutHandler}><p>Log out</p> <Image src={logutImg} alt='' height={24} width={24}/></li>
                <li><p>Voice Assistant</p> <div className={`${styles.track} ${voiceOn ? styles.on : null}`} onClick={() => setVoiceOn(!voiceOn)}><div className={`${styles.thumb} ${voiceOn ? styles.animthumb : null}`}></div></div></li>
                <li><p>Imagination bot</p> <Image src={qr} alt='' height={30} width={30}/></li>
                <li><Link href={'/'}>What on Imagination? ... Space? ...</Link> <Image src={shareImg} alt='' width={24} height={24}/></li>
            </ul>
        </section>
    )
}


export default Settings;