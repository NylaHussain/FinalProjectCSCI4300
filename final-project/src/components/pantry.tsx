'use client';
import React, { useState } from 'react';
import styles from './pantry.module.css';
import Head from 'next/head';

export default function PantryApp() {
  const [input, setInput] = useState('');
  const [pantry, setPantry] = useState<string[]>([]);

  const handleAddItem = () => {
    if (input.trim() !== '') {
      setPantry([...pantry, input.trim()]);
      setInput('');
    }
  };

  const handleRemoveItem = (index: number) => {
    setPantry(pantry.filter((_, i) => i !== index));
  };

  return (
    <>
        <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
            <link href="https://fonts.googleapis.com/css2?family=Boldonse&display=swap" rel="stylesheet" />
            <title>Pantry</title>
        </Head>

            <nav className={styles.home_nav}>
                <p className={styles.home_title}>Pantry Poppers</p>
                <div className={styles.button_container}>
                    <button className={styles.home_button}>home</button>
                    <button className={styles.home_button}>logout</button>
                </div>
            </nav>

            <nav className={styles.home_nav}>
                <p className={styles.home_title}>My Pantry</p>
                <div className={styles.button_container}>
                    <button className={styles.home_button}>find a recipe</button>
                    <button className={styles.home_button}>add item</button>
                </div>
            </nav>
            

            <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
                <h1 className="text-3xl font-bold mb-4">Add New Item</h1>
        
                <div className="flex space-x-2 mb-6">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter an item..."
                        className="px-4 py-2 border rounded-md"
                    />
                    <button
                        onClick={handleAddItem}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                    >
                    Add to Pantry
                    </button>
                </div>

        {/* Pantry Items Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-4xl">
          {pantry.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white p-4 rounded shadow"
            >
              <img
                src="images/pantry.jpg" alt={item}
                className="w-32 h-32 object-cover mb-4"
              />
              <span>{item}</span>
              <button
                onClick={() => handleRemoveItem(index)}
                className="text-orange-500 hover:text-red-700 mt-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}