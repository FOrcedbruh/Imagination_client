'use client'
import { StoreContext } from '@/Store/Store';
import styles from './page.module.css';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import plus from './../../images/icons/plus.svg';
import Avatar from 'react-avatar-edit';
import profile from './../../images/icons/profile.png';


interface IUser {
    username: string,
    email: string,
    avatar: string
}






const Profile: React.FC = () => {

    const { token } = useContext(StoreContext);


    const src: string = 'http://localhost:8080/getUser';

    const [userData, setUserData] = useState<IUser[]>([]);

    useEffect(() => {
        const username: string | null = localStorage.getItem('username');
        axios.post(src, {
            username
        }).then(res => {
            console.log(res.data);
            setUserData(res.data);
            let avatar: string = res.data[0].avatar;
            if (avatar) {
                localStorage.setItem('avatar', res.data[0].avatar);
            }
        })
    }, [])

    const [avatarSrc, setAvatarSrc] = useState<any>(null);
    const [editAvatar, setEditAvatar] = useState<boolean>(false);
    const [preview, setPreview] = useState<null | any>(profile);

    const onCloseAvatarEdit = () => {
        setPreview(null)
    }

    const onCropAvatar = (view: any) => {
        setPreview(view);
    }
    
    const createAvatarSrc: string = 'http://localhost:8080/auth/createAvatar';

    const AvatarDoneHandler = () => {
        const username = userData[0].username;
        axios.post(createAvatarSrc, {
            username,
            preview
        }).then(res => {console.log(res.data)});
        setEditAvatar(false);
        window.location.reload();
    }

    return (
        <>  
            {token ? <section className={styles.window}>
                {editAvatar && <div className={styles.avatarEdit}><Avatar  onCrop={onCropAvatar} onClose={onCloseAvatarEdit} src={avatarSrc} width={300} height={300}/><p onClick={AvatarDoneHandler}>done</p></div>}
                <div className={styles.userInfo}>
                    <article>
                        <Image priority src={userData[0]?.avatar ? userData[0]?.avatar : preview} alt='' width={100} height={100}/>
                        <p onClick={() => setEditAvatar(true)}>add avatar &nbsp; <Image src={plus} alt='' width={15} height={15}/></p>
                    </article>
                    <article>
                        <h1>{userData[0]?.username}</h1>
                    </article>
                    <div className={styles.email}>
                        {userData[0]?.email}
                    </div>
                </div>
            </section>  : <h1 style={{'color': '#fff'}}>Go to authorization</h1>}
            
        </>
        
    )
}

export default Profile;