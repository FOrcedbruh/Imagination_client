import styles from './BackBtn.module.css';
import Image from 'next/image';
import arrow from './../../images/icons/arrow.svg';



const BackBtn: React.FC = () => {
    return (
        <button className={styles.Btn}>
            <Image src={arrow} alt='' width={30} height={30}/>
            <p>Back</p>
        </button>
    )
}


export default BackBtn;