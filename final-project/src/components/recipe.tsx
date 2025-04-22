'use client';
import Head from 'next/head';
import Image from 'next/image';
import styles from './recipe.module.css'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import connectMongoDB from '@/config/mongodb';
import Item from '@/app/models/itemSchema';

const Recipe = () => {

    const [query, setQuery] = useState('');
    const [recipeTitle, setRecipeTitle] = useState('');
    const [instructions, setInstructions] = useState([]);
    const [ingredients, setIngredients] = useState([]); 

    const handleAddToPantry = async (ingredient) => {
      const newItem = {
        owner: 1, 
        item: ingredient.name,
        quantity: "1",  
        url: ingredient.image,
      };

      try {
        const response = await fetch("../api/items", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", 
          },
          body: JSON.stringify(newItem),
        });

        const data = await response.json();
        if (response.ok) {
          console.log("Item added to pantry:", data);
        } else {
          console.error("Error adding item to pantry:", data);
        }
      } catch (err) {
        console.error("Error adding item to pantry:", err);
      }
    };

    const handleAddAllToPantry = async () => {
      try {
        const promises = ingredients.map((ing) => 
          fetch("/api/items", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              owner: 1, 
              item: ing.name,
              quantity: "1",
              url: ing.image,
            }),
          })
        );

        await Promise.all(promises);
        alert("All ingredients added to pantry!");
      } catch (err) {
        console.error("Error adding all to pantry:", err);
        alert("Failed to add some or all ingredients.");
      }
    };

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = async () => {
        if (!query.trim()) return;
      
        try {
          const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(query)}&number=1&apiKey=a21c910dbf564ef1be6ec33b24caf0ed`);
          const data = await response.json();
      
          const recipe = data.results[0];
          if (!recipe) return alert('No recipe found.');
      
          const { id, title } = recipe;
          setRecipeTitle(title); 
      
          const detailsResponse = await fetch(
            `https://api.spoonacular.com/recipes/${id}/information?apiKey=a21c910dbf564ef1be6ec33b24caf0ed`
          );
          const details = await detailsResponse.json();
      
          const parsedInstructions = details.analyzedInstructions?.[0]?.steps?.map(step => step.step) || [];
          setInstructions(parsedInstructions);
      
          const parsedIngredients = details.extendedIngredients?.map(ing => ({
            name: ing.name,
            image: `https://spoonacular.com/cdn/ingredients_100x100/${ing.image}`
          })) || [];
          console.log('Parsed Ingredients:', parsedIngredients);

          
          const pantryResponse = await fetch("/api/items");
          const pantryData = await pantryResponse.json();
          const pantryItems = pantryData.items || [];  
          console.log("pantry data", pantryItems);
          
          const filteredIngredients = parsedIngredients.filter(ingredient => 
            !pantryItems.some(pantryItem => 
              pantryItem.item.toLowerCase().includes(ingredient.name.toLowerCase())
            )
          );
          
          console.log("filtered", filteredIngredients);
          setIngredients(filteredIngredients);
      
        } catch (err) {
          console.error('Error fetching data:', err);
        }
      };

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
        <div className={styles.recipeBody}>
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
            <input
             type="text" 
             placeholder="Enter meal or item name" 
             value={query}
             onChange={handleInputChange}/>
        <button onClick={handleSearch}>Search</button>
        </div>
        </div>
        </header>
        <section className={styles.instructions}>
            <h2>{recipeTitle ? `${recipeTitle} Recipe` : 'Searched Meal Recipe'}</h2>
            <ul>
             {instructions.length > 0 ? (
             instructions.map((step, index) => (
            <li key={index}>{step}</li>
            ))
            ) : (
            <li>No instructions found.</li>
             )}
         </ul>
        </section>
        <section className={styles.ingredients}>
        <h2>Needed Ingredients</h2>
        <div className={styles.grid}>
        {ingredients.length > 0 ? (
         ingredients.map((item, index) => (
            <div className={styles.card} key={index}>
            <Image src={item.image} alt={item.name} width={120}height={100}/>
            {/* <Image src="/images/foodIcon.jpg" alt="Ingredient Image" width={120} height={100}/> */}
            <h3>{item.name}</h3>
            <p>{/* maybe add more later like grocery isle*/}</p>
            <button onClick={() => handleAddToPantry(item)}>Add to Pantry</button>
        </div>
        ))
        ) : (
        <p>No ingredients found.</p>
        )}
        </div>
        <div className={styles.order_button}>
        <button onClick={handleAddAllToPantry}>Add All to Pantry</button>
        </div>
        </section>
        </div>
        </>
    );
};

export default Recipe;