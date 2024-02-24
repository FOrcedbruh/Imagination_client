import styles from './Success.module.css';
import Image from 'next/image';
import success from './../../images/icons/Success.svg';



interface SuccessProps {
    title?: string
}

const Success: React.FC<SuccessProps> = ({title}) => {



    return (
        <section className={styles.window}>
            <Image src={success} alt=''/>
            <div><h1>{title} </h1><p className={styles.printed}>has been successfully saved into your Imagination Space</p></div>
        </section>
    )
}


export default Success;