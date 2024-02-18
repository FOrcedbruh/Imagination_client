'use client'
import { StoreContext } from '@/Store/Store';
import styles from './ProfileMenuBar.module.css';
import { useContext } from 'react';
import Link from 'next/link';



const ProfileMenuBar: React.FC = () => {

    const { profileMenuBarAnim, setProfileMenuBarAnim, setProfileMenuBar} = useContext(StoreContext);


    const closeMenuBarHandler =() => {
        setProfileMenuBarAnim(false);

        setTimeout(() => setProfileMenuBar(false), 200);
    }

    const logoutHanlder = () => {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <section onClick={closeMenuBarHandler} className={`${styles.window} ${profileMenuBarAnim ? styles.blur : ''}`}>
            <ul>
                <li><Link href={'/profile'}>Profile</Link></li>
                <li><Link href={'/settings'}>Settings</Link></li>
                <li><Link onClick={logoutHanlder} href={'/'}>Log out</Link></li>
            </ul>
        </section>
    )
}

export default ProfileMenuBar;