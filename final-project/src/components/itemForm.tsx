'use client';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from './itemForm.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ItemForm = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [items, setItems] = useState([]);


  const [formData, setFormData] = useState({ food: '', image: '' });

  // Print initial items on first render
  useEffect(() => {
    fetchItemsFromDB(); // Load from MongoDB on page load
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleIncrease = (id) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  
  const handleDecrease = (id) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };  

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Prevent duplicates (case-insensitive)
  // if (items.some(item => item.food.toLowerCase() === formData.food.toLowerCase())) {
  //   alert('Item already exists in pantry!');
  //   return;
  // }

  //   const newItem = {
  //     id: items.length + 1,
  //     food: formData.food,
  //     image: formData.image,
  //     quantity: 1
  //   };   

  //   const updatedItems = [...items, newItem];
  //   setItems(updatedItems);
  //   localStorage.setItem('pantryItems', JSON.stringify(updatedItems));
  //   setFormData({ food: '', image: '' });
  //   console.log('Updated items:', updatedItems);

  //   // Clear form
  //   setFormData({ food: '', image: '' });
  // };

  const fetchItemsFromDB = async () => {
    try {
      const res = await fetch("/api/items"); // or use the full URL for testing
      if (!res.ok) throw new Error("Failed to fetch items from DB");
  
      const data = await res.json();
      console.log("Fetched from DB:", data.items);
  
      // Transform DB format to match your local item format
      const formattedItems = data.items.map((dbItem, index) => ({
        id: dbItem._id,
        food: dbItem.item,
        image: dbItem.url,
        quantity: parseInt(dbItem.quantity),
      }));
  
      setItems(formattedItems);
    } catch (err) {
      console.error("Error fetching items from DB:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prevent duplicates (case-insensitive)
    if (items.some(item => item.food.toLowerCase() === formData.food.toLowerCase())) {
      alert('Item already exists in pantry!');
      return;
    }
  
    const newItem = {
      id: items.length + 1,
      food: formData.food,
      image: formData.image,
      quantity: 1,
    };
  
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    localStorage.setItem('pantryItems', JSON.stringify(updatedItems));
    setFormData({ food: '', image: '' });
  
    // ✅ Send to MongoDB
    try {
      const response = await fetch("../api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          owner: 1, // Replace with actual user ID when implemented
          item: formData.food,
          quantity: "1",
          url: formData.image,
        }),
      });
      const data = await response.json(); // 👈 parse the response
      console.log("Response data:", data);
      if (!response.ok) {
        throw new Error("Failed to add item to database");
      }
  
      console.log("Item saved to MongoDB");
    } catch (err) {
      console.error("MongoDB error:", err);
    }
  };

  const handleRemove = async (id) => {
    try {
      const res = await fetch(`../api/items/${id}`, {
        method: 'DELETE',
      });
  
      if (!res.ok) {
        const contentType = res.headers.get('Content-Type');
        const errorMessage = contentType?.includes('application/json')
          ? (await res.json()).message
          : await res.text();
  
        throw new Error(errorMessage || 'Unknown error');
      }
  
      console.log('Item deleted successfully');
  
      setItems(prevItems => prevItems.filter(item => item.id !== id));
    } catch (err) {
      console.error('Delete error:', err.message);
      alert('Could not delete item. Please try again.');
    }
  };
  
  
     
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Add Item</title>
      </Head>
      <div className={styles.itemBody}>
        <nav className={styles.navbar}>
          <ul>
            <li><Link href="/welcome">Home</Link></li>
            <li><Link href="/recipe-search">Make Recipe</Link></li>
            <li>
              <button className={styles.logoutBtn} onClick={() => setIsLoggedIn(false)}>
              Logout
              </button>
            </li>
          </ul>
        </nav>
        <div className ={styles.pantry_container}>
        <div className={styles.white_space}>
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
        </div>
      </div>
      <div className={styles.grid}>
          {items.map(item => {
          console.log("item id", item.id);
          return (
          <div key={item.id} className={styles.gridItem}>
          <Image
          src={item.image}
          alt={item.food}
          width={100}
          height={100}
          className={styles.gridImage}
/>
      <p>{item.food}</p>

      <div className={styles.quantityContainer}>
      <button onClick={() => handleDecrease(item.id)} className={styles.qtyBtn}>-</button>
      <span className={styles.qtyNumber}>{item.quantity}</span>
      <button onClick={() => handleIncrease(item.id)} className={styles.qtyBtn}>+</button>
    </div>

      <button onClick={() => handleRemove(item.id)} className={styles.removeBtn}>
        Remove
      </button>
    </div>
    );
  })}
</div>
    </>
  );
};

export default ItemForm;

