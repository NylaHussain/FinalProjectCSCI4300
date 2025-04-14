
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

const ItemForm = () => {
  const [items, setItems] = useState([
    { id: 1, food: 'Apple', image: 'https://via.placeholder.com/100?text=Apple' },
    { id: 2, food: 'Banana', image: 'https://via.placeholder.com/100?text=Banana' },
    { id: 3, food: 'Carrot', image: 'https://via.placeholder.com/100?text=Carrot' }
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
            <li><a href="">Home</a></li>
            <li><a href="">My Pantry</a></li>
            <li><a href="">Make Recipe</a></li>
          </ul>
        </nav>
        <div className={styles.container}>
          <h2>Add New Item</h2>
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
    </>
  );
};

export default ItemForm;
