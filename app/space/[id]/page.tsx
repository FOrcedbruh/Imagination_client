'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import styles from './page.module.css';
import IImagination from "@/types/ImaginationType";
import Image from "next/image";
import editImg from './../../../images/icons/edit.svg';
import Message from "@/components/Message/Message";
import { getCookie } from "cookies-next";



const ImaginationPage  = ({params} : {params : { id : string}}) => {

    

    const numberId: number = Number(params.id);

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
        const username: string | undefined = getCookie('username');
        axios.post(src, {
            username
        }).then(res => {
            setText(res.data[numberId].text);
            setTitle(res.data[numberId].title);
            set_id(res.data[numberId]._id);
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
            <button onClick={editHandler} className={styles.editBtn}>Edit <Image priority src={editImg} alt="" width={20} height={20}/></button>
        </section>
    )
}

export default ImaginationPage;