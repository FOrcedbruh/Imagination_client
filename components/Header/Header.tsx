'use client'
import styles from './Header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import logo from '../../images/logo/Logo.png';




const Header: React.FC = () => {


    const router = useRouter()


    const [logoAnim, setLogoAnim] = useState<boolean>(false);


    const scrolHandler = () => {
        const scroll = window.scrollY;
        if (scroll > 0) {
            setLogoAnim(true);
        } else if (scroll < 100) {
            setLogoAnim(false);
        }
    }

    
    useEffect(() => {


        
        window.addEventListener('scroll', scrolHandler);


        return () => {
            window.removeEventListener('scroll', scrolHandler);
        }
        
    }, [logoAnim]);


    return(
        <header className={styles.header}>
            <div className={styles.logo}  onClick={() => router.push('/')}>
                <Image src={logo} alt='' width={40} height={40}/>
            </div>
            <nav>
               <h1 className={logoAnim ? styles.animLogo : ''}>Imagination</h1>
            </nav>
            <div className={styles.account}>
                <Link href={'/registration'}>Sign up</Link>
                <Link href={'/login'} id={styles.loginLink}>Login</Link>
            </div>
        </header>
    )
}

export default Header;