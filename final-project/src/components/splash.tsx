'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Head from 'next/head';
import styles from './splash.module.css';

const Splash = () => {
  const router = useRouter();
  const handleLoginClick = () => {
    router.push('/login'); 
  }; 

  const handleSignUpClick = () => {
    router.push('/signup');
  };

    return (
        <>
        <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
            <link href="https://fonts.googleapis.com/css2?family=Boldonse&display=swap" rel="stylesheet" />
            <title>Pantry Poppers</title>
        </Head>
        <div className={styles.home_header}>
            <nav className={styles.home_nav}>
              <p className={styles.home_title}>Pantry Poppers</p>
              <button className={styles.home_button} onClick={handleLoginClick}>login</button>
            </nav>
          </div>
    
          <div className={styles.home_welcome}>
            {/* <img src="images/food_spread1.webp" alt="food spread" /> */}
            <div className = {styles.firstImage}>
            <Image
            src="/images/food_spread.jpg"
            alt="food spread"
            fill
            style={{ objectFit: 'cover' }}
            priority
            />
            </div>
            <div className={styles.home_welcome_text}>Welcome to Pantry Poppers!</div>
          </div>
    
          <div className={styles.home_about}>
            <p>Our Mission</p>
            <p>Pantry Poppers is aimed at helping you easily make quick meals</p>
            <p>and shop for ingredients</p>
          </div>
    
          <div className={styles.home_desc}>
            <div className = {styles.imageWrapper}>
            <Image src="/images/friends_eating.jpg" 
            alt="friends eating"
            fill
            style={{ objectFit: 'cover' }}
            />
            </div>
            <div className={styles.desc1}>
              All<br />
              YOU<br />
              CAN<br />
              EAT
            </div>
            <div className={styles.imageWrapper}>
            <Image src="/images/friends_eating2.jpg" 
            alt="friends eating" 
            fill
            style={{ objectFit: 'cover' }}
            />
            </div>
            <div>
              AT<br />
              THE<br />
              CLICK<br />
              OF<br />
              A<br />
              BUTTON
            </div>
          </div>
    
          <div className={styles.shop_text}>SHOP</div>
    
          <div className={styles.shop_desc}>
            <p>Easily shop for all the ingredients you need</p>
            <div style={{ position: 'relative', width: '50vw', height: 'auto'}}>
            <Image
             src="/images/home_shopping.jpg"
              alt="lady shopping"
              fill
              style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className={styles.pantry_text}>PANTRY</div>
          <div className={styles.pantry_desc}>
            <div style={{ position: 'relative', width: '50vw', height: 'auto'}}>
            <Image 
            src="/images/pantry.jpg" 
            alt="lady shopping" 
            fill
            style={{ objectFit: 'cover' }}
            />
            </div>
            <p>
              Add items to your pantry!
              <br />
              <br />
              Keep track of what items you have and
              <br />
              what you need to make delicious new meals
            </p>
          </div>
    
          <div className={styles.home_sign_up}>
            <button onClick={handleSignUpClick}>SIGN UP</button>
          </div>
        </>
      );
};

export default Splash;