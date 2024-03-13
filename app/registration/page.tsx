'use client'
import styles from './page.module.css';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';
import eyeImg from '../../images/icons/view.svg';
import non_viewImg from '../../images/icons/non_view.svg';
import { useState } from 'react';
import axios from 'axios';
import Message from '@/components/Message/Message';

const RegPage: React.FC = () => {


    const [response, setResponse] = useState<string>('');


    const [eye, setEye] = useState<boolean>(false);

    interface FormState {
        username: string,
        password: string,
        email: string
    }

    const {
        register,
        formState: {
            errors,
            isValid
        },
        reset,
        handleSubmit
    } = useForm<FormState>({mode: 'onBlur'});

   


    const closeMessage = () => {
        setTimeout(() => setResponse(''), 4000)
    }

    type sendData = { username: string, password: string, email: string}


    const onSubmit = (data: sendData) => {
        const src: string = 'http://localhost:8080/auth/registration'
        const username: string = data.username;
        const password: string = data.password;
        const email: string = data.email;


        axios.post(src, {
            username,
            email,
            password
        }).then(res => {
            setResponse(res.data.message);
        })

        closeMessage();
        reset();
    }

    

    return (
        <>
            <section className={styles.window}>
                {response && <Message response={response}/>}
                <h1>Registration</h1>
                <form className={styles.window} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.area}>
                        <label htmlFor="username">Name</label>
                        <input type="text" placeholder='name...' {...register('username', {
                            required: 'Enter your name',
                            minLength: {
                                value: 4,
                                message: 'min. value of name is 4'
                            }
                        })}/>
                        {errors.username && <article className={styles.error}>{errors.username.message}</article>}
                    </div>
                    <div className={styles.area}>
                        <label htmlFor="email">Email</label>
                        <input type="text" placeholder='example@gmail.com...' {...register('email', {
                            required: 'Enter your Email',
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Email syntax error'
                            }
                        })}/>
                        {errors.email && <article className={styles.error}>{errors.email.message}</article>}
                    </div>
                    <div className={styles.area}>
                        <label htmlFor="password">Password</label>
                        <section style={{'display': 'flex', 'gap': 20}}>
                            <input type={`${eye ? 'text' : 'password'}`} placeholder='qwerty...' {...register('password', {
                            required: 'Enter your password',
                            minLength: {
                                value: 6,
                                message: 'min. value of password is 6'
                            }
                        })}/>
                            <div onClick={() => setEye(!eye)}><Image src={eye ? non_viewImg : eyeImg} alt='' width={24} height={24}/></div>
                        </section>
                        {errors.password && <article className={styles.error}>{errors.password.message}</article>}
                    </div>
                    <input style={{'cursor': !isValid ? 'not-allowed' : 'pointer'}} type="submit" value={'Sign up'} className={styles.regBtn} disabled={!isValid}/>
                </form>
                <p className={styles.logLink}>Alredy have an account?<Link href={'/login'}>Login</Link></p>
            </section>
        </>
        
    )
}

export default RegPage;