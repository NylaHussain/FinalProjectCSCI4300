'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Head from 'next/head';
import styles from './welcome.module.css'

const Welcome = () => {
    const router = useRouter();

    const handleRecipeLoginClick = () => {
    router.push('/recipe-search'); // this will take user to app/login/page.js
    };

    const handleItemLoginClick = () => {
        router.push('/item-search'); // this will take user to app/login/page.js
        };

    const handleLogoutClick =  () => {
        router.push('/');
    };

    return (
        <>
        <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Document</title>
        </Head>
        <div className={styles.auth_header}>
            <nav className={styles.auth_nav}>
            <p className={styles.auth_title}>Pantry Poppers</p>
            <button className={styles.auth_button} onClick={handleLogoutClick}>logout</button>
            </nav>
        </div>
        <div className ={styles.auth_image_wrapper}>
        <div className={styles.auth_image}>
        <Image
         src="/images/pin_spread3.jpg"
         alt="food spread"
         fill
         style={{ objectFit: 'cover' }}
        />
        </div>
        <div className ={styles.auth_welcome}>
            <div className={styles.white_space}>
                <div className={styles.auth_welcome_text}>Welcome User</div>
                <div className ={styles.auth_route_buttons}>
                    <button className={styles.auth_search} onClick={handleRecipeLoginClick}>Search for Recipe</button>
                    <button className={styles.auth_search} onClick={handleItemLoginClick}>Search for Item</button>
                    <button className={styles.auth_search} onClick={handleItemLoginClick}> Pantry</button>
                </div>
            </div>
        </div>
    </div>
    </>
    );
};

export default Welcome;
