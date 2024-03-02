'use client'
import styles from './page.module.css';
import Image from "next/image";
import spaceImg from './../../../images/spaceImagination.jpg';

const Layout = ({children} : {children : React.ReactNode}) => {


    return (
        <section className={styles.window}>
            <header>

            </header>
            <Image src={spaceImg} alt="" className={styles.space}/>
            {children}
        </section>
    )
}

export default Layout;