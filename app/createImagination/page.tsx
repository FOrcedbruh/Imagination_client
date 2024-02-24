'use client'
import styles from './page.module.css';
import requireDot from './../../images/icons/requireDot.svg';
import successDot from './../../images/icons/successDot.svg';
import { useState } from 'react';
import Image from 'next/image';
import Modal from '@/components/Modal/Modal';
import Success from '@/components/Success/Success';
import { useContext } from 'react';
import { StoreContext } from '@/Store/Store';


const imaginationsAdvices: string[] = ['Thoughts', 'Considerations', 'Mind', 'Principles', 'Dreams', 'Ideas', 'Memories'];



const NotePage: React.FC = () => {

    const { success } = useContext(StoreContext);

    const [title, setTitle] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [createNote, setCreateNote] = useState<boolean>(false);


    const modalTitle: string = 'What would tou call your thought?';

    const textHandler = (e: any) => {
        setText(e.target.value);
    }

   

    return (
        <section className={styles.window}>
            {success && <Success title={title}/>}
            <Modal setTitle={setTitle} title={title} openHandler={setCreateNote} open={createNote} isInput={true} ModalTitle={modalTitle} text={text}/>
            <div className={styles.space}>
                {<Image src={text ? successDot : requireDot} alt='' width={20} height={20}/>}
                <textarea className={styles.textarea} placeholder='...' value={text} onChange={e => textHandler(e)}>

                </textarea>
                <div className={styles.advice}>
                    <h1>Just begin typing...</h1>
                    <h2>Your {imaginationsAdvices.map((word, index) => {
                        return (
                            <span key={index}>{word}, </span>
                        )
                    })}
                    </h2>
                </div>
                <button style={{'opacity': text ? 1 : 0}} className={styles.Btn} onClick={() => setCreateNote(true)}>Record</button>
            </div>
            
        </section>
    )
}

export default NotePage;