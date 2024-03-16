'use client'
import styles from './Header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import logo from '../../images/logo/Logo.png';
import profile from '../../images/icons/profile.png';
import axios from 'axios';
import { useContext } from 'react';
import { StoreContext } from '@/Store/Store';
import ProfileMenuBar from '../ProfileMenuBar/ProfileMenuBar';
import { getCookie, setCookie } from 'cookies-next';



const Header: React.FC = () => {

    const { profileMenuBar, setProfileMenuBar, setProfileMenuBarAnim } = useContext(StoreContext);

    const token: string | undefined = getCookie('token');

    const router = useRouter();


    const [logoAnim, setLogoAnim] = useState<boolean>(false);

    interface UserType {
        username: string,
        email: string,
    }

    const [userData, setUserData] = useState<UserType | null>(null);
    const [avatar, setAvatar] = useState<any>('');
    const [tokenCheck, setTokenCheck] = useState<boolean>(false);

    const scrolHandler = () => {
        const scroll = window.scrollY;
        if (scroll > 0) {
            setLogoAnim(true);
        } else if (scroll < 100) {
            setLogoAnim(false);
        }
    }

    const src: string = 'http://localhost:8080/auth/decodeToken';
    



    useEffect(() => {
        if (token) {
            axios.post(src, {
                token
            }).then(res => {
                setUserData(res.data.userData);
                setCookie('username', res.data.userData.username);
            });
            setTokenCheck(true);
        } else if (!token) {
            setTokenCheck(false);
        }
    }, [token]);

    
    useEffect(() => {
        
        
        window.addEventListener('scroll', scrolHandler);


        return () => {
            window.removeEventListener('scroll', scrolHandler);
        }
        
    }, [logoAnim]);


    useEffect(() => {
        setAvatar(getCookie('avatar'));
    }, [avatar])

    

    const openMenuBarHandler =() => {
        setProfileMenuBar(true);

        setTimeout(() => setProfileMenuBarAnim(true), 200);
    }

    return(
        <header className={styles.header}>
            {profileMenuBar && <ProfileMenuBar />}
            <section className={styles.logo}  onClick={() => router.push('/')}>
                <Image src={logo} alt='' width={40} height={40}/>
            </section>
            <nav>
               <h1 className={logoAnim ? styles.animLogo : ''}>Imagination</h1>
            </nav>
            
            {tokenCheck ? <section onClick={openMenuBarHandler} className={styles.profile}><Image src={profile} alt='' width={30} height={30}/><Link href={'#'}>{userData?.username}</Link></section> : <section className={styles.account}>
                <Link href={'/registration'}>Sign up</Link>
                <Link href={'/login'} id={styles.loginLink}>Login</Link>
            </section>}
        </header>
    )
}

export default Header;