'use client'
import styles from './page.module.css';
import Link from 'next/link';
import arrowImg from '../images/icons/arrow.svg';
import Image from 'next/image';
import { useContext } from 'react';
import { StoreContext } from '@/Store/Store';
import ProfileMenuBar from '@/components/ProfileMenuBar/ProfileMenuBar';

const HomePage: React.FC = () => {


    const { profileMenuBar } = useContext(StoreContext);


    return (
        <section className={styles.window}>
            {profileMenuBar && <ProfileMenuBar />}
            <div className={styles.getStarted}>
                <Link href={'/createImagination'}><p>Get started</p> <Image src={arrowImg} alt='' width={24} height={24}/></Link>
            </div>
        </section>
    )
}


export default HomePage;