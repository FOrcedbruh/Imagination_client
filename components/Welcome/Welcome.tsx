'use client'
import styles from './Welcome.module.css';
import { useState, useEffect } from 'react';



interface WelcomeProps {
    blur: boolean
}

const Welcome: React.FC<WelcomeProps> = ({blur}) => {


    const [text, setText] = useState<boolean>(false);
    const [printed, setPrinted] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => setPrinted(true), 1100);
        setTimeout(() => setText(true), 3700);
    }, [text])


    return (
        <section className={styles.window} style={{'backdropFilter': blur ? 'blur(16px)' : 'blur(0)'}}>
            {printed && <h1 className={styles.welcomeText}>Welcome to the space of <span>Thoughts</span></h1>}
            <h2 style={{'opacity': text ? 1 : 0}}>Here you can pour out your <span>soul</span> if it asks for it, or just write down the <span>important points</span> that your <span>head</span> is currently trying to think about</h2>
        </section>
    )
}



export default Welcome;