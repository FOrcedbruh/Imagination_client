'use client'
import axios from "axios";
import { useLayoutEffect, useState } from "react";
import styles from './page.module.css';
import IImagination from "@/types/ImaginationType";


const ImaginationPage  = ({params} : {params : { title : string}}) => {

    const [imaginations, setImaginations] = useState<IImagination[]>([]);

    useLayoutEffect(() => {
        const src: string = 'http://localhost:8080/auth/getNotes';
        const username: string | null = localStorage.getItem('username');
        axios.post(src, {
            username
        }).then(res => {
            console.log(res.data);
        })
    }, []);

    const imagination = imaginations.filter(el => el.title === params.title);

    return (
        <section>
            <div>
                <h1>
                    {imagination[0].title}
                </h1>
            </div>
            <div></div>
        </section>
    )
}

export default ImaginationPage;