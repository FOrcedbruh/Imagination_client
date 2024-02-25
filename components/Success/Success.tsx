'use client'
import styles from './Success.module.css';
import Image from 'next/image';
import success from './../../images/icons/Success.svg';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface SuccessProps {
    title?: string
}

const Success: React.FC<SuccessProps> = ({title}) => {

    const router = useRouter();

    const [done, setDone] = useState<boolean>(false);
    const [doneAnim, setDoneAnim] = useState<boolean>(false);
    const [text, setText] = useState<boolean>(false);
    const [btn, setBtn] = useState<boolean>(false);


    useEffect(() => {
        setTimeout(() => setDone(true), 1000);
        setTimeout(() => setDoneAnim(true), 2000);
        setTimeout(() => setText(true), 3000);
        setTimeout(() => setBtn(true), 6000);
    }, [done])

    return (
        <section className={styles.window}>
            <Image className={doneAnim ? styles.anim : ''} src={success} alt='' style={{'opacity': done ? 1 : 0}}/>
            {text && <div><h1>{title} </h1><p className={styles.printed}>has been successfully saved into your Imagination Space</p></div>}
            <button style={{'opacity': btn ? 1 : 0}} className={styles.Btn} onClick={() => router.push('/')}>Go into Space</button>
        </section>
    )
}


export default Success;