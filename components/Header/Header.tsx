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



const Header: React.FC = () => {

    const {  setProfileMenuBar, setProfileMenuBarAnim, token, setToken } = useContext(StoreContext);


    const router = useRouter();


    const [logoAnim, setLogoAnim] = useState<boolean>(false);

    interface UserType {
        username: string,
        email: string,
    }

    const [userData, setUserData] = useState<UserType | null>(null);



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
        setToken(localStorage.getItem('token'))
        if (token) {
            axios.post(src, {
                token
            }).then(res => {
                setUserData(res.data.userData);
                localStorage.setItem('username', res.data.userData.username);
            });
        }
        
    }, [token]);

    
    useEffect(() => {
        
        
        window.addEventListener('scroll', scrolHandler);


        return () => {
            window.removeEventListener('scroll', scrolHandler);
        }
        
    }, [logoAnim]);


    

    const openMenuBarHandler =() => {
        setProfileMenuBar(true);

        setTimeout(() => setProfileMenuBarAnim(true), 200);
    }

    return(
        <header className={styles.header}>
            <div className={styles.logo}  onClick={() => router.push('/')}>
                <Image src={logo} alt='' width={40} height={40}/>
            </div>
            <nav>
               <h1 className={logoAnim ? styles.animLogo : ''}>Imagination</h1>
            </nav>
            {token ? <div onClick={openMenuBarHandler} className={styles.profile}><Image alt='' src={profile} width={30} height={30}/><Link href={'profile'}>{userData?.username}</Link></div> : <div className={styles.account}>
                <Link href={'/registration'}>Sign up</Link>
                <Link href={'/login'} id={styles.loginLink}>Login</Link>
            </div>}
        </header>
    )
}

export default Header;