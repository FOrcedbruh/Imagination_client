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
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';






const Space: React.FC = () => {



    const router = useRouter();

    const [imaginations, setImaginations] = useState<IImagination[]>([]);
    const [editing, setEditing] = useState<boolean>(false);
    const [editingAnim, setEditingAnim] = useState<boolean>(false);
    const [grayscale, setGrayscale] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => setGrayscale(true), 300);
    }, []);



    useLayoutEffect(() => {
        const src: string = 'http://localhost:8080/auth/getNotes';
        const username: string | undefined = getCookie('username');
        axios.post(src, {
            username
        }).then(res => {
            setImaginations(res.data);
        })
    }, [imaginations]);



    const [clickImagination, setClickImagination] = useState<IImagination>();
    const [id, setId] = useState<number>(0);

    const showEditingWindow = (index: number) => {
        setEditing(true);
        setClickImagination(imaginations[index]);
        setId(index);
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
        closeEditingWindow();
    }
    return (
        <section className={styles.window}>
            <Image priority src={space} alt='' className={styles.space} style={{'filter': grayscale ? 'grayscale(0)' : 'grayscale(1)'}}/>
            <div className={styles.imaginations}>
                {imaginations.length > 0 ? imaginations.map((note, index) => {
                    return (
                        <article className={styles.Imagination} key={index} onDoubleClick={() => showEditingWindow(index)}>
                            <div>
                                <h1>{note.title}</h1>
                                <h5>{note.text}</h5>
                            </div>
                        </article>
                    )
                }) : <article className={styles.Imagination}>
                        <div>
                            <h1>There are no records yet</h1>
                            <h5><Link href={'/createImagination'}>Let's Imagine</Link></h5>
                        </div>
                    </article>
                    }
            </div>
            {editing && <div className={`${styles.editing} ${editingAnim ? styles.editingShow : null}`}>
                <div onClick={closeEditingWindow} className={styles.close}><Image priority src={close} alt='' width={24} height={24}/></div>
                <h1>{clickImagination?.title}</h1>
                <button onClick={() => deleteHandler(clickImagination?._id)}>Delete <Image src={deleteImg} priority alt='' width={20} height={20}/></button>
                <button onClick={() => router.push(`/space/${id}`)}>Edit <Image src={editImg} priority alt='' width={20} height={20}/></button>
            </div>}
            <div className={styles.goToCreate}>
                <Link href={'/createImagination'}>Create Imagination  <Image src={arrow} alt='' width={20} height={20}/></Link>
            </div>
        </section>
    )
}



export default Space;