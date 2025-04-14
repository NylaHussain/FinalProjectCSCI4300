
// 'use client';
// import Head from 'next/head';
// import styles from './itemForm.module.css';

// const ItemForm = () => {
//     return (
//         <>
//             <Head>
//                 <meta charSet="UTF-8" />
//                 <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//                 <title>Document</title>
//             </Head>
//             <div className={styles.itemBody}>
//                 <nav className={styles.navbar}>
//                     <ul>
//                         <li><a href="">Home</a></li>
//                         <li><a href="">My Pantry</a></li>
//                         <li><a href="">Make Recipe</a></li>
//                     </ul>
//                 </nav>
//                 <div className={styles.container}>
//                     <h2>Add New Item</h2>
//                     <div className={styles.formContainer}>
//                         <form 
//                             className={styles.oneCol} 
//                             method="POST" 
//                             action="https://formsubmit.co/f78f7fc2fb8912e45a4273d4d7b629c7"
//                         >
//                             <input className={styles.formInput}
//                                 type="text" 
//                                 name="food" 
//                                 placeholder="Enter a food item you want to add" 
//                                 required 
//                             />
//                               <input className={styles.formInput}
//                                 type="text" 
//                                 name="image" 
//                                 placeholder="Enter an image of the food" 
//                                 required 
//                             />
//                             <br />
//                             <button type="submit">Add to pantry</button>
//                         </form>  
//                     </div>
//                 </div>
//             </div> 
//         </>
//     );
// };

// export default ItemForm;

'use client';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from './itemForm.module.css';
import Link from 'next/link';
import Image from 'next/image';

const ItemForm = () => {
  const [items, setItems] = useState([
    { id: 1, food: 'Apple', image: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg' },
    { id: 2, food: 'Banana', image: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg' },
    { id: 3, food: 'Carrot', image: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
  ]);

  const [formData, setFormData] = useState({ food: '', image: '' });

  // Print initial items on first render
  useEffect(() => {
    console.log('Initial items:', items);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      id: items.length + 1,
      food: formData.food,
      image: formData.image
    };

    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    console.log('Updated items:', updatedItems);

    // Clear form
    setFormData({ food: '', image: '' });
  };

  const handleRemove = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    console.log('Item removed:', id);
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Add Item</title>
      </Head>
      <div className={styles.itemBody}>
        <nav className={styles.navbar}>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/recipe-search">Make Recipe</Link></li>
          </ul>
        </nav>
        <div className={styles.container}>
          <h2>Pantry Inventory</h2>
          <h3>Add New Item</h3>
          <div className={styles.formContainer}>
            <form className={styles.oneCol} onSubmit={handleSubmit}>
              <input
                className={styles.formInput}
                type="text"
                name="food"
                placeholder="Enter a food item you want to add"
                value={formData.food}
                onChange={handleChange}
                required
              />
              <input
                className={styles.formInput}
                type="text"
                name="image"
                placeholder="Enter an image URL of the food"
                value={formData.image}
                onChange={handleChange}
                required
              />
              <br />
              <button type="submit">Add to pantry</button>
            </form>
          </div>
        </div>
      </div>
      <div className={styles.grid}>
          {items.map(item => (
    <div key={item.id} className={styles.gridItem}>
      <Image
  src={item.image}
  alt={item.food}
  width={100}
  height={100}
  className={styles.gridImage}
/>
      <p>{item.food}</p>
      <button onClick={() => handleRemove(item.id)} className={styles.removeBtn}>
        Remove
      </button>
    </div>
  ))}
</div>
    </>
  );
};

export default ItemForm;

