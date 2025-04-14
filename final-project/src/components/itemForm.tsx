// 'use client';
// import { useRouter } from 'next/navigation';

// import Head from 'next/head';
// import styles from './itemForm.module.css'

// const itemForm = () => {
//     return (
//         <>
//         <Head>
//             <meta charSet="UTF-8" />
//             <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
//         <title>Document</title>
//         </Head>
//         <div className = {styles.itemBody}>
//         <nav className={styles.navbar}>
//         <ul>
//             <li><a href="">Home</a></li>
//             <li><a href="">My Pantry</a></li>
//             <li><a href="">Make Recipe</a></li>
//         </ul>
//         </nav>
//         <div className={styles.container}>
//         <h2>Add New Item</h2>
//         <div className={styles.form-container}>
//         <form className ={styles.one-col} method="POST" action="https://formsubmit.co/f78f7fc2fb8912e45a4273d4d7b629c7"/>
//             <input type="text" food="food" placeholder="Enter a food item you want to add" required/> 
//             <br/>
//             <button type="add">Add to pantry</button>
//         </form>  
//         </div>
//         </div>
//         </div> 
//         </>
//     );
// };

// export default itemForm;

'use client';
import Head from 'next/head';
import styles from './itemForm.module.css';

const ItemForm = () => {
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Document</title>
            </Head>
            <div className={styles.itemBody}>
                <nav className={styles.navbar}>
                    <ul>
                        <li><a href="">Home</a></li>
                        <li><a href="">My Pantry</a></li>
                        <li><a href="">Make Recipe</a></li>
                    </ul>
                </nav>
                <div className={styles.container}>
                    <h2>Add New Item</h2>
                    <div className={styles.formContainer}>
                        <form 
                            className={styles.oneCol} 
                            method="POST" 
                            action="https://formsubmit.co/f78f7fc2fb8912e45a4273d4d7b629c7"
                        >
                            <input className={styles.formInput}
                                type="text" 
                                name="food" 
                                placeholder="Enter a food item you want to add" 
                                required 
                            />
                            <br />
                            <button type="submit">Add to pantry</button>
                        </form>  
                    </div>
                </div>
            </div> 
        </>
    );
};

export default ItemForm;