import Head from 'next/head';
import styles from './welcome.module.css'

const Welcome = () => {
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
            <button className={styles.auth_button}>logout</button>
            </nav>
        </div>
        <div className ={styles.auth_image_wrapper}>
        <img className = {styles.auth_image} src="/images/pin_spread3.jpg" alt="food spread"/>
        <div className ={styles.auth_welcome}>
            <div className={styles.white_space}>
                <div className={styles.auth_welcome_text}>Welcome User</div>
                <div className ={styles.auth_route_buttons}>
                    <button className={styles.auth_search}>Search for Recipe</button>
                    <button className={styles.auth_search}>Add to Pantry</button>
                </div>
            </div>
        </div>
    </div>
    </>
    );
};

export default Welcome;