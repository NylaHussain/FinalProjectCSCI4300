/*
use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Head from 'next/head';
import styles from './welcome.module.css'
import jwt from 'jsonwebtoken';
import { useEffect, useState } from 'react';

const Welcome = () => {
    const router = useRouter();
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        // Retrieve the JWT token from cookies
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

        if (!token) {
            // If no token is found, redirect to the login page
            router.push('/login');
            return;
        }

        try {
            // Decode the token to extract user info
            const decoded: any = jwt.decode(token);

            // If the token is valid, set the user's name
            if (decoded?.name) {
                setUserName(decoded.name);
            } else {
                console.log('Token is invalid, redirecting to login');
                // If the decoded token does not contain a name, redirect to login
                router.push('/login');
            }
        } catch (error) {
            console.error("Failed to decode token:", error);
            // If decoding fails, redirect to login
            router.push('/login');
        }
    }, [router]);

    const handleRecipeLoginClick = () => {
        router.push('/recipe-search'); // this will take user to app/login/page.js
    };

    const handleItemLoginClick = () => {
        router.push('/item-search'); // this will take user to app/login/page.js
    };
        
    const handlePantryClick = () => {
        router.push('/item-search'); // this will take user to app/login/page.js
    };

    const handleLogoutClick = () => {
        // Clear token from cookies and redirect to home page
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
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
            {userName ? (
              <div className={styles.auth_welcome_text}>Welcome, {userName}</div>
            ) : (
              <div className={styles.auth_welcome_text}>Loading...</div>
            )}
                <div className ={styles.auth_route_buttons}>
                    <button className={styles.auth_search} onClick={handleRecipeLoginClick}>Search for Recipe</button>
                    {/* <button className={styles.auth_search} onClick={handleItemLoginClick}>Search for Item</button> }
                    <button className={styles.auth_search} onClick={handleItemLoginClick}> Pantry</button>
                </div>
            </div>
        </div>
    </div>
    </>
    );
};

export default Welcome;

//testing
'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Head from 'next/head';
import styles from './welcome.module.css';
import jwt from 'jsonwebtoken';
import { useEffect, useState } from 'react';

const Welcome = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    console.log('Token from cookies:', token);
    if (!token) {
      console.log('No token found, redirecting to login');
      router.push('/login');
      return;
    }

    try {
      const decoded: any = jwt.decode(token);
      console.log('Decoded JWT:', decoded); 
      if (decoded?.username) {
        setUserName(decoded.username); // Ensure you are using the correct field
      } else {
        console.log('Token is invalid or expired, redirecting to login');
        router.push('/login');
      }
    } catch (error) {
      console.error('Failed to decode token:', error);
      router.push('/login');
    }
  }, [router]);

  const handleRecipeLoginClick = () => {
    router.push('/recipe-search');
  };

  const handleItemLoginClick = () => {
    router.push('/item-search');
  };

  const handlePantryClick = () => {
    router.push('/item-search');
  };

  const handleLogoutClick = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'; // Clear token
    router.push('/login');
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
            {userName ? (
              <div className={styles.auth_welcome_text}>Welcome, {userName}</div>
            ) : (
              <div className={styles.auth_welcome_text}>Loading...</div>
            )}
            <div className={styles.auth_route_buttons}>
              <button className={styles.auth_search} onClick={handleRecipeLoginClick}>Search for Recipe</button>
              <button className={styles.auth_search} onClick={handleItemLoginClick}> Pantry</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;



//works
'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Head from 'next/head';
import styles from './welcome.module.css';
import jwt from 'jsonwebtoken';
import { useEffect, useState } from 'react';

const Welcome = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // Log all cookies and the token to check if it's being set properly
    console.log('Cookies:', document.cookie);  // Log all cookies
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    console.log('Token from cookies:', token);  // Log token value

    if (!token) {
      console.log('No token found, redirecting to login');
      router.push('/login');
      return;
    }

    try {
      const decoded: any = jwt.decode(token);
      console.log('Decoded JWT:', decoded);  // Log the decoded token

      if (decoded?.username) {
        setUserName(decoded.username);  // Ensure the username is correctly decoded
      } else {
        console.log('Token is invalid or expired, redirecting to login');
        router.push('/login');
      }
    } catch (error) {
      console.error('Failed to decode token:', error);
      router.push('/login');
    }
  }, [router]);

  const handleRecipeLoginClick = () => {
    router.push('/recipe-search');
  };

  const handleItemLoginClick = () => {
    router.push('/item-search');
  };

  const handlePantryClick = () => {
    router.push('/item-search');
  };

  const handleLogoutClick = () => {
    // Clear token from cookies and redirect to login
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    router.push('/login');
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
            {userName ? (
              <div className={styles.auth_welcome_text}>Welcome, {userName}</div>
            ) : (
              <div className={styles.auth_welcome_text}>Loading...</div>
            )}
            <div className={styles.auth_route_buttons}>
              <button className={styles.auth_search} onClick={handleRecipeLoginClick}>Search for Recipe</button>
              <button className={styles.auth_search} onClick={handleItemLoginClick}> Pantry</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
*/


'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Head from 'next/head';
import jwt from 'jsonwebtoken';
import styles from './welcome.module.css';
import { useEffect, useState } from 'react';
//import Cookie from "js-cookie";

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



/*

'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Head from 'next/head';
import styles from './welcome.module.css';
import jwt from 'jsonwebtoken';
import { useEffect, useState } from 'react';

const Welcome = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // Get token from cookies using document.cookie
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

    if (!token) {
      console.log('No token found, redirecting to login');
      router.push('/login');
      return;
    }

    try {
      const decoded: any = jwt.decode(token);
      if (decoded?.username) {
        setUserName(decoded.username);  // Set the username if available
      } else {
        console.log('Token is invalid or expired, redirecting to login');
        router.push('/login');
      }
    } catch (error) {
      console.error('Failed to decode token:', error);
      router.push('/login');
    }
  }, [router]);

  const handleRecipeLoginClick = () => {
    router.push('/recipe-search');
  };

  const handleItemLoginClick = () => {
    router.push('/item-search');
  };

  const handlePantryClick = () => {
    router.push('/item-search');
  };

  const handleLogoutClick = () => {
    // Remove token from cookies
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    router.push('/login');
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
            {userName ? (
              <div className={styles.auth_welcome_text}>Welcome, {userName}</div>
            ) : (
              <div className={styles.auth_welcome_text}>Loading...</div>
            )}
            <div className={styles.auth_route_buttons}>
              <button className={styles.auth_search} onClick={handleRecipeLoginClick}>Search for Recipe</button>
              <button className={styles.auth_search} onClick={handleItemLoginClick}> Pantry</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
*/