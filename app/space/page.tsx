'use client'
import styles from './page.module.css';
import Image from 'next/image';
import space from './../../images/space.jpg';
import axios from 'axios';
import { useState, useEffect, useLayoutEffect } from 'react';
import IImagination from '@/types/ImaginationType';
import deleteImg from './../../images/icons/delete.svg';
import editImg from './../../images/icons/edit.svg';
import close from './../../images/icons/plus.svg';
import Link from 'next/link';
import arrow from './../../images/icons/arrow.svg';

const Space: React.FC = () => {


    const [imaginations, setImaginations] = useState<IImagination[]>([]);
    const [editing, setEditing] = useState<boolean>(false);
    const [editingAnim, setEditingAnim] = useState<boolean>(false);
    const [grayscale, setGrayscale] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => setGrayscale(true), 300);
    }, []);



    useLayoutEffect(() => {
        const src: string = 'http://localhost:8080/auth/getNotes';
        const username: string | null = localStorage.getItem('username');
        axios.post(src, {
            username
        }).then(res => {
            setImaginations(res.data);
        })
    }, []);



    const [editingImagination, setEditingImagination] = useState<IImagination>();

    const showEditingWindow = (index: number) => {
        setEditing(true);
        setEditingImagination(imaginations[index]);

        setTimeout(() => setEditingAnim(true), 50);
    }
    const closeEditingWindow = () => {
        setEditingAnim(false);

        setTimeout(() => setEditing(false), 50);
    }
    

    const deleteHandler = (_id: string | undefined) => {

        const src: string = 'http://localhost:8080/auth/deleteImagination';
        axios.post(src, {
            _id
        }).then(res => {
            console.log(res.data);
        });

        window.location.reload();
    }
    return (
        <section className={styles.window}>
            <Image priority src={space} alt='' className={styles.space} style={{'filter': grayscale ? 'grayscale(0)' : 'grayscale(1)'}}/>
            <div className={styles.imaginations}>
                {imaginations.map((note, index) => {
                    return (
                        <article className={styles.Imagination} key={index} onDoubleClick={() => showEditingWindow(index)}>
                            <div>
                                <h1>{note.title}</h1>
                                <h5>{note.text}</h5>
                            </div>
                        </article>
                    )
                })}
            </div>
            {editing && <div className={`${styles.editing} ${editingAnim ? styles.editingShow : null}`}>
                <div onClick={closeEditingWindow} className={styles.close}><Image src={close} alt='' width={24} height={24}/></div>
                <h1>{editingImagination?.title}</h1>
                <button onClick={() => deleteHandler(editingImagination?._id)}>Delete <Image src={deleteImg} priority alt='' width={20} height={20}/></button>
                <button>Edit <Image src={editImg} priority alt='' width={20} height={20}/></button>
            </div>}
            <div className={styles.goToCreate}>
                <Link href={'/createImagination'}>Create Imagination  <Image src={arrow} alt='' width={20} height={20}/></Link>
            </div>
        </section>
    )
}



export default Space;