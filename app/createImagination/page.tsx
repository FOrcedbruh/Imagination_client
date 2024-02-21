'use client'
import styles from './page.module.css';
import requireDot from './../../images/icons/requireDot.svg';
import successDot from './../../images/icons/successDot.svg';
import { useState, useEffect } from 'react';

import Image from 'next/image';



const imaginationsAdvices: string[] = ['Thoughts', 'Considerations', 'Mind', 'Principles', 'Dreams', 'Ideas', 'Memories'];



const NotePage: React.FC = () => {

    const [text, setText] = useState<string>('');
    const [title, setTitle] = useState<string>('');


    const textHandler = (e: any) => {
        setText(e.target.value);
    }

    return (
        <section className={styles.window}>
            <div className={styles.space}>
                {<Image src={text ? successDot : requireDot} alt='' width={20} height={20}/>}
                <textarea className={styles.textarea} placeholder='...' value={text} onChange={e => textHandler(e)}>

                </textarea>
                <div className={styles.advice}>
                    <h1>Just begin typing...</h1>
                    <h2>Your <span>Thoughts</span>
                    </h2>
                </div>
            </div>
            
        </section>
    )
}

export default NotePage;