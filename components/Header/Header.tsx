'use client'
import styles from './Header.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
            <div>

            </div>
            <nav>
               <h1 onClick={() => router.push('/')} className={logoAnim ? styles.animLogo : ''}>Imagination</h1>
            </nav>
            <div className={styles.account}>
                <Link href={'/registration'}>Sign up</Link>
                <Link href={'/login'} id={styles.loginLink}>Login</Link>
            </div>
        </header>
    )
}

export default Header;