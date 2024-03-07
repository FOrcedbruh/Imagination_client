'use client'
import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import styles from './page.module.css';
import IImagination from "@/types/ImaginationType";
import Image from "next/image";
import editImg from './../../../images/icons/edit.svg';
import Message from "@/components/Message/Message";



const ImaginationPage  = ({params} : {params : { id : number}}) => {


    const [imaginations, setImaginations] = useState<IImagination[]>([]);
    const [text, setText] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [_id, set_id] = useState<string>('');
    const [message, setMessage] = useState<string>('');


    const titleHandler = (e: any) => {
        setTitle(e.target.value);
    }

    const textHandler = (e: any) => {
        setText(e.target.value);
    }

    const editHandler = () => {
        const src: string = 'http://localhost:8080/editNote';

        axios.post(src, {
            _id, text, title
        }).then(res => {
            setMessage(res.data.message);
        });

        setTimeout(() => setMessage(''), 3000);
    }


    useEffect(() => {
        const src: string = 'http://localhost:8080/auth/getNotes';
        const username: string | null = localStorage.getItem('username');
        axios.post(src, {
            username
        }).then(res => {
            setImaginations(res.data);
            const currentImagination = imaginations[params.id];
            setText(currentImagination.text);
            setTitle(currentImagination.title);
        })
    }, []);
    
    



    return (
        <section className={styles.page}>
            {message && <Message response={message}/>}
            <div className={styles.title}>
                <input type="text" value={title} onChange={e => titleHandler(e)}/>
            </div>
            <div className={styles.text}>
                <textarea  value={text} onChange={e => textHandler(e)}/>
            </div>
            <button onClick={editHandler} className={styles.editBtn}>Edit <Image src={editImg} alt="" width={20} height={20}/></button>
        </section>
    )
}

export default ImaginationPage;