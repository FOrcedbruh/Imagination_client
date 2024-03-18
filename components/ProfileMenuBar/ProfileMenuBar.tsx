'use client'
import { StoreContext } from '@/Store/Store';
import styles from './ProfileMenuBar.module.css';
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { deleteCookie } from 'cookies-next';


const ProfileMenuBar: React.FC = () => {

    const { setProfileMenuBar} = useContext(StoreContext);
    const [opacity, setOpacity] = useState<boolean>(false);

    const closeMenuBarHandler =() => {
        setOpacity(false);
        setTimeout(() => setProfileMenuBar(false), 300);
    }

    useEffect(() => {
        setOpacity(true);
    }, [])

    const logoutHanlder = () => {
        deleteCookie('token');
        deleteCookie('username');
    }

    return (
        <section onClick={closeMenuBarHandler} style={{'opacity': opacity ? 1 : 0}} className={styles.window}>
            <ul>
                <li><Link href={'/profile'}>Profile</Link></li>
                <li><Link href={'/settings'}>Settings</Link></li>
                <li><Link href={'/space'}>Space</Link></li>
                <li><Link onClick={logoutHanlder} href={'/'}>Log out</Link></li>
            </ul>
        </section>
    )
}

export default ProfileMenuBar;