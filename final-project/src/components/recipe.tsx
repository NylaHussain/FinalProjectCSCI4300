import Head from 'next/head';
import styles from './recipe.module.css'

const Recipe = () => {
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
            <li><a href="#">Home</a></li>
            <li><a href="#">Add Item</a></li>
            <li><a href="#">History</a></li>
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
            <img src="/images/food_spread.jpg" alt="Ingredient Image" />
            <h3>Recipe Item</h3>
            <p>Description</p>
            <button>Add to Cart</button>
        </div>
        <div className={styles.card}>
            {/* <img src="images/ingredient.jpg" alt="Ingredient Image" /> */}
            <img src="/images/food_spread.jpg" alt="Ingredient Image" />
            <h3>Recipe Item</h3>
            <p>Description</p>
        <button>Add to Cart</button>
        </div>
        <div className={styles.card}>
            {/* <img src="images/ingredient.jpg" alt="Ingredient Image" /> */}
            <img src="/images/food_spread.jpg" alt="Ingredient Image" />
            <h3>Recipe Item</h3>
            <p>Description</p>
            <button>Add to Cart</button>
        </div>
        <div className={styles.card}>
            {/* <img src="images/ingredient.jpg" alt="Ingredient Image" /> */}
            <img src="/images/food_spread.jpg" alt="Ingredient Image" />
            <h3>Recipe Item</h3>
            <p>Description</p>
            <button>Add to Cart</button>
        </div>
        <div className={styles.card}>
            {/* <img src="images/ingredient.jpg" alt="Ingredient Image" /> */}
            <img src="/images/food_spread.jpg" alt="Ingredient Image" /> 
            <h3>Recipe Item</h3>
            <p>Description</p>
            <button>Add to Cart</button>
        </div>
        <div className={styles.card}>
            {/* <img src="images/ingredient.jpg" alt="Ingredient Image" /> */}
            <img src="/images/food_spread.jpg" alt="Ingredient Image" />
            <h3>Recipe Item</h3>
            <p>Description</p>
            <button>Add to Cart</button>
        </div>
        <div className={styles.card}>
            {/* <img src="images/ingredient.jpg" alt="Ingredient Image" /> */}
            <img src="/images/food_spread.jpg" alt="Ingredient Image" />           
            <h3>Recipe Item</h3>
            <p>Description</p>
            <button>Add to Cart</button>
        </div>
        <div className={styles.card}>
            {/* <img src="images/ingredient.jpg" alt="Ingredient Image" /> */}
            <img src="/images/food_spread.jpg" alt="Ingredient Image" />
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