
'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Head from 'next/head';
import jwt from 'jsonwebtoken';
import styles from './welcome.module.css';
import { useEffect, useState } from 'react';


const Welcome = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserName() {
      try {
        const res = await fetch("/api/items/user");
        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setUserName(data.username);
      } catch (error) {
        console.error("User fetch failed:", error);
        router.push("/login");
      }
    }

    fetchUserName();
  }, [router]);

  const handleRecipeLoginClick = () => {
    router.push('/recipe-search');
  };

  const handleItemLoginClick = () => {
    router.push('/item-search');
  };

  const handleLogoutClick = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    router.push('/');
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Pantry Poppers</title>
      </Head>
      <div className={styles.auth_header}>
        <nav className={styles.auth_nav}>
          <p className={styles.auth_title}>Pantry Poppers</p>
          <button className={styles.auth_button} onClick={handleLogoutClick}>logout</button>
        </nav>
      </div>
      <div className={styles.auth_image_wrapper}>
        <div className={styles.auth_image}>
          <Image src="/images/pin_spread3.jpg" alt="food spread" fill style={{ objectFit: 'cover' }} />
        </div>
        <div className={styles.auth_welcome}>
          <div className={styles.white_space}>
            <div className={styles.auth_welcome_text}>
              {userName ? `Welcome, ${userName}` : "Loading..."}
            </div>
            <div className={styles.auth_route_buttons}>
              <button className={styles.auth_search} onClick={handleRecipeLoginClick}>Search for Recipe</button>
              <button className={styles.auth_search} onClick={handleItemLoginClick}>Pantry</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;



