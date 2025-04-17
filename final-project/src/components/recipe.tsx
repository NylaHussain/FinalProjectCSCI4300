'use client';
import Head from 'next/head';
import Image from 'next/image';
import styles from './recipe.module.css'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Recipe = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true); 
    const router = useRouter();
    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/');
        }
    }, [isLoggedIn]);
    return (
        <>
        <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Document</title>
        </Head>
        <div className = {styles.recipeBody}>
        <header className={styles.hero}>
        <nav className={styles.navbar}>
        <ul>
            <li><Link href="/welcome">Home</Link></li>
            <li><Link href="/item-search">Pantry</Link></li>
            <li>
            <button className={styles.logoutBtn} onClick={() => setIsLoggedIn(false)}>
              Logout
              </button>
            </li>
        </ul>
        </nav>
        <div className={styles.search_container}>
        <h1>Search for a Recipe</h1>
        <div className={styles.search_box}>
            <input type="text" placeholder="Enter meal or item name" />
        <button>Search</button>
        </div>
        </div>
        </header>

        <section className={styles.instructions}>
        <h2>Searched Meal Recipe</h2>
        <ul>
        <li>Instruction 1</li>
        <li>Instruction 2</li>
        <li>Instruction 3</li>
        <li>Instruction 4</li>
        </ul>
        </section>

        <section className={styles.ingredients}>
        <h2>Needed Ingredients</h2>
        <div className={styles.grid}>
            <div className={styles.card}>
            {/* <img src="images/ingredient.jpg" alt="Ingredient Image" /> */}
            <Image src="/images/foodIcon.jpg" alt="Ingredient Image" width={120} height={100}/>
            <h3>Recipe Item</h3>
            <p>Description</p>
            <button>Add to Cart</button>
        </div>
        <div className={styles.card}>
            {/* <img src="images/ingredient.jpg" alt="Ingredient Image" /> */}
            <Image src="/images/foodIcon.jpg" alt="Ingredient Image" width={120} height={100}/>
            <h3>Recipe Item</h3>
            <p>Description</p>
        <button>Add to Cart</button>
        </div>
        <div className={styles.card}>
            {/* <img src="images/ingredient.jpg" alt="Ingredient Image" /> */}
            <Image src="/images/foodIcon.jpg" alt="Ingredient Image" width={120} height={100}/>
            <h3>Recipe Item</h3>
            <p>Description</p>
            <button>Add to Cart</button>
        </div>
        <div className={styles.card}>
            {/* <img src="images/ingredient.jpg" alt="Ingredient Image" /> */}
            <Image src="/images/foodIcon.jpg" alt="Ingredient Image" width={120} height={100}/>
            <h3>Recipe Item</h3>
            <p>Description</p>
            <button>Add to Cart</button>
        </div>
        <div className={styles.card}>
            {/* <img src="images/ingredient.jpg" alt="Ingredient Image" /> */}
            <Image src="/images/foodIcon.jpg" alt="Ingredient Image" width={120} height={100}/> 
            <h3>Recipe Item</h3>
            <p>Description</p>
            <button>Add to Cart</button>
        </div>
        <div className={styles.card}>
            {/* <img src="images/ingredient.jpg" alt="Ingredient Image" /> */}
            <Image src="/images/foodIcon.jpg" alt="Ingredient Image" width={120} height={100}/>
            <h3>Recipe Item</h3>
            <p>Description</p>
            <button>Add to Cart</button>
        </div>
        <div className={styles.card}>
            {/* <img src="images/ingredient.jpg" alt="Ingredient Image" /> */}
            <Image src="/images/foodIcon.jpg" alt="Ingredient Image" width={120} height={100}/>           
            <h3>Recipe Item</h3>
            <p>Description</p>
            <button>Add to Cart</button>
        </div>
        <div className={styles.card}>
            {/* <img src="images/ingredient.jpg" alt="Ingredient Image" /> */}
            <Image src="/images/foodIcon.jpg" alt="Ingredient Image" width={120} height={100}/>
            <h3>Recipe Item</h3>
            <p>Description</p>
            <button>Add to Cart</button>
        </div>
        </div>
        <div className={styles.order_button}>
        <button>Order Recipe</button>
        </div>
        </section>
        </div>
        </>
    );
};

export default Recipe;