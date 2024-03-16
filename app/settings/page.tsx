'use client'
import shareImg from './../../images/icons/share.svg';
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';
import logutImg from './../../images/icons/logoutImg.svg';
import qr from './../../images/icons/qr.svg';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import qrBotImg from './../../images/qrBot.svg';
import { deleteCookie } from 'cookies-next';

const Settings: React.FC = () => {

    const router = useRouter();


    const [voiceOn, setVoiceOn] = useState<boolean>(false);
    const [qrBotState, setQrBotState] = useState<boolean>(false);
    

    const logOutHandler = () => {
        deleteCookie('token');
        deleteCookie('username');
        setTimeout(() => router.push('/'), 1000);
    }


    const QrBot: React.FC = () => {

    
        const [qrBlur, setQrBlur] = useState<boolean>(false);

        useEffect(() => {
            setQrBlur(true);
        })

        

        return (
            <div onClick={() => setQrBotState(false)} className={`${styles.qrBot} ${qrBlur ? styles.blur : null}`}>
                <h1>Point the camera</h1>
                <p>Click to close</p>
                <div>
                    <Image src={qrBotImg} alt='' width={200} height={200}/>
                </div>
            </div>
        )
    }

    return (
        <section className={styles.window}>
            {qrBotState && <QrBot />}
            <ul>
                <li><Link href={'/profile'}>Profile </Link> <Image src={shareImg} alt='' height={24} width={24}/></li>
                <li className={styles.pointerEl} onClick={logOutHandler}><p>Log out</p> <Image src={logutImg} alt='' height={24} width={24}/></li>
                <li><p>Voice Assistant</p> <div className={`${styles.track} ${voiceOn ? styles.on : null}`} onClick={() => setVoiceOn(!voiceOn)}><div className={`${styles.thumb} ${voiceOn ? styles.animthumb : null}`}></div></div></li>
                <li className={styles.pointerEl} onClick={() => setQrBotState(true)}><p>Imagination bot</p> <Image src={qr} alt='' height={30} width={30}/></li>
                <li><Link href={'/'}>What on Imagination? ... Space? ...</Link> <Image src={shareImg} alt='' width={24} height={24}/></li>
            </ul>
        </section>
    )
}


export default Settings;