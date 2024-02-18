'use client'
import { StoreContext } from '@/Store/Store';
import styles from './page.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';


const Profile: React.FC = () => {


    const src: string = 'http://localhost:8080/getUser';

    const [userData, setUserData] = useState();

    useEffect(() => {
        const username: string | null = localStorage.getItem('username');
        axios.post(src, {
            username
        }).then(res => {
            console.log(res.data);
            setUserData(res.data);
        })
    }, [])


    return (
        <section className={styles.window}>
            
        </section>
    )
}

export default Profile;