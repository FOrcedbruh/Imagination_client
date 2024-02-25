import {Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from './Modal.module.css';
import axios from 'axios';
import BackBtn from '../BackBtn/BackBtn';
import { useContext } from 'react';
import { StoreContext } from '@/Store/Store';

interface ModalProps {
    openHandler: Dispatch<SetStateAction<boolean>>
    open: boolean
    title: string,
    setTitle: Dispatch<SetStateAction<string>>
    isInput?: boolean,
    text?: string,
    BtnText?: string,
    ModalTitle: string
}


const Modal: React.FC<ModalProps> = ({open, openHandler, ModalTitle, title, setTitle,  isInput, text}) => {

    
    const [animate, setAnimate] = useState<boolean>(false);
    const { setSuccess } = useContext(StoreContext);

    useEffect(() => {
        setTimeout(() => setAnimate(true), 1000)
    }, [animate])

    
    const src: string = 'http://localhost:8080/auth/createNote'

    const createNote = () => {
        const username: string | null = localStorage.getItem('username');
        axios.post(src, {
            username,
            text,
            title: title
        }).then(res => {
            if (res.data.message === 'Note successfully created ') {
                openHandler(false);
                setSuccess(true);
            }
        })
    }

    const backBtnHandle = () => {
        openHandler(false);
        setAnimate(false);
    }

    return (
        <>{open && <section className={`${styles.window} ${animate ? styles.blur : null}`}>
            <div onClick={backBtnHandle}><BackBtn /></div>
            <div className={styles.modal}>
                <h2>{ModalTitle}</h2>
                {isInput && <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>}
                <button onClick={createNote} disabled={!(title && text)} style={{'cursor': !(title && text) ? 'not-allowed' : 'pointer'}}>
                    {title ? <p>Record {title}</p> : <p style={{'fontWeight': 700}}>. . .</p>}
                </button>
            </div>
        
        </section>}</>
    )
}


export default Modal;