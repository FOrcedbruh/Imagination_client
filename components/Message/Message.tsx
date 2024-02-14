import styles from './Message.module.css';







interface MessageProps {
    response: string
}



const Message: React.FC<MessageProps> = ({response}) => {


    return (
        <section className={styles.window}>
            <h1>{response}</h1>
        </section>
    )
}

export default Message;