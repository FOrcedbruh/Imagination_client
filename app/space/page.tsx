'use client'
import styles from './page.module.css';
import Image from 'next/image';
import space from './../../images/space.jpg';
import axios from 'axios';
import { useState, useEffect, useLayoutEffect } from 'react';
import IImagination from '@/types/ImaginationType';



const Space: React.FC = () => {


    const [imaginations, setImaginations] = useState<IImagination[]>([]);
    const [editing, setEditing] = useState<boolean>(false);
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

    const currentImagination = (index: number) => {
        setEditing(true);
        setEditingImagination(imaginations[index]);
    }

    return (
        <section className={styles.window}>
            <Image src={space} alt='' className={styles.space} style={{'filter': grayscale ? 'grayscale(0)' : 'grayscale(1)'}}/>
            <div className={styles.imaginations}>
                {imaginations.map((note, index) => {
                    return (
                        <article className={styles.Imagination} key={index} onDoubleClick={() => currentImagination(index)}>
                            <div>
                                <h1>{note.title}</h1>
                                <h5>{note.text}</h5>
                            </div>
                        </article>
                    )
                })}
            </div>
            {editing && <div className={styles.editing}>
                <h1>{editingImagination?.title}</h1>
                <button>Delete</button>
            </div>}
        </section>
    )
}



export default Space;